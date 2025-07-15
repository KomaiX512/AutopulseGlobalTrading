<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ImageBackup extends Model
{
    use HasFactory;

    protected $fillable = [
        'original_path',
        'filename',
        'mime_type',
        'file_size',
        'backup_path_1',
        'backup_path_2',
        'backup_path_3',
        'backup_path_4',
        'backup_status',
        'last_backup_at',
        'last_verified_at',
        'width',
        'height',
        'checksum',
        'imageable_type',
        'imageable_id',
        'image_type',
        'is_primary',
        'sort_order'
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'file_size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'sort_order' => 'integer',
        'last_backup_at' => 'datetime',
        'last_verified_at' => 'datetime',
    ];

    // Relationships
    public function imageable()
    {
        return $this->morphTo();
    }

    // Scopes
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('backup_status', $status);
    }

    public function scopePending($query)
    {
        return $query->where('backup_status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('backup_status', 'completed');
    }

    public function scopeFailed($query)
    {
        return $query->where('backup_status', 'failed');
    }

    // Backup Methods
    public function performBackup()
    {
        try {
            $originalPath = storage_path('app/' . $this->original_path);
            
            if (!file_exists($originalPath)) {
                $this->update(['backup_status' => 'failed']);
                return false;
            }

            $successCount = 0;
            $backupPaths = [
                'backup_path_1' => $this->createLocalBackup($originalPath),
                'backup_path_2' => $this->createCloudBackup($originalPath),
                'backup_path_3' => $this->createCdnBackup($originalPath),
                'backup_path_4' => $this->createSecondaryCloudBackup($originalPath)
            ];

            foreach ($backupPaths as $field => $path) {
                if ($path) {
                    $this->update([$field => $path]);
                    $successCount++;
                }
            }

            $status = $successCount > 0 ? ($successCount >= 2 ? 'completed' : 'partial') : 'failed';
            $this->update([
                'backup_status' => $status,
                'last_backup_at' => now()
            ]);

            return $successCount > 0;
        } catch (\Exception $e) {
            $this->update(['backup_status' => 'failed']);
            return false;
        }
    }

    private function createLocalBackup($originalPath)
    {
        try {
            $backupDir = storage_path('app/backups/images/' . date('Y/m/d'));
            if (!is_dir($backupDir)) {
                mkdir($backupDir, 0755, true);
            }

            $backupPath = $backupDir . '/' . $this->filename;
            if (copy($originalPath, $backupPath)) {
                return 'backups/images/' . date('Y/m/d') . '/' . $this->filename;
            }
        } catch (\Exception $e) {
            // Log error
        }
        return null;
    }

    private function createCloudBackup($originalPath)
    {
        try {
            // AWS S3 or other cloud storage backup
            if (config('filesystems.disks.s3.key')) {
                $s3Path = 'backups/images/' . date('Y/m/d') . '/' . $this->filename;
                if (Storage::disk('s3')->put($s3Path, file_get_contents($originalPath))) {
                    return Storage::disk('s3')->url($s3Path);
                }
            }
        } catch (\Exception $e) {
            // Log error
        }
        return null;
    }

    private function createCdnBackup($originalPath)
    {
        try {
            // CDN backup implementation
            // This could be CloudFlare, AWS CloudFront, etc.
            return null; // Implement based on your CDN provider
        } catch (\Exception $e) {
            // Log error
        }
        return null;
    }

    private function createSecondaryCloudBackup($originalPath)
    {
        try {
            // Secondary cloud backup (Google Cloud, Azure, etc.)
            return null; // Implement based on your secondary cloud provider
        } catch (\Exception $e) {
            // Log error
        }
        return null;
    }

    // Verification Methods
    public function verifyIntegrity()
    {
        try {
            $originalPath = storage_path('app/' . $this->original_path);
            
            if (!file_exists($originalPath)) {
                return false;
            }

            $currentChecksum = md5_file($originalPath);
            $isValid = $currentChecksum === $this->checksum;

            $this->update([
                'last_verified_at' => now(),
                'checksum' => $currentChecksum
            ]);

            return $isValid;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function getWorkingImageUrl()
    {
        // Try original first
        if (file_exists(storage_path('app/' . $this->original_path))) {
            return asset('storage/' . str_replace('public/', '', $this->original_path));
        }

        // Try backup paths in order
        $backupPaths = [
            $this->backup_path_1,
            $this->backup_path_2,
            $this->backup_path_3,
            $this->backup_path_4
        ];

        foreach ($backupPaths as $backupPath) {
            if ($backupPath) {
                if (str_starts_with($backupPath, 'http')) {
                    return $backupPath; // Direct URL
                } else {
                    $fullPath = storage_path('app/' . $backupPath);
                    if (file_exists($fullPath)) {
                        return asset('storage/' . str_replace('public/', '', $backupPath));
                    }
                }
            }
        }

        return '/images/placeholder-image.jpg';
    }

    // Utility Methods
    public function getFileSizeFormattedAttribute()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }

    public function getDimensionsAttribute()
    {
        if ($this->width && $this->height) {
            return $this->width . 'x' . $this->height;
        }
        return 'Unknown';
    }
} 