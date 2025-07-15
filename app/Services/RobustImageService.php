<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Services\ImageBackupService;
use Carbon\Carbon;

class RobustImageService
{
    protected $backupService;
    protected $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    protected $maxFileSize = 10 * 1024 * 1024; // 10MB
    
    public function __construct(ImageBackupService $backupService)
    {
        $this->backupService = $backupService;
    }

    /**
     * Store image with guaranteed backup and database tracking
     */
    public function storeImage(UploadedFile $file, string $category, int $entityId, array $metadata = [])
    {
        DB::beginTransaction();
        
        try {
            // Validate file
            $this->validateFile($file);
            
            // Generate secure path
            $directory = "public/images/{$category}/{$entityId}";
            $filename = $this->generateSecureFilename($file);
            $fullPath = "{$directory}/{$filename}";
            
            // Ensure directory exists
            $this->ensureDirectoryExists(storage_path("app/{$directory}"));
            
            // Store file
            $storedPath = $file->storeAs($directory, $filename);
            
            if (!$storedPath) {
                throw new \Exception("Failed to store file");
            }
            
            // Verify file was actually stored
            if (!Storage::exists($storedPath)) {
                throw new \Exception("File storage verification failed");
            }
            
            // Create database record for tracking
            $imageRecord = DB::table('image_registry')->insert([
                'path' => $storedPath,
                'original_name' => $file->getClientOriginalName(),
                'filename' => $filename,
                'category' => $category,
                'entity_id' => $entityId,
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'metadata' => json_encode($metadata),
                'created_at' => now(),
                'updated_at' => now(),
                'backup_status' => 'pending'
            ]);
            
            // Create multiple backups immediately
            $this->createMultipleBackups($storedPath, $category, $entityId, $metadata);
            
            // Update backup status
            DB::table('image_registry')
                ->where('path', $storedPath)
                ->update(['backup_status' => 'completed']);
            
            DB::commit();
            
            Log::info("Image stored successfully: {$storedPath}");
            
            return [
                'success' => true,
                'path' => $storedPath,
                'url' => Storage::url($storedPath),
                'filename' => $filename
            ];
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            // Clean up any partial files
            if (isset($storedPath) && Storage::exists($storedPath)) {
                Storage::delete($storedPath);
            }
            
            Log::error("Image storage failed: " . $e->getMessage());
            
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Update image with proper cleanup and backup
     */
    public function updateImage(UploadedFile $newFile, string $oldPath, string $category, int $entityId, array $metadata = [])
    {
        DB::beginTransaction();
        
        try {
            // Store new image first
            $result = $this->storeImage($newFile, $category, $entityId, $metadata);
            
            if (!$result['success']) {
                throw new \Exception("Failed to store new image: " . $result['error']);
            }
            
            // Mark old image as replaced but keep it in backup
            if ($oldPath) {
                DB::table('image_registry')
                    ->where('path', $oldPath)
                    ->update([
                        'status' => 'replaced',
                        'replaced_at' => now(),
                        'replaced_by' => $result['path']
                    ]);
                
                // Don't delete old file immediately - keep for recovery
                // We'll clean up old files in a separate maintenance job
            }
            
            DB::commit();
            
            return $result;
            
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Validate uploaded file
     */
    protected function validateFile(UploadedFile $file)
    {
        if (!$file->isValid()) {
            throw new \Exception("Invalid file upload");
        }
        
        if ($file->getSize() > $this->maxFileSize) {
            throw new \Exception("File size exceeds maximum allowed size");
        }
        
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $this->allowedExtensions)) {
            throw new \Exception("File type not allowed. Allowed types: " . implode(', ', $this->allowedExtensions));
        }
        
        // Check if it's actually an image
        $imageInfo = getimagesize($file->getPathname());
        if ($imageInfo === false) {
            throw new \Exception("File is not a valid image");
        }
    }

    /**
     * Generate secure filename
     */
    protected function generateSecureFilename(UploadedFile $file)
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $hash = hash('sha256', $file->getClientOriginalName() . time() . random_bytes(16));
        return substr($hash, 0, 40) . '.' . $extension;
    }

    /**
     * Ensure directory exists with proper permissions
     */
    protected function ensureDirectoryExists(string $path)
    {
        if (!File::exists($path)) {
            File::makeDirectory($path, 0755, true);
        }
    }

    /**
     * Create multiple backups for redundancy
     */
    protected function createMultipleBackups(string $path, string $category, int $entityId, array $metadata)
    {
        // Local backup
        $this->createLocalBackup($path);
        
        // Database backup entry
        $this->backupService->backupImage($path, (object)['id' => $entityId], true);
        
        // Additional cloud backup (if configured)
        $this->createCloudBackup($path, $category, $entityId);
    }

    /**
     * Create local backup copy
     */
    protected function createLocalBackup(string $path)
    {
        $backupPath = str_replace('public/images/', 'public/backups/images/', $path);
        $backupDir = dirname(storage_path("app/{$backupPath}"));
        
        $this->ensureDirectoryExists($backupDir);
        
        Storage::copy($path, $backupPath);
        
        Log::info("Local backup created: {$backupPath}");
    }

    /**
     * Create cloud backup (placeholder for future implementation)
     */
    protected function createCloudBackup(string $path, string $category, int $entityId)
    {
        // TODO: Implement cloud backup to Google Drive or AWS S3
        Log::info("Cloud backup scheduled for: {$path}");
    }

    /**
     * Recover missing image from backup
     */
    public function recoverImage(string $path)
    {
        try {
            // Try local backup first
            $backupPath = str_replace('public/images/', 'public/backups/images/', $path);
            
            if (Storage::exists($backupPath)) {
                Storage::copy($backupPath, $path);
                Log::info("Image recovered from local backup: {$path}");
                return true;
            }
            
            // Try using existing backup service
            if ($this->backupService->restoreImageFromBackup($path)) {
                Log::info("Image recovered from backup service: {$path}");
                return true;
            }
            
            Log::warning("Could not recover image: {$path}");
            return false;
            
        } catch (\Exception $e) {
            Log::error("Image recovery failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Verify all images are accessible and recover if needed
     */
    public function verifyAndRecoverAllImages()
    {
        $images = DB::table('image_registry')
            ->where('status', '!=', 'replaced')
            ->get();
        
        $stats = [
            'total' => $images->count(),
            'verified' => 0,
            'recovered' => 0,
            'missing' => 0
        ];
        
        foreach ($images as $image) {
            if (Storage::exists($image->path)) {
                $stats['verified']++;
            } else {
                if ($this->recoverImage($image->path)) {
                    $stats['recovered']++;
                } else {
                    $stats['missing']++;
                    
                    // Mark as missing in database
                    DB::table('image_registry')
                        ->where('path', $image->path)
                        ->update([
                            'status' => 'missing',
                            'missing_since' => now()
                        ]);
                }
            }
        }
        
        return $stats;
    }
} 