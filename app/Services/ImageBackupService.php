<?php

namespace App\Services;

use App\Models\ImageBackup;
use App\Models\UnifiedProduct;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class ImageBackupService
{
    /**
     * Backup all images for a product
     */
    public function backupProductImages(UnifiedProduct $product)
    {
        try {
            // Backup primary image
            if ($product->primary_image) {
                $this->backupImage($product->primary_image, $product, true);
            }

            // Backup additional images
            if ($product->additional_images) {
                foreach ($product->additional_images as $index => $imagePath) {
                    $this->backupImage($imagePath, $product, false, $index);
                }
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to backup product images: ' . $e->getMessage(), [
                'product_id' => $product->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Backup a single image with multiple redundancy
     */
    public function backupImage($imagePath, $imageable, $isPrimary = false, $sortOrder = 0)
    {
        try {
            $fullPath = storage_path('app/' . $imagePath);
            
            if (!file_exists($fullPath)) {
                Log::warning('Image file not found for backup: ' . $fullPath);
                return false;
            }

            // Create or update image backup record
            $backup = ImageBackup::updateOrCreate(
                [
                    'original_path' => $imagePath,
                    'imageable_type' => get_class($imageable),
                    'imageable_id' => $imageable->id,
                    'is_primary' => $isPrimary
                ],
                [
                    'filename' => basename($imagePath),
                    'mime_type' => mime_content_type($fullPath),
                    'file_size' => filesize($fullPath),
                    'checksum' => md5_file($fullPath),
                    'image_type' => $this->getImageType($imageable),
                    'sort_order' => $sortOrder,
                    'backup_status' => 'pending'
                ]
            );

            // Perform the actual backup
            return $backup->performBackup();
        } catch (\Exception $e) {
            Log::error('Failed to backup image: ' . $e->getMessage(), [
                'image_path' => $imagePath,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Restore image from backup if original is missing
     */
    public function restoreImageFromBackup($imagePath)
    {
        try {
            $backup = ImageBackup::where('original_path', $imagePath)->first();
            
            if (!$backup) {
                return false;
            }

            $originalPath = storage_path('app/' . $imagePath);
            $originalDir = dirname($originalPath);

            // Create directory if it doesn't exist
            if (!is_dir($originalDir)) {
                mkdir($originalDir, 0755, true);
            }

            // Try to restore from backup paths
            $backupPaths = [
                $backup->backup_path_1,
                $backup->backup_path_2,
                $backup->backup_path_3,
                $backup->backup_path_4
            ];

            foreach ($backupPaths as $backupPath) {
                if ($backupPath && $this->restoreFromPath($backupPath, $originalPath)) {
                    Log::info('Image restored from backup: ' . $imagePath);
                    return true;
                }
            }

            return false;
        } catch (\Exception $e) {
            Log::error('Failed to restore image from backup: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Restore from a specific backup path
     */
    private function restoreFromPath($backupPath, $originalPath)
    {
        try {
            if (str_starts_with($backupPath, 'http')) {
                // Download from URL
                $content = file_get_contents($backupPath);
                if ($content !== false) {
                    return file_put_contents($originalPath, $content) !== false;
                }
            } else {
                // Copy from local backup
                $fullBackupPath = storage_path('app/' . $backupPath);
                if (file_exists($fullBackupPath)) {
                    return copy($fullBackupPath, $originalPath);
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to restore from path: ' . $backupPath);
        }
        return false;
    }

    /**
     * Verify all image backups
     */
    public function verifyAllBackups()
    {
        $backups = ImageBackup::all();
        $verified = 0;
        $failed = 0;

        foreach ($backups as $backup) {
            if ($backup->verifyIntegrity()) {
                $verified++;
            } else {
                $failed++;
                Log::warning('Image backup verification failed: ' . $backup->original_path);
            }
        }

        Log::info("Image backup verification completed: {$verified} verified, {$failed} failed");
        return ['verified' => $verified, 'failed' => $failed];
    }

    /**
     * Clean up old backup files
     */
    public function cleanupOldBackups($daysToKeep = 30)
    {
        try {
            $cutoffDate = now()->subDays($daysToKeep);
            $oldBackups = ImageBackup::where('created_at', '<', $cutoffDate)->get();

            foreach ($oldBackups as $backup) {
                $this->deleteBackupFiles($backup);
                $backup->delete();
            }

            Log::info('Cleaned up ' . $oldBackups->count() . ' old backup records');
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to cleanup old backups: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete backup files
     */
    private function deleteBackupFiles(ImageBackup $backup)
    {
        $backupPaths = [
            $backup->backup_path_1,
            $backup->backup_path_2,
            $backup->backup_path_3,
            $backup->backup_path_4
        ];

        foreach ($backupPaths as $path) {
            if ($path && !str_starts_with($path, 'http')) {
                $fullPath = storage_path('app/' . $path);
                if (file_exists($fullPath)) {
                    unlink($fullPath);
                }
            }
        }
    }

    /**
     * Get image type based on imageable model
     */
    private function getImageType($imageable)
    {
        if ($imageable instanceof UnifiedProduct) {
            return 'product';
        }
        
        return 'other';
    }

    /**
     * Create scheduled backup for all products
     */
    public function createScheduledBackup()
    {
        $products = UnifiedProduct::where('is_viewable', true)->get();
        $successCount = 0;
        $totalCount = $products->count();

        foreach ($products as $product) {
            if ($this->backupProductImages($product)) {
                $successCount++;
            }
        }

        Log::info("Scheduled backup completed: {$successCount}/{$totalCount} products backed up successfully");
        return ['success' => $successCount, 'total' => $totalCount];
    }

    /**
     * Monitor image health and restore if needed
     */
    public function monitorImageHealth()
    {
        $products = UnifiedProduct::where('is_viewable', true)->get();
        $restored = 0;

        foreach ($products as $product) {
            // Check primary image
            if ($product->primary_image && !file_exists(storage_path('app/' . $product->primary_image))) {
                if ($this->restoreImageFromBackup($product->primary_image)) {
                    $restored++;
                }
            }

            // Check additional images
            if ($product->additional_images) {
                foreach ($product->additional_images as $imagePath) {
                    if (!file_exists(storage_path('app/' . $imagePath))) {
                        if ($this->restoreImageFromBackup($imagePath)) {
                            $restored++;
                        }
                    }
                }
            }
        }

        Log::info("Image health monitoring completed: {$restored} images restored");
        return $restored;
    }
} 