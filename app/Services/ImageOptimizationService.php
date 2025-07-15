<?php

namespace App\Services;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use App\Services\ImageBackupService;

class ImageOptimizationService
{
    protected $imageManager;
    protected $backupService;
    
    // Enhanced sizes with MUCH more aggressive optimization for web performance
    const SIZES = [
        'thumbnail' => ['width' => 150, 'height' => 150, 'quality' => 60], // Much more aggressive
        'small' => ['width' => 300, 'height' => 300, 'quality' => 65],
        'medium' => ['width' => 600, 'height' => 600, 'quality' => 70],
        'large' => ['width' => 1200, 'height' => 1200, 'quality' => 75],
        'hero' => ['width' => 1920, 'height' => 1080, 'quality' => 80],
        // Ultra-aggressive placeholder
        'placeholder' => ['width' => 20, 'height' => 20, 'quality' => 30], // Extremely small
        'critical' => ['width' => 800, 'height' => 600, 'quality' => 70],  // Above-fold images
    ];

    // MUCH more aggressive performance optimization configurations
    const PERFORMANCE_CONFIG = [
        'webp_quality' => 70, // Much more aggressive WebP compression
        'progressive_jpeg' => true,
        'strip_metadata' => true,
        'critical_image_preload' => true,
        'lazy_load_threshold' => '50px',
        'aggressive_compression' => true, // New flag for aggressive compression
        'max_file_size_kb' => 100, // Maximum file size in KB
        'enable_tiny_webp' => true // Enable ultra-compressed WebP
    ];

    public function __construct(ImageBackupService $backupService)
    {
        $this->imageManager = new ImageManager(new Driver());
        $this->backupService = $backupService;
    }

    /**
     * Optimize a single image and create multiple sizes
     */
    public function optimizeImage($imagePath, $options = [])
    {
        try {
            $fullPath = storage_path('app/' . $imagePath);
            
            if (!file_exists($fullPath)) {
                Log::error('Image file not found for optimization: ' . $fullPath);
                return false;
            }

            // Create backup before optimization
            $this->createPreOptimizationBackup($imagePath);

            $result = [
                'original' => $imagePath,
                'optimized' => [],
                'webp' => [],
                'total_saved' => 0
            ];

            $originalSize = filesize($fullPath);
            $image = $this->imageManager->read($fullPath);
            
            // Get image info
            $imageInfo = $this->getImageInfo($fullPath);
            $result['original_info'] = $imageInfo;

            // Create optimized versions for each size
            foreach (self::SIZES as $sizeName => $sizeConfig) {
                $optimizedResult = $this->createOptimizedVersion(
                    $image, 
                    $imagePath, 
                    $sizeName, 
                    $sizeConfig,
                    $options
                );
                
                if ($optimizedResult) {
                    $result['optimized'][$sizeName] = $optimizedResult;
                    
                    // Create WebP version
                    $webpResult = $this->createWebPVersion(
                        $optimizedResult['path'], 
                        $sizeName
                    );
                    
                    if ($webpResult) {
                        $result['webp'][$sizeName] = $webpResult;
                    }
                }
            }

            // Calculate total space saved
            $result['total_saved'] = $this->calculateSpaceSaved($result);

            Log::info('Image optimization completed', [
                'original_path' => $imagePath,
                'original_size' => $originalSize,
                'space_saved' => $result['total_saved'],
                'versions_created' => count($result['optimized'])
            ]);

            return $result;

        } catch (\Exception $e) {
            Log::error('Image optimization failed: ' . $e->getMessage(), [
                'image_path' => $imagePath,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Optimize image with RADICAL performance-first approach
     */
    public function optimizeImageForPerformance($imagePath, $options = [])
    {
        try {
            $fullPath = storage_path('app/' . $imagePath);
            
            if (!file_exists($fullPath)) {
                Log::error('Image file not found for optimization: ' . $fullPath);
                return false;
            }

            // Create backup before optimization (safety first)
            $this->createPreOptimizationBackup($imagePath);

            $result = [
                'original' => $imagePath,
                'optimized' => [],
                'webp' => [],
                'placeholder' => null,
                'critical' => null,
                'total_saved' => 0,
                'performance_metrics' => []
            ];

            $originalSize = filesize($fullPath);
            $image = $this->imageManager->read($fullPath);
            
            // Get image info
            $imageInfo = $this->getImageInfo($fullPath);
            $result['original_info'] = $imageInfo;

            // Create ultra-fast placeholder for instant loading
            $result['placeholder'] = $this->createPlaceholderImage($image, $imagePath);

            // RADICAL optimization - only create WebP version if it provides >50% savings
            $webpResult = $this->createRadicalWebPVersion($image, $imagePath);
            if ($webpResult && $webpResult['size'] < ($originalSize * 0.5)) {
                $result['webp']['radical'] = $webpResult;
            }

            // Calculate performance metrics
            $result['performance_metrics'] = $this->calculatePerformanceMetrics($result);
            
            // Calculate total space saved
            $result['total_saved'] = $this->calculateSpaceSaved($result);

            Log::info('RADICAL performance-optimized image completed', [
                'original_path' => $imagePath,
                'original_size' => $originalSize,
                'space_saved' => $result['total_saved'],
                'webp_created' => isset($result['webp']['radical'])
            ]);

            return $result;

        } catch (\Exception $e) {
            Log::error('RADICAL performance image optimization failed: ' . $e->getMessage(), [
                'image_path' => $imagePath,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Create ULTRA-optimized version with maximum compression
     */
    protected function createUltraOptimizedVersion($image, $originalPath, $sizeName, $sizeConfig, $options = [])
    {
        try {
            $pathInfo = pathinfo($originalPath);
            $directory = dirname($originalPath);
            $filename = $pathInfo['filename'];
            $extension = $pathInfo['extension'];

            // Create size-specific directory
            $optimizedDir = $directory . '/optimized/' . $sizeName;
            $optimizedPath = $optimizedDir . '/' . $filename . '_' . $sizeName . '.' . $extension;
            $fullOptimizedPath = storage_path('app/' . $optimizedPath);

            // Ensure directory exists
            if (!File::exists(dirname($fullOptimizedPath))) {
                File::makeDirectory(dirname($fullOptimizedPath), 0755, true);
            }

            // Clone image for manipulation
            $resizedImage = clone $image;

            // Smart resize with aspect ratio preservation
            $resizedImage = $this->smartResize($resizedImage, $sizeConfig);

            // Apply ULTRA-aggressive compression
            $resizedImage = $this->applyUltraCompression($resizedImage, $sizeConfig, $extension);

            // Save the optimized image
            $resizedImage->save($fullOptimizedPath);

            $optimizedSize = filesize($fullOptimizedPath);

            // If file is still too large, apply additional compression
            $maxSizeKB = self::PERFORMANCE_CONFIG['max_file_size_kb'];
            if ($optimizedSize > ($maxSizeKB * 1024)) {
                $resizedImage = $this->applyMaximumCompression($resizedImage, $sizeConfig, $extension);
                $resizedImage->save($fullOptimizedPath);
                $optimizedSize = filesize($fullOptimizedPath);
            }

            return [
                'path' => $optimizedPath,
                'url' => Storage::url($optimizedPath),
                'size' => $optimizedSize,
                'dimensions' => [
                    'width' => $resizedImage->width(),
                    'height' => $resizedImage->height()
                ],
                'quality' => $sizeConfig['quality']
            ];

        } catch (\Exception $e) {
            Log::error('Failed to create ULTRA-optimized version: ' . $e->getMessage(), [
                'size' => $sizeName,
                'original_path' => $originalPath
            ]);
            return null;
        }
    }

    /**
     * Smart resize that maintains aspect ratio and crops intelligently
     */
    protected function smartResize($image, $sizeConfig)
    {
        $targetWidth = $sizeConfig['width'];
        $targetHeight = $sizeConfig['height'];
        
        $originalWidth = $image->width();
        $originalHeight = $image->height();

        // Calculate aspect ratios
        $originalRatio = $originalWidth / $originalHeight;
        $targetRatio = $targetWidth / $targetHeight;

        if ($originalRatio > $targetRatio) {
            // Original is wider - fit by height and crop width
            $image->resize(null, $targetHeight, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            
            if ($image->width() > $targetWidth) {
                $image->crop($targetWidth, $targetHeight);
            }
        } else {
            // Original is taller - fit by width and crop height
            $image->resize($targetWidth, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            
            if ($image->height() > $targetHeight) {
                $image->crop($targetWidth, $targetHeight);
            }
        }

        return $image;
    }

    /**
     * Apply ULTRA-aggressive compression based on image type
     */
    protected function applyUltraCompression($image, $sizeConfig, $extension)
    {
        $quality = $sizeConfig['quality'];
        
        // Apply ULTRA-aggressive compression based on size
        if ($sizeConfig['width'] <= 150) {
            $quality = max(40, $quality - 20); // Much more aggressive for small images
        } elseif ($sizeConfig['width'] <= 300) {
            $quality = max(50, $quality - 15); // More aggressive for medium images
        }
        
        switch (strtolower($extension)) {
            case 'jpg':
            case 'jpeg':
                // Apply ULTRA-aggressive JPEG compression
                $image->encodeByExtension($extension, $quality);
                
                // Additional ULTRA-aggressive optimization for JPEG
                if ($quality < 80) {
                    $image->blur(0.8); // More blur to reduce file size
                }
                
                // For very small images, apply even more compression
                if ($sizeConfig['width'] <= 150) {
                    $image->blur(1.2); // Heavy blur for tiny images
                }
                break;
                
            case 'png':
                // ULTRA-aggressive PNG compression
                $compressionLevel = min(9, (int) ((100 - $quality) / 6)); // Much more aggressive
                $image->encodeByExtension($extension, $compressionLevel);
                
                // Convert to indexed colors for smaller files if possible
                if ($image->width() <= 600 && $image->height() <= 600) {
                    try {
                        // Remove palette conversion as it's not supported by current driver
                        // $image->palette(); // Reduce to palette colors
                    } catch (\Exception $e) {
                        // Ignore if palette conversion fails
                    }
                }
                break;
                
            case 'webp':
                // ULTRA-aggressive WebP compression
                $webpQuality = max(40, $quality - 25); // Much more aggressive
                $image->encodeByExtension($extension, $webpQuality);
                break;
                
            default:
                // Default ULTRA-aggressive compression
                $image->encodeByExtension($extension, $quality);
        }

        return $image;
    }

    /**
     * Apply maximum compression for files that are still too large
     */
    protected function applyMaximumCompression($image, $sizeConfig, $extension)
    {
        $maxQuality = 30; // Maximum compression
        
        switch (strtolower($extension)) {
            case 'jpg':
            case 'jpeg':
                $image->blur(1.5); // Heavy blur
                $image->encodeByExtension($extension, $maxQuality);
                break;
                
            case 'png':
                $image->encodeByExtension($extension, 9); // Maximum PNG compression
                break;
                
            case 'webp':
                $image->blur(1.0);
                $image->encodeByExtension($extension, $maxQuality);
                break;
                
            default:
                $image->encodeByExtension($extension, $maxQuality);
        }

        return $image;
    }

    /**
     * Create WebP version for better compression
     */
    protected function createWebPVersion($optimizedPath, $sizeName)
    {
        try {
            $fullOptimizedPath = storage_path('app/' . $optimizedPath);
            $pathInfo = pathinfo($optimizedPath);
            
            $webpPath = $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '.webp';
            $fullWebpPath = storage_path('app/' . $webpPath);

            // Load and convert to WebP
            $image = $this->imageManager->read($fullOptimizedPath);
            $image->encodeByExtension('webp', 90); // WebP with 90% quality
            $image->save($fullWebpPath);

            $webpSize = filesize($fullWebpPath);

            return [
                'path' => $webpPath,
                'url' => Storage::url($webpPath),
                'size' => $webpSize,
                'format' => 'webp'
            ];

        } catch (\Exception $e) {
            Log::error('Failed to create WebP version: ' . $e->getMessage(), [
                'original_path' => $optimizedPath
            ]);
            return null;
        }
    }

    /**
     * Create ULTRA-aggressive performance-optimized WebP version
     */
    protected function createPerformanceWebPVersion($optimizedPath, $sizeName)
    {
        try {
            $fullOptimizedPath = storage_path('app/' . $optimizedPath);
            $pathInfo = pathinfo($optimizedPath);
            
            $webpPath = $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '.webp';
            $fullWebpPath = storage_path('app/' . $webpPath);

            // Load and convert to WebP with ULTRA-aggressive settings
            $image = $this->imageManager->read($fullOptimizedPath);
            
            // Apply ULTRA-aggressive performance optimizations
            $quality = self::PERFORMANCE_CONFIG['webp_quality'];
            if ($sizeName === 'thumbnail' || $sizeName === 'small') {
                $quality = 50; // Much lower quality for smaller images
            } elseif ($sizeName === 'medium') {
                $quality = 60; // Lower for medium
            } else {
                $quality = 70; // Still aggressive for larger images
            }
            
            // Apply additional compression techniques
            if ($image->width() <= 300 && $image->height() <= 300) {
                // For small images, apply slight blur to reduce file size
                $image->blur(0.3);
            }
            
            $image->encodeByExtension('webp', $quality);
            $image->save($fullWebpPath);

            $webpSize = filesize($fullWebpPath);

            // Check if file is still too large and apply more compression
            $maxSizeKB = self::PERFORMANCE_CONFIG['max_file_size_kb'];
            if ($webpSize > ($maxSizeKB * 1024)) {
                // Re-compress with even lower quality
                $image = $this->imageManager->read($fullOptimizedPath);
                $image->blur(0.5); // More blur
                $image->encodeByExtension('webp', max(30, $quality - 20));
                $image->save($fullWebpPath);
                $webpSize = filesize($fullWebpPath);
            }

            return [
                'path' => $webpPath,
                'url' => Storage::url($webpPath),
                'size' => $webpSize,
                'format' => 'webp',
                'compression_ratio' => $this->calculateCompressionRatio($fullOptimizedPath, $fullWebpPath)
            ];

        } catch (\Exception $e) {
            Log::error('Failed to create performance WebP version: ' . $e->getMessage(), [
                'original_path' => $optimizedPath
            ]);
            return null;
        }
    }

    /**
     * Create RADICAL WebP version with ultra-aggressive compression
     */
    protected function createRadicalWebPVersion($image, $originalPath)
    {
        try {
            $pathInfo = pathinfo($originalPath);
            $webpPath = $pathInfo['dirname'] . '/radical/' . $pathInfo['filename'] . '.webp';
            $fullWebpPath = storage_path('app/' . $webpPath);

            // Ensure directory exists
            if (!File::exists(dirname($fullWebpPath))) {
                File::makeDirectory(dirname($fullWebpPath), 0755, true);
            }

            // Apply RADICAL compression (quality 50-70 based on image size)
            $width = $image->width();
            $height = $image->height();
            
            // Determine quality - smaller images can handle more compression
            $quality = ($width * $height < 500000) ? 50 : 70;
            
            // Resize if larger than 2000px in either dimension
            if ($width > 2000 || $height > 2000) {
                $image->scaleDown(2000, 2000);
            }
            
            // Apply aggressive WebP compression
            $image->encodeByExtension('webp', $quality);
            
            // Save the optimized version
            $image->save($fullWebpPath);
            
            return [
                'path' => $webpPath,
                'size' => filesize($fullWebpPath),
                'width' => $image->width(),
                'height' => $image->height(),
                'quality' => $quality
            ];
            
        } catch (\Exception $e) {
            Log::error('Failed to create RADICAL WebP version: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Calculate compression ratio between two files
     */
    protected function calculateCompressionRatio($originalPath, $compressedPath)
    {
        try {
            $originalSize = filesize($originalPath);
            $compressedSize = filesize($compressedPath);
            
            if ($originalSize > 0) {
                return round((($originalSize - $compressedSize) / $originalSize) * 100, 2);
            }
            
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Create ultra-fast placeholder for instant loading
     */
    protected function createPlaceholderImage($image, $originalPath)
    {
        try {
            $pathInfo = pathinfo($originalPath);
            $directory = dirname($originalPath);
            $filename = $pathInfo['filename'];
            
            $placeholderDir = $directory . '/optimized/placeholder';
            $placeholderPath = $placeholderDir . '/' . $filename . '_placeholder.jpg';
            $fullPlaceholderPath = storage_path('app/' . $placeholderPath);

            // Ensure directory exists
            if (!File::exists(dirname($fullPlaceholderPath))) {
                File::makeDirectory(dirname($fullPlaceholderPath), 0755, true);
            }

            // Create ultra-small placeholder
            $placeholderImage = clone $image;
            $placeholderImage->resize(20, 20, function ($constraint) {
                $constraint->aspectRatio();
            });

            // Apply blur for smooth placeholder effect
            $placeholderImage->blur(2);
            
            // Maximum compression for smallest file size
            $placeholderImage->encodeByExtension('jpg', 30);
            $placeholderImage->save($fullPlaceholderPath);

            return [
                'path' => $placeholderPath,
                'url' => Storage::url($placeholderPath),
                'size' => filesize($fullPlaceholderPath),
                'base64' => $this->createBase64Placeholder($fullPlaceholderPath)
            ];

        } catch (\Exception $e) {
            Log::error('Failed to create placeholder image: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Create Base64 placeholder for instant inline loading
     */
    protected function createBase64Placeholder($imagePath)
    {
        try {
            $imageData = file_get_contents($imagePath);
            $base64 = base64_encode($imageData);
            return 'data:image/jpeg;base64,' . $base64;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Create critical size for above-fold images
     */
    protected function createCriticalSizeImage($image, $originalPath)
    {
        try {
            $sizeConfig = self::SIZES['critical'];
            return $this->createUltraOptimizedVersion(
                $image, 
                $originalPath, 
                'critical', 
                $sizeConfig,
                self::PERFORMANCE_CONFIG
            );
        } catch (\Exception $e) {
            Log::error('Failed to create critical size image: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get image information
     */
    protected function getImageInfo($imagePath)
    {
        try {
            $imageInfo = getimagesize($imagePath);
            
            return [
                'width' => $imageInfo[0] ?? 0,
                'height' => $imageInfo[1] ?? 0,
                'mime_type' => $imageInfo['mime'] ?? 'unknown',
                'file_size' => filesize($imagePath),
                'channels' => $imageInfo['channels'] ?? null,
                'bits' => $imageInfo['bits'] ?? null
            ];
        } catch (\Exception $e) {
            return [
                'width' => 0,
                'height' => 0,
                'mime_type' => 'unknown',
                'file_size' => filesize($imagePath)
            ];
        }
    }

    /**
     * Calculate total space saved
     */
    protected function calculateSpaceSaved($result)
    {
        $totalOptimizedSize = 0;
        $totalWebpSize = 0;

        foreach ($result['optimized'] as $optimized) {
            $totalOptimizedSize += $optimized['size'];
        }

        foreach ($result['webp'] as $webp) {
            $totalWebpSize += $webp['size'];
        }

        $originalSize = $result['original_info']['file_size'] ?? 0;
        $spaceSaved = max(0, $originalSize - $totalOptimizedSize);

        return [
            'original_size' => $originalSize,
            'optimized_total_size' => $totalOptimizedSize,
            'webp_total_size' => $totalWebpSize,
            'bytes_saved' => $spaceSaved,
            'percentage_saved' => $originalSize > 0 ? round(($spaceSaved / $originalSize) * 100, 2) : 0
        ];
    }

    /**
     * Calculate performance metrics
     */
    protected function calculatePerformanceMetrics($result)
    {
        $metrics = [
            'placeholder_size' => $result['placeholder']['size'] ?? 0,
            'critical_size' => $result['critical']['size'] ?? 0,
            'webp_compression_average' => 0,
            'total_variants' => count($result['optimized']) + count($result['webp']),
            'estimated_load_time_improvement' => 0
        ];

        // Calculate average WebP compression
        $compressionRatios = [];
        foreach ($result['webp'] as $webp) {
            if (isset($webp['compression_ratio'])) {
                $compressionRatios[] = $webp['compression_ratio'];
            }
        }
        
        if (!empty($compressionRatios)) {
            $metrics['webp_compression_average'] = round(array_sum($compressionRatios) / count($compressionRatios), 2);
        }

        // Estimate load time improvement (simplified calculation)
        $originalSize = $result['original_info']['file_size'] ?? 0;
        $optimizedSize = $result['optimized']['medium']['size'] ?? $originalSize;
        
        if ($originalSize > 0) {
            $improvement = (($originalSize - $optimizedSize) / $originalSize) * 100;
            $metrics['estimated_load_time_improvement'] = round($improvement, 2);
        }

        return $metrics;
    }

    /**
     * Create backup before optimization
     */
    protected function createPreOptimizationBackup($imagePath)
    {
        try {
            $fullPath = storage_path('app/' . $imagePath);
            $backupDir = storage_path('app/backups/pre-optimization/' . date('Y/m/d'));
            
            if (!File::exists($backupDir)) {
                File::makeDirectory($backupDir, 0755, true);
            }

            $filename = basename($imagePath);
            $backupPath = $backupDir . '/' . time() . '_' . $filename;
            
            copy($fullPath, $backupPath);
            
            Log::info('Pre-optimization backup created', [
                'original' => $imagePath,
                'backup' => $backupPath
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to create pre-optimization backup: ' . $e->getMessage());
        }
    }

    /**
     * Batch optimize multiple images
     */
    public function batchOptimize($imagePaths, $batchSize = 10)
    {
        $results = [];
        $batches = array_chunk($imagePaths, $batchSize);
        
        foreach ($batches as $batchIndex => $batch) {
            Log::info("Processing batch " . ($batchIndex + 1) . " of " . count($batches));
            
            foreach ($batch as $imagePath) {
                $result = $this->optimizeImage($imagePath);
                $results[$imagePath] = $result;
                
                // Small delay to prevent overwhelming the system
                usleep(100000); // 0.1 second
            }
        }

        return $results;
    }

    /**
     * Get the best image URL for given conditions
     */
    public function getBestImageUrl($imagePath, $size = 'medium', $preferWebP = true, $fallback = true)
    {
        try {
            $pathInfo = pathinfo($imagePath);
            $directory = dirname($imagePath);
            $filename = $pathInfo['filename'];

            // Check for WebP version first if preferred
            if ($preferWebP) {
                $webpPath = $directory . '/optimized/' . $size . '/' . $filename . '_' . $size . '.webp';
                $fullWebpPath = storage_path('app/' . $webpPath);
                
                if (file_exists($fullWebpPath)) {
                    return Storage::url($webpPath);
                }
            }

            // Check for optimized version
            $optimizedPath = $directory . '/optimized/' . $size . '/' . $filename . '_' . $size . '.' . $pathInfo['extension'];
            $fullOptimizedPath = storage_path('app/' . $optimizedPath);
            
            if (file_exists($fullOptimizedPath)) {
                return Storage::url($optimizedPath);
            }

            // Fallback to original if requested
            if ($fallback) {
                return Storage::url($imagePath);
            }

            return null;

        } catch (\Exception $e) {
            Log::error('Failed to get best image URL: ' . $e->getMessage());
            return $fallback ? Storage::url($imagePath) : null;
        }
    }

    /**
     * Get optimized image with performance hints
     */
    public function getPerformanceOptimizedImage($imagePath, $size = 'medium', $options = [])
    {
        $preferWebP = $options['prefer_webp'] ?? true;
        $includePlaceholder = $options['include_placeholder'] ?? true;
        $isCritical = $options['is_critical'] ?? false;

        $result = [
            'src' => null,
            'webp_src' => null,
            'placeholder' => null,
            'srcset' => [],
            'webp_srcset' => [],
            'preload_hint' => null,
            'loading_strategy' => $isCritical ? 'eager' : 'lazy'
        ];

        try {
            $pathInfo = pathinfo($imagePath);
            $directory = dirname($imagePath);
            $filename = $pathInfo['filename'];
            $extension = $pathInfo['extension'];

            // Get optimized version
            $optimizedPath = $directory . '/optimized/' . $size . '/' . $filename . '_' . $size . '.' . $extension;
            $fullOptimizedPath = storage_path('app/' . $optimizedPath);
            
            if (file_exists($fullOptimizedPath)) {
                $result['src'] = Storage::url($optimizedPath);
            } else {
                $result['src'] = Storage::url($imagePath); // Fallback to original
            }

            // Get WebP version
            $webpPath = $directory . '/optimized/' . $size . '/' . $filename . '_' . $size . '.webp';
            $fullWebpPath = storage_path('app/' . $webpPath);
            
            if (file_exists($fullWebpPath)) {
                $result['webp_src'] = Storage::url($webpPath);
            }

            // Get placeholder if requested
            if ($includePlaceholder) {
                $placeholderPath = $directory . '/optimized/placeholder/' . $filename . '_placeholder.jpg';
                $fullPlaceholderPath = storage_path('app/' . $placeholderPath);
                
                if (file_exists($fullPlaceholderPath)) {
                    $result['placeholder'] = Storage::url($placeholderPath);
                    
                    // Also get base64 version
                    $result['placeholder_base64'] = $this->createBase64Placeholder($fullPlaceholderPath);
                }
            }

            // Generate srcset for responsive images
            $result['srcset'] = $this->generateResponsiveSrcset($imagePath, false);
            $result['webp_srcset'] = $this->generateResponsiveSrcset($imagePath, true);

            // Generate preload hint for critical images
            if ($isCritical) {
                $result['preload_hint'] = $this->generatePreloadHint($result);
            }

            return $result;

        } catch (\Exception $e) {
            Log::error('Failed to get performance optimized image: ' . $e->getMessage());
            
            // Safe fallback
            return [
                'src' => Storage::url($imagePath),
                'webp_src' => null,
                'placeholder' => null,
                'srcset' => [],
                'webp_srcset' => [],
                'preload_hint' => null,
                'loading_strategy' => 'lazy'
            ];
        }
    }

    /**
     * Generate responsive srcset
     */
    protected function generateResponsiveSrcset($imagePath, $webp = false)
    {
        $srcset = [];
        $pathInfo = pathinfo($imagePath);
        $directory = dirname($imagePath);
        $filename = $pathInfo['filename'];
        $extension = $webp ? 'webp' : $pathInfo['extension'];

        foreach (self::SIZES as $sizeName => $sizeConfig) {
            if ($sizeName === 'placeholder') continue;
            
            $optimizedPath = $directory . '/optimized/' . $sizeName . '/' . $filename . '_' . $sizeName . '.' . $extension;
            $fullOptimizedPath = storage_path('app/' . $optimizedPath);
            
            if (file_exists($fullOptimizedPath)) {
                $width = $sizeConfig['width'];
                $srcset[] = Storage::url($optimizedPath) . ' ' . $width . 'w';
            }
        }

        return implode(', ', $srcset);
    }

    /**
     * Generate preload hint for critical images
     */
    protected function generatePreloadHint($imageData)
    {
        $hint = '<link rel="preload" as="image"';
        
        if ($imageData['webp_src']) {
            $hint .= ' href="' . $imageData['webp_src'] . '"';
            $hint .= ' type="image/webp"';
        } else {
            $hint .= ' href="' . $imageData['src'] . '"';
        }
        
        if (!empty($imageData['webp_srcset'])) {
            $hint .= ' imagesrcset="' . $imageData['webp_srcset'] . '"';
        } elseif (!empty($imageData['srcset'])) {
            $hint .= ' imagesrcset="' . $imageData['srcset'] . '"';
        }
        
        $hint .= ' fetchpriority="high">';
        
        return $hint;
    }

    /**
     * Clean up old optimized images
     */
    public function cleanupOptimizedImages($daysOld = 30)
    {
        try {
            $cutoffDate = now()->subDays($daysOld);
            $optimizedDir = storage_path('app/public/images/products/*/optimized');
            
            $directories = glob($optimizedDir, GLOB_ONLYDIR);
            $deletedCount = 0;
            
            foreach ($directories as $dir) {
                $files = File::allFiles($dir);
                
                foreach ($files as $file) {
                    if ($file->getMTime() < $cutoffDate->timestamp) {
                        File::delete($file->getPathname());
                        $deletedCount++;
                    }
                }
            }

            Log::info("Cleanup completed: {$deletedCount} old optimized images deleted");
            return $deletedCount;

        } catch (\Exception $e) {
            Log::error('Failed to cleanup optimized images: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get optimization statistics
     */
    public function getOptimizationStats()
    {
        try {
            $totalOriginalSize = 0;
            $totalOptimizedSize = 0;
            $optimizedCount = 0;
            
            $productDirs = glob(storage_path('app/public/images/products/*'), GLOB_ONLYDIR);
            
            foreach ($productDirs as $productDir) {
                $optimizedDir = $productDir . '/optimized';
                
                if (is_dir($optimizedDir)) {
                    $optimizedFiles = File::allFiles($optimizedDir);
                    
                    foreach ($optimizedFiles as $file) {
                        $totalOptimizedSize += $file->getSize();
                        $optimizedCount++;
                    }
                }
                
                // Count original images
                $originalFiles = glob($productDir . '/*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
                foreach ($originalFiles as $originalFile) {
                    $totalOriginalSize += filesize($originalFile);
                }
            }

            $spaceSaved = $totalOriginalSize - $totalOptimizedSize;
            $percentageSaved = $totalOriginalSize > 0 ? round(($spaceSaved / $totalOriginalSize) * 100, 2) : 0;

            return [
                'total_original_size' => $totalOriginalSize,
                'total_optimized_size' => $totalOptimizedSize,
                'space_saved' => $spaceSaved,
                'percentage_saved' => $percentageSaved,
                'optimized_files_count' => $optimizedCount,
                'original_size_formatted' => $this->formatBytes($totalOriginalSize),
                'optimized_size_formatted' => $this->formatBytes($totalOptimizedSize),
                'space_saved_formatted' => $this->formatBytes($spaceSaved)
            ];

        } catch (\Exception $e) {
            Log::error('Failed to get optimization stats: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Format bytes to human readable format
     */
    protected function formatBytes($size, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $size > 1024 && $i < count($units) - 1; $i++) {
            $size /= 1024;
        }
        
        return round($size, $precision) . ' ' . $units[$i];
    }
} 