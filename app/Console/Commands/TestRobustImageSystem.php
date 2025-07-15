<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\RobustImageService;
use App\Models\UnifiedProduct;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TestRobustImageSystem extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'images:test-robust-system 
                            {--fix-existing : Fix existing images to use robust system}
                            {--verify : Verify all images}
                            {--report : Generate comprehensive report}';

    /**
     * The console command description.
     */
    protected $description = 'Test and verify the robust image management system';

    protected $robustImageService;

    public function __construct(RobustImageService $robustImageService)
    {
        parent::__construct();
        $this->robustImageService = $robustImageService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Robust Image Management System...');

        if ($this->option('fix-existing')) {
            $this->fixExistingImages();
        }

        if ($this->option('verify')) {
            $this->verifyImages();
        }

        if ($this->option('report')) {
            $this->generateReport();
        }

        if (!$this->option('fix-existing') && !$this->option('verify') && !$this->option('report')) {
            $this->runAllTests();
        }
    }

    /**
     * Fix existing images to use the robust system
     */
    protected function fixExistingImages()
    {
        $this->info('Registering existing images in the robust system...');

        $products = UnifiedProduct::whereNotNull('primary_image')->get();
        $registered = 0;
        $errors = 0;

        foreach ($products as $product) {
            try {
                // Register primary image
                if ($product->primary_image && Storage::exists($product->primary_image)) {
                    $exists = DB::table('image_registry')
                        ->where('path', $product->primary_image)
                        ->exists();

                    if (!$exists) {
                        $fullPath = storage_path("app/{$product->primary_image}");
                        $fileSize = filesize($fullPath);
                        $mimeType = mime_content_type($fullPath);

                        DB::table('image_registry')->insert([
                            'path' => $product->primary_image,
                            'original_name' => basename($product->primary_image),
                            'filename' => basename($product->primary_image),
                            'category' => 'products',
                            'entity_id' => $product->id,
                            'size' => $fileSize,
                            'mime_type' => $mimeType,
                            'metadata' => json_encode(['type' => 'primary', 'product_name' => $product->name]),
                            'status' => 'active',
                            'backup_status' => 'completed',
                            'created_at' => $product->created_at,
                            'updated_at' => now()
                        ]);

                        $registered++;
                    }
                }

                // Register additional images
                if ($product->additional_images) {
                    foreach ($product->additional_images as $index => $imagePath) {
                        if (Storage::exists($imagePath)) {
                            $exists = DB::table('image_registry')
                                ->where('path', $imagePath)
                                ->exists();

                            if (!$exists) {
                                $fullPath = storage_path("app/{$imagePath}");
                                $fileSize = filesize($fullPath);
                                $mimeType = mime_content_type($fullPath);

                                DB::table('image_registry')->insert([
                                    'path' => $imagePath,
                                    'original_name' => basename($imagePath),
                                    'filename' => basename($imagePath),
                                    'category' => 'products',
                                    'entity_id' => $product->id,
                                    'size' => $fileSize,
                                    'mime_type' => $mimeType,
                                    'metadata' => json_encode(['type' => 'additional', 'index' => $index, 'product_name' => $product->name]),
                                    'status' => 'active',
                                    'backup_status' => 'completed',
                                    'created_at' => $product->created_at,
                                    'updated_at' => now()
                                ]);

                                $registered++;
                            }
                        }
                    }
                }

            } catch (\Exception $e) {
                $this->error("Failed to register images for product {$product->id}: " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("Registration complete: {$registered} images registered, {$errors} errors");
    }

    /**
     * Verify all images in the system
     */
    protected function verifyImages()
    {
        $this->info('Verifying all images...');

        $stats = $this->robustImageService->verifyAndRecoverAllImages();

        $this->table(
            ['Metric', 'Count'],
            [
                ['Total Images', $stats['total']],
                ['Verified Present', $stats['verified']],
                ['Recovered from Backup', $stats['recovered']],
                ['Still Missing', $stats['missing']]
            ]
        );

        if ($stats['recovered'] > 0) {
            $this->info("Successfully recovered {$stats['recovered']} images from backup!");
        }

        if ($stats['missing'] > 0) {
            $this->warn("Warning: {$stats['missing']} images are still missing and could not be recovered");
        }
    }

    /**
     * Generate comprehensive system report
     */
    protected function generateReport()
    {
        $this->info('Generating comprehensive system report...');

        // Product statistics
        $totalProducts = UnifiedProduct::count();
        $productsWithImages = UnifiedProduct::whereNotNull('primary_image')->count();
        $productsWithoutImages = $totalProducts - $productsWithImages;

        // Image registry statistics
        $totalRegistered = DB::table('image_registry')->count();
        $activeImages = DB::table('image_registry')->where('status', 'active')->count();
        $missingImages = DB::table('image_registry')->where('status', 'missing')->count();
        $replacedImages = DB::table('image_registry')->where('status', 'replaced')->count();

        // Backup statistics
        $backupCompleted = DB::table('image_registry')->where('backup_status', 'completed')->count();
        $backupPending = DB::table('image_registry')->where('backup_status', 'pending')->count();
        $backupFailed = DB::table('image_registry')->where('backup_status', 'failed')->count();

        // Recent activity
        $recentUploads = DB::table('image_registry')
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        // Storage usage
        $totalSize = DB::table('image_registry')
            ->where('status', 'active')
            ->sum('size');

        $this->info("\n=== ROBUST IMAGE SYSTEM REPORT ===");
        
        $this->table(
            ['Category', 'Metric', 'Value'],
            [
                ['Products', 'Total Products', $totalProducts],
                ['Products', 'Products with Images', $productsWithImages],
                ['Products', 'Products without Images', $productsWithoutImages],
                ['Products', 'Image Coverage', round(($productsWithImages / $totalProducts) * 100, 2) . '%'],
                ['', '', ''],
                ['Registry', 'Total Registered Images', $totalRegistered],
                ['Registry', 'Active Images', $activeImages],
                ['Registry', 'Missing Images', $missingImages],
                ['Registry', 'Replaced Images', $replacedImages],
                ['', '', ''],
                ['Backup', 'Backup Completed', $backupCompleted],
                ['Backup', 'Backup Pending', $backupPending],
                ['Backup', 'Backup Failed', $backupFailed],
                ['Backup', 'Backup Success Rate', round(($backupCompleted / max($totalRegistered, 1)) * 100, 2) . '%'],
                ['', '', ''],
                ['Activity', 'Uploads (Last 7 days)', $recentUploads],
                ['Storage', 'Total Size (MB)', round($totalSize / 1024 / 1024, 2)],
            ]
        );

        // System health assessment
        $healthScore = $this->calculateHealthScore([
            'image_coverage' => ($productsWithImages / $totalProducts) * 100,
            'backup_success' => ($backupCompleted / max($totalRegistered, 1)) * 100,
            'missing_rate' => ($missingImages / max($totalRegistered, 1)) * 100
        ]);

        $this->info("\n=== SYSTEM HEALTH ASSESSMENT ===");
        $this->info("Overall Health Score: {$healthScore}/100");

        if ($healthScore >= 90) {
            $this->info("🟢 System Status: EXCELLENT - Image management is robust and reliable");
        } elseif ($healthScore >= 80) {
            $this->info("🟡 System Status: GOOD - Minor issues detected");
        } elseif ($healthScore >= 70) {
            $this->info("🟠 System Status: FAIR - Some issues need attention");
        } else {
            $this->error("🔴 System Status: POOR - Immediate action required");
        }

        // Recommendations
        $this->info("\n=== RECOMMENDATIONS ===");
        
        if ($productsWithoutImages > 0) {
            $this->warn("• Add images to {$productsWithoutImages} products without images");
        }
        
        if ($missingImages > 0) {
            $this->warn("• Investigate and recover {$missingImages} missing images");
        }
        
        if ($backupPending > 0) {
            $this->warn("• Complete backup for {$backupPending} pending images");
        }

        if ($backupFailed > 0) {
            $this->error("• Fix backup failures for {$backupFailed} images");
        }
    }

    /**
     * Run all tests
     */
    protected function runAllTests()
    {
        $this->fixExistingImages();
        $this->line('');
        $this->verifyImages();
        $this->line('');
        $this->generateReport();
    }

    /**
     * Calculate system health score
     */
    protected function calculateHealthScore($metrics)
    {
        $imageCoverage = min($metrics['image_coverage'], 100);
        $backupSuccess = min($metrics['backup_success'], 100);
        $missingRate = max(0, 100 - $metrics['missing_rate']);

        // Weighted average
        $score = ($imageCoverage * 0.4) + ($backupSuccess * 0.3) + ($missingRate * 0.3);

        return round($score, 1);
    }
}
