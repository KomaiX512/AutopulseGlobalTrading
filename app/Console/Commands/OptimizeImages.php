<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ImageOptimizationService;
use App\Services\ImageBackupService;
use App\Models\UnifiedProduct;
use App\Models\Product;
use App\Models\Attachment;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class OptimizeImages extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'images:optimize 
                            {--all : Optimize all product images}
                            {--product= : Optimize specific product by ID}
                            {--batch-size=10 : Number of images to process in each batch}
                            {--dry-run : Show what would be optimized without doing it}
                            {--stats : Show optimization statistics}
                            {--cleanup : Clean up old optimized images}
                            {--size= : Only optimize specific size (thumbnail,small,medium,large,hero)}
                            {--force : Force re-optimization of already optimized images}';

    /**
     * The console command description.
     */
    protected $description = 'Optimize product images for better performance with safe backup';

    protected $optimizationService;
    protected $backupService;

    /**
     * Create a new command instance.
     */
    public function __construct(ImageOptimizationService $optimizationService, ImageBackupService $backupService)
    {
        parent::__construct();
        $this->optimizationService = $optimizationService;
        $this->backupService = $backupService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 AutoPulse Image Optimization System');
        $this->info('=====================================');

        if ($this->option('stats')) {
            $this->showStats();
        } elseif ($this->option('cleanup')) {
            $this->cleanupOldImages();
        } elseif ($this->option('all')) {
            $this->optimizeAllImagesForPerformance();
        } elseif ($this->option('product')) {
            $this->optimizeSpecificProductForPerformance();
        } else {
            $this->showHelp();
        }
    }

    /**
     * Optimize all images for performance (SAFE - creates new optimized versions)
     */
    protected function optimizeAllImagesForPerformance()
    {
        $this->info('🚀 ULTRA-AGGRESSIVE Performance Optimization Mode - 100% Safe');
        $this->info('🔒 Original images will remain untouched');
        $this->line('');
        
        $imagePaths = $this->collectAllImagePaths();
        $totalImages = count($imagePaths);
        
        if ($totalImages === 0) {
            $this->warn('No images found to optimize.');
            return;
        }

        $this->info("Found {$totalImages} images to process with ULTRA-aggressive optimization");
        
        if ($this->option('dry-run')) {
            $this->showDryRun($imagePaths);
            return;
        }

        $this->info('📋 ULTRA-Aggressive Performance Optimization Features:');
        $this->line('  ✓ Ultra-fast placeholders (20x20px, <1KB each)');
        $this->line('  ✓ ULTRA-aggressive WebP conversion (70% smaller)');
        $this->line('  ✓ Maximum compression for all sizes');
        $this->line('  ✓ Heavy blur for tiny images');
        $this->line('  ✓ File size limits (max 100KB per image)');
        $this->line('  ✓ Critical image detection');
        $this->line('  ✓ Preload hints generation');
        $this->line('');

        if (!$this->confirm("Proceed with ULTRA-aggressive optimization? All original images remain safe.")) {
            $this->info('Operation cancelled.');
            return;
        }

        $batchSize = (int) $this->option('batch-size');
        $batches = array_chunk($imagePaths, $batchSize);
        $totalBatches = count($batches);
        
        $this->info("Processing {$totalImages} images in {$totalBatches} batches of {$batchSize}");
        
        $progressBar = $this->output->createProgressBar($totalImages);
        $progressBar->start();

        $stats = [
            'processed' => 0,
            'optimized' => 0,
            'failed' => 0,
            'total_saved' => 0,
            'webp_created' => 0,
            'placeholders_created' => 0,
            'processing_time' => 0,
            'original_total_size' => 0,
            'optimized_total_size' => 0
        ];

        $startTime = microtime(true);

        foreach ($batches as $batchIndex => $batch) {
            $this->newLine();
            $this->info("📦 Processing ULTRA-aggressive batch " . ($batchIndex + 1) . " of {$totalBatches}");
            
            foreach ($batch as $imagePath) {
                $result = $this->optimizeImageForPerformance($imagePath);
                
                if ($result) {
                    $stats['optimized']++;
                    
                    // Calculate actual space saved
                    $originalSize = $result['original_info']['file_size'] ?? 0;
                    $optimizedSize = 0;
                    
                    foreach ($result['optimized'] as $optimized) {
                        $optimizedSize += $optimized['size'];
                    }
                    
                    $spaceSaved = max(0, $originalSize - $optimizedSize);
                    $stats['total_saved'] += $spaceSaved;
                    $stats['original_total_size'] += $originalSize;
                    $stats['optimized_total_size'] += $optimizedSize;
                    
                    if (isset($result['webp'])) {
                        $stats['webp_created'] += count($result['webp']);
                    }
                    if (isset($result['placeholder'])) {
                        $stats['placeholders_created']++;
                    }
                } else {
                    $stats['failed']++;
                }
                
                $stats['processed']++;
                $progressBar->advance();
            }
            
            // Small break between batches to prevent overwhelming
            usleep(100000); // 0.1 seconds
        }

        $stats['processing_time'] = microtime(true) - $startTime;
        $progressBar->finish();
        
        $this->newLine(2);
        $this->showUltraAggressiveOptimizationResults($stats);
    }

    /**
     * Optimize specific product for performance
     */
    protected function optimizeSpecificProductForPerformance()
    {
        $productId = $this->option('product');
        
        $product = UnifiedProduct::find($productId) ?? Product::find($productId);
        
        if (!$product) {
            $this->error("Product with ID {$productId} not found.");
            return;
        }

        $this->info("🎯 Performance optimizing images for product: {$product->name}");
        
        $imagePaths = $this->collectProductImagePaths($product);
        
        if (empty($imagePaths)) {
            $this->warn('No images found for this product.');
            return;
        }

        $this->info("Found " . count($imagePaths) . " images to optimize for performance");
        
        if ($this->option('dry-run')) {
            $this->showDryRun($imagePaths);
            return;
        }

        foreach ($imagePaths as $imagePath) {
            $this->info("Performance optimizing: " . basename($imagePath));
            $result = $this->optimizeImageForPerformance($imagePath);
            
            if ($result) {
                $webpCount = count($result['webp'] ?? []);
                $hasPlaceholder = isset($result['placeholder']) ? 'Yes' : 'No';
                $this->info("✅ Optimized - WebP versions: {$webpCount}, Placeholder: {$hasPlaceholder}");
            } else {
                $this->error("❌ Failed to optimize");
            }
        }
    }

    /**
     * Optimize single image for performance
     */
    protected function optimizeImageForPerformance($imagePath)
    {
        try {
            // Use the new performance optimization method
            return $this->optimizationService->optimizeImageForPerformance($imagePath, [
                'force' => $this->option('force'),
                'size_filter' => $this->option('size')
            ]);
            
        } catch (\Exception $e) {
            $this->error("Failed to performance optimize {$imagePath}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Optimize all product images
     */
    protected function optimizeAllImages()
    {
        $this->info('🔍 Scanning for images to optimize...');
        
        $imagePaths = $this->collectAllImagePaths();
        $totalImages = count($imagePaths);
        
        if ($totalImages === 0) {
            $this->warn('No images found to optimize.');
            return;
        }

        $this->info("Found {$totalImages} images to process");
        
        if ($this->option('dry-run')) {
            $this->showDryRun($imagePaths);
            return;
        }

        // Confirm before proceeding
        if (!$this->confirm("Proceed with optimization? All images are backed up safely.")) {
            $this->info('Operation cancelled.');
            return;
        }

        $batchSize = (int) $this->option('batch-size');
        $batches = array_chunk($imagePaths, $batchSize);
        $totalBatches = count($batches);
        
        $this->info("Processing {$totalImages} images in {$totalBatches} batches of {$batchSize}");
        
        $progressBar = $this->output->createProgressBar($totalImages);
        $progressBar->start();

        $stats = [
            'processed' => 0,
            'optimized' => 0,
            'failed' => 0,
            'total_saved' => 0,
            'processing_time' => 0
        ];

        $startTime = microtime(true);

        foreach ($batches as $batchIndex => $batch) {
            $this->newLine();
            $this->info("📦 Processing batch " . ($batchIndex + 1) . " of {$totalBatches}");
            
            foreach ($batch as $imagePath) {
                $result = $this->optimizeSingleImage($imagePath);
                
                if ($result) {
                    $stats['optimized']++;
                    if (isset($result['total_saved']['bytes_saved'])) {
                        $stats['total_saved'] += $result['total_saved']['bytes_saved'];
                    }
                } else {
                    $stats['failed']++;
                }
                
                $stats['processed']++;
                $progressBar->advance();
            }
            
            // Small break between batches
            usleep(200000); // 0.2 seconds
        }

        $stats['processing_time'] = microtime(true) - $startTime;
        $progressBar->finish();
        
        $this->newLine(2);
        $this->showOptimizationResults($stats);
    }

    /**
     * Optimize specific product
     */
    protected function optimizeSpecificProduct()
    {
        $productId = $this->option('product');
        
        // Try to find in UnifiedProduct first, then Product
        $product = UnifiedProduct::find($productId) ?? Product::find($productId);
        
        if (!$product) {
            $this->error("Product with ID {$productId} not found.");
            return;
        }

        $this->info("🎯 Optimizing images for product: {$product->name}");
        
        $imagePaths = $this->collectProductImagePaths($product);
        
        if (empty($imagePaths)) {
            $this->warn('No images found for this product.');
            return;
        }

        $this->info("Found " . count($imagePaths) . " images to optimize");
        
        if ($this->option('dry-run')) {
            $this->showDryRun($imagePaths);
            return;
        }

        foreach ($imagePaths as $imagePath) {
            $this->info("Optimizing: " . basename($imagePath));
            $result = $this->optimizeSingleImage($imagePath);
            
            if ($result) {
                $saved = $result['total_saved']['space_saved_formatted'] ?? '0 B';
                $this->info("✅ Optimized - Saved: {$saved}");
            } else {
                $this->error("❌ Failed to optimize");
            }
        }
    }

    /**
     * Optimize single image
     */
    protected function optimizeSingleImage($imagePath)
    {
        try {
            // Check if already optimized and not forcing
            if (!$this->option('force') && $this->isAlreadyOptimized($imagePath)) {
                return true; // Skip but count as success
            }

            $options = [];
            if ($this->option('size')) {
                $options['only_size'] = $this->option('size');
            }

            return $this->optimizationService->optimizeImage($imagePath, $options);
            
        } catch (\Exception $e) {
            $this->error("Failed to optimize {$imagePath}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Check if image is already optimized
     */
    protected function isAlreadyOptimized($imagePath)
    {
        $pathInfo = pathinfo($imagePath);
        $directory = dirname($imagePath);
        $optimizedDir = storage_path('app/' . $directory . '/optimized');
        
        return is_dir($optimizedDir) && !empty(glob($optimizedDir . '/*/' . $pathInfo['filename'] . '_*'));
    }

    /**
     * Collect all image paths
     */
    protected function collectAllImagePaths()
    {
        $imagePaths = [];
        
        // Collect from UnifiedProduct
        $unifiedProducts = UnifiedProduct::whereNotNull('primary_image')->get();
        foreach ($unifiedProducts as $product) {
            if ($product->primary_image) {
                $imagePaths[] = $product->primary_image;
            }
            if ($product->additional_images) {
                $imagePaths = array_merge($imagePaths, $product->additional_images);
            }
        }
        
        // Collect from regular Products
        $products = Product::whereNotNull('image')->get();
        foreach ($products as $product) {
            if ($product->image) {
                $imagePaths[] = $product->image;
            }
            
            // Get related images
            foreach ($product->images as $image) {
                $imagePaths[] = $image->image_path;
            }
        }
        
        // Collect from Attachments
        $attachments = Attachment::whereNotNull('image')->get();
        foreach ($attachments as $attachment) {
            if ($attachment->image) {
                $imagePaths[] = $attachment->image;
            }
            
            // Get related images
            foreach ($attachment->images as $image) {
                $imagePaths[] = $image->path;
            }
        }
        
        // Remove duplicates and filter existing files
        $imagePaths = array_unique($imagePaths);
        $existingPaths = [];
        
        foreach ($imagePaths as $path) {
            if ($path && file_exists(storage_path('app/' . $path))) {
                $existingPaths[] = $path;
            }
        }
        
        return $existingPaths;
    }

    /**
     * Collect image paths for specific product
     */
    protected function collectProductImagePaths($product)
    {
        $imagePaths = [];
        
        if ($product instanceof UnifiedProduct) {
            if ($product->primary_image) {
                $imagePaths[] = $product->primary_image;
            }
            if ($product->additional_images) {
                $imagePaths = array_merge($imagePaths, $product->additional_images);
            }
        } else {
            if ($product->image) {
                $imagePaths[] = $product->image;
            }
            
            foreach ($product->images as $image) {
                $imagePaths[] = $image->image_path;
            }
        }
        
        // Filter existing files
        return array_filter($imagePaths, function($path) {
            return file_exists(storage_path('app/' . $path));
        });
    }

    /**
     * Show dry run results
     */
    protected function showDryRun($imagePaths)
    {
        $this->info('🧪 DRY RUN - No images will be modified');
        $this->info('=====================================');
        
        $totalSize = 0;
        $this->table(['#', 'Image Path', 'Size', 'Status'], 
            array_map(function($path, $index) use (&$totalSize) {
                $fullPath = storage_path('app/' . $path);
                $size = file_exists($fullPath) ? filesize($fullPath) : 0;
                $totalSize += $size;
                $status = $this->isAlreadyOptimized($path) ? '✅ Optimized' : '🔄 Needs optimization';
                
                return [
                    $index + 1,
                    substr($path, 0, 60) . (strlen($path) > 60 ? '...' : ''),
                    $this->formatBytes($size),
                    $status
                ];
            }, $imagePaths, array_keys($imagePaths))
        );
        
        $this->info("Total images: " . count($imagePaths));
        $this->info("Total size: " . $this->formatBytes($totalSize));
    }

    /**
     * Show optimization results
     */
    protected function showOptimizationResults($stats)
    {
        $this->info('📊 Optimization Results');
        $this->info('=======================');
        
        $this->table(['Metric', 'Value'], [
            ['Images Processed', $stats['processed']],
            ['Successfully Optimized', $stats['optimized']],
            ['Failed', $stats['failed']],
            ['Total Space Saved', $this->formatBytes($stats['total_saved'])],
            ['Processing Time', round($stats['processing_time'], 2) . ' seconds'],
            ['Average per Image', round($stats['processing_time'] / max(1, $stats['processed']), 2) . ' seconds']
        ]);
        
        if ($stats['optimized'] > 0) {
            $this->info('✅ Optimization completed successfully!');
            $this->info('💡 Your website images should now load significantly faster.');
        }
        
        if ($stats['failed'] > 0) {
            $this->warn("⚠️  {$stats['failed']} images failed to optimize. Check logs for details.");
        }
    }

    /**
     * Show performance optimization results
     */
    protected function showPerformanceOptimizationResults($stats)
    {
        $this->info('🚀 Performance Optimization Results');
        $this->info('==================================');
        
        $this->table(['Metric', 'Value'], [
            ['Images Processed', $stats['processed']],
            ['Successfully Optimized', $stats['optimized']],
            ['Failed', $stats['failed']],
            ['WebP Versions Created', $stats['webp_created']],
            ['Placeholders Created', $stats['placeholders_created']],
            ['Total Space Optimized', $this->formatBytes($stats['total_saved'])],
            ['Processing Time', round($stats['processing_time'], 2) . ' seconds'],
            ['Average per Image', round($stats['processing_time'] / max(1, $stats['processed']), 2) . ' seconds']
        ]);
        
        if ($stats['optimized'] > 0) {
            $this->info('✅ Performance optimization completed successfully!');
            $this->info('🚀 Your website images will now load dramatically faster:');
            $this->line('   • Instant loading with ultra-small placeholders');
            $this->line('   • WebP format for 25-35% smaller file sizes');
            $this->line('   • Responsive images for all device sizes');
            $this->line('   • Critical image preloading');
            $this->line('   • Browser caching optimization');
        }
        
        if ($stats['failed'] > 0) {
            $this->warn("⚠️  {$stats['failed']} images failed to optimize. Check logs for details.");
        }
        
        $this->newLine();
        $this->info('💡 Next Steps:');
        $this->line('1. Test your website - images should load much faster');
        $this->line('2. Check browser Network tab to see WebP loading');
        $this->line('3. Use OptimizedImage component in React for best results');
        $this->line('4. All original images remain untouched and safe');
    }

    /**
     * Show current optimization statistics
     */
    protected function showStats()
    {
        $this->info('📈 Image Optimization Statistics');
        $this->info('===============================');
        
        $stats = $this->optimizationService->getOptimizationStats();
        
        if ($stats) {
            $this->table(['Metric', 'Value'], [
                ['Original Images Size', $stats['original_size_formatted']],
                ['Optimized Images Size', $stats['optimized_size_formatted']],
                ['Space Saved', $stats['space_saved_formatted']],
                ['Percentage Saved', $stats['percentage_saved'] . '%'],
                ['Optimized Files Count', $stats['optimized_files_count']]
            ]);
        } else {
            $this->warn('Unable to retrieve optimization statistics.');
        }
        
        // Show backup statistics
        $this->newLine();
        $this->call('images:backup', ['--status']);
    }

    /**
     * Clean up old optimized images
     */
    protected function cleanupOldImages()
    {
        $this->info('🧹 Cleaning up old optimized images...');
        
        $deleted = $this->optimizationService->cleanupOptimizedImages(30);
        
        if ($deleted !== false) {
            $this->info("✅ Cleanup completed: {$deleted} old files removed");
        } else {
            $this->error('❌ Cleanup failed. Check logs for details.');
        }
    }

    /**
     * Show ultra-aggressive optimization results
     */
    protected function showUltraAggressiveOptimizationResults($stats)
    {
        $this->info('🚀 ULTRA-AGGRESSIVE Optimization Results');
        $this->info('==========================================');
        
        $this->table(['Metric', 'Value'], [
            ['Images Processed', $stats['processed']],
            ['Successfully Optimized', $stats['optimized']],
            ['Failed', $stats['failed']],
            ['Original Total Size', $this->formatBytes($stats['original_total_size'])],
            ['Optimized Total Size', $this->formatBytes($stats['optimized_total_size'])],
            ['Total Space Optimized', $this->formatBytes($stats['total_saved'])],
            ['Processing Time', round($stats['processing_time'], 2) . ' seconds'],
            ['Average per Image', round($stats['processing_time'] / max(1, $stats['processed']), 2) . ' seconds']
        ]);
        
        if ($stats['optimized'] > 0) {
            $this->info('✅ ULTRA-AGGRESSIVE optimization completed successfully!');
            $this->info('🚀 Your website images will now load dramatically faster:');
            $this->line('   • Instant loading with ultra-small placeholders');
            $this->line('   • ULTRA-aggressive WebP conversion (70% smaller files)');
            $this->line('   • Maximum compression for all sizes');
            $this->line('   • Heavy blur for tiny images');
            $this->line('   • File size limits (max 100KB per image)');
            $this->line('   • Critical image preloading');
            $this->line('   • Browser caching optimization');
        }
        
        if ($stats['failed'] > 0) {
            $this->warn("⚠️  {$stats['failed']} images failed to optimize. Check logs for details.");
        }
        
        $this->newLine();
        $this->info('💡 Next Steps:');
        $this->line('1. Test your website - images should load much faster');
        $this->line('2. Check browser Network tab to see WebP loading');
        $this->line('3. Use OptimizedImage component in React for best results');
        $this->line('4. All original images remain untouched and safe');
    }

    /**
     * Show help information with performance options
     */
    protected function showHelp()
    {
        $this->info('🖼️  AutoPulse Advanced Image Optimization Commands');
        $this->info('===============================================');
        $this->line('');
        $this->info('Performance Optimization (Recommended):');
        $this->line('  --all                Optimize all images for web performance');
        $this->line('  --product=ID         Optimize specific product for performance');
        $this->line('');
        $this->info('Configuration Options:');
        $this->line('  --batch-size=N       Process N images per batch (default: 10)');
        $this->line('  --dry-run            Preview what will be optimized');
        $this->line('  --stats              Show optimization statistics');
        $this->line('  --cleanup            Clean up old optimized images');
        $this->line('  --size=SIZE          Only optimize specific size');
        $this->line('  --force              Force re-optimization');
        $this->line('');
        $this->info('Performance Features:');
        $this->line('  ✓ Ultra-fast placeholder images (<1KB each)');
        $this->line('  ✓ WebP conversion (25-35% smaller files)');
        $this->line('  ✓ Multiple responsive sizes');
        $this->line('  ✓ Critical image detection');
        $this->line('  ✓ Browser caching optimization');
        $this->line('  ✓ 100% Safe - originals never touched');
        $this->line('');
        $this->info('Examples:');
        $this->line('  php artisan images:optimize --all                # Performance optimize all');
        $this->line('  php artisan images:optimize --product=123        # Optimize specific product');
        $this->line('  php artisan images:optimize --all --dry-run      # Preview optimization');
        $this->line('  php artisan images:optimize --stats              # Show current stats');
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