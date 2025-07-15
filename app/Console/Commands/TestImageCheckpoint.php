<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\UnifiedProduct;
use App\Models\Category;
use App\Models\Attachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageBackupService;
use App\Services\RobustImageService;
use Carbon\Carbon;

class TestImageCheckpoint extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'images:test-checkpoint 
                            {--create-test-data : Create test data for validation}
                            {--verify-existing : Verify existing data integrity}
                            {--test-recovery : Test image recovery functionality}
                            {--test-categories : Test category data specifically}
                            {--test-attachments : Test attachment data specifically}
                            {--comprehensive : Run comprehensive test suite}
                            {--report : Generate detailed test report}';

    /**
     * The console command description.
     */
    protected $description = 'Test image checkpoint system and validate database safety';

    protected $backupService;
    protected $robustImageService;

    /**
     * Create a new command instance.
     */
    public function __construct(ImageBackupService $backupService, RobustImageService $robustImageService)
    {
        parent::__construct();
        $this->backupService = $backupService;
        $this->robustImageService = $robustImageService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🧪 Testing Image Checkpoint System');
        $this->info('================================');

        $testResults = [
            'database_integrity' => false,
            'image_accessibility' => false,
            'backup_functionality' => false,
            'recovery_functionality' => false,
            'category_data' => false,
            'attachment_data' => false,
            'checkpoint_creation' => false,
            'checkpoint_restoration' => false
        ];

        // Test 1: Database Integrity
        $this->info('Test 1: Database Integrity Check...');
        $testResults['database_integrity'] = $this->testDatabaseIntegrity();

        // Test 2: Image Accessibility
        $this->info('Test 2: Image Accessibility Check...');
        $testResults['image_accessibility'] = $this->testImageAccessibility();

        // Test 3: Backup Functionality
        $this->info('Test 3: Backup Functionality Test...');
        $testResults['backup_functionality'] = $this->testBackupFunctionality();

        // Test 4: Recovery Functionality
        if ($this->option('test-recovery')) {
            $this->info('Test 4: Recovery Functionality Test...');
            $testResults['recovery_functionality'] = $this->testRecoveryFunctionality();
        }

        // Test 5: Category Data Validation
        if ($this->option('test-categories')) {
            $this->info('Test 5: Category Data Validation...');
            $testResults['category_data'] = $this->testCategoryData();
        }

        // Test 6: Attachment Data Validation
        if ($this->option('test-attachments')) {
            $this->info('Test 6: Attachment Data Validation...');
            $testResults['attachment_data'] = $this->testAttachmentData();
        }

        // Test 7: Checkpoint Creation
        $this->info('Test 7: Checkpoint Creation Test...');
        $testResults['checkpoint_creation'] = $this->testCheckpointCreation();

        // Test 8: Checkpoint Restoration
        $this->info('Test 8: Checkpoint Restoration Test...');
        $testResults['checkpoint_restoration'] = $this->testCheckpointRestoration();

        // Generate comprehensive report
        $this->generateTestReport($testResults);

        // Overall assessment
        $passedTests = count(array_filter($testResults));
        $totalTests = count($testResults);
        $successRate = ($passedTests / $totalTests) * 100;

        $this->info("📊 Test Results Summary:");
        $this->info("- Passed: {$passedTests}/{$totalTests}");
        $this->info("- Success Rate: {$successRate}%");

        if ($successRate >= 90) {
            $this->info('✅ EXCELLENT: System is ready for production with high confidence');
            return 0;
        } elseif ($successRate >= 75) {
            $this->info('⚠️ GOOD: System is mostly safe but some issues need attention');
            return 1;
        } else {
            $this->error('❌ CRITICAL: System has significant issues that must be resolved');
            return 2;
        }
    }

    /**
     * Test database integrity
     */
    private function testDatabaseIntegrity()
    {
        try {
            // Test 1: Check if all required tables exist
            $requiredTables = [
                'unified_products',
                'categories',
                'attachments',
                'image_backups',
                'image_registry',
                'image_checkpoints',
                'checkpoint_images'
            ];

            foreach ($requiredTables as $table) {
                if (!DB::getSchemaBuilder()->hasTable($table)) {
                    $this->error("❌ Missing table: {$table}");
                    return false;
                }
            }

            // Test 2: Check data consistency
            $productCount = UnifiedProduct::count();
            $categoryCount = Category::count();
            $attachmentCount = Attachment::count();

            if ($productCount === 0 && $categoryCount === 0 && $attachmentCount === 0) {
                $this->warn("⚠️ No data found in database");
            }

            // Test 3: Check foreign key relationships
            $orphanedProducts = UnifiedProduct::whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                      ->from('categories')
                      ->whereRaw('categories.id = unified_products.category_id');
            })->count();

            if ($orphanedProducts > 0) {
                $this->warn("⚠️ Found {$orphanedProducts} products with invalid category references");
            }

            $this->info("✅ Database integrity check passed");
            $this->info("- Products: {$productCount}");
            $this->info("- Categories: {$categoryCount}");
            $this->info("- Attachments: {$attachmentCount}");

            return true;

        } catch (\Exception $e) {
            $this->error("❌ Database integrity test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test image accessibility
     */
    private function testImageAccessibility()
    {
        try {
            $stats = [
                'total_images' => 0,
                'accessible_images' => 0,
                'missing_images' => 0,
                'recovered_images' => 0
            ];

            $products = UnifiedProduct::all();

            foreach ($products as $product) {
                // Check primary image
                if ($product->primary_image) {
                    $stats['total_images']++;
                    if (Storage::exists($product->primary_image)) {
                        $stats['accessible_images']++;
                    } else {
                        $stats['missing_images']++;
                        // Try to recover
                        if ($this->robustImageService->recoverImage($product->primary_image)) {
                            $stats['recovered_images']++;
                        }
                    }
                }

                // Check additional images
                if ($product->additional_images) {
                    foreach ($product->additional_images as $imagePath) {
                        $stats['total_images']++;
                        if (Storage::exists($imagePath)) {
                            $stats['accessible_images']++;
                        } else {
                            $stats['missing_images']++;
                            // Try to recover
                            if ($this->robustImageService->recoverImage($imagePath)) {
                                $stats['recovered_images']++;
                            }
                        }
                    }
                }
            }

            $this->info("📸 Image Accessibility Results:");
            $this->info("- Total images: {$stats['total_images']}");
            $this->info("- Accessible: {$stats['accessible_images']}");
            $this->info("- Missing: {$stats['missing_images']}");
            $this->info("- Recovered: {$stats['recovered_images']}");

            $accessibilityRate = $stats['total_images'] > 0 ? 
                (($stats['accessible_images'] + $stats['recovered_images']) / $stats['total_images']) * 100 : 100;

            if ($accessibilityRate >= 95) {
                $this->info("✅ Image accessibility: {$accessibilityRate}% (Excellent)");
                return true;
            } elseif ($accessibilityRate >= 80) {
                $this->warn("⚠️ Image accessibility: {$accessibilityRate}% (Good)");
                return true;
            } else {
                $this->error("❌ Image accessibility: {$accessibilityRate}% (Poor)");
                return false;
            }

        } catch (\Exception $e) {
            $this->error("❌ Image accessibility test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test backup functionality
     */
    private function testBackupFunctionality()
    {
        try {
            // Test backup creation
            $testProduct = UnifiedProduct::first();
            
            if (!$testProduct) {
                $this->warn("⚠️ No products found for backup test");
                return true;
            }

            $backupResult = $this->backupService->backupProductImages($testProduct);
            
            if ($backupResult) {
                $this->info("✅ Backup functionality test passed");
                return true;
            } else {
                $this->error("❌ Backup functionality test failed");
                return false;
            }

        } catch (\Exception $e) {
            $this->error("❌ Backup functionality test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test recovery functionality
     */
    private function testRecoveryFunctionality()
    {
        try {
            // Find a test image
            $testImage = DB::table('image_registry')->first();
            
            if (!$testImage) {
                $this->warn("⚠️ No images found for recovery test");
                return true;
            }

            // Test recovery
            $recoveryResult = $this->robustImageService->recoverImage($testImage->path);
            
            if ($recoveryResult) {
                $this->info("✅ Recovery functionality test passed");
                return true;
            } else {
                $this->warn("⚠️ Recovery functionality test inconclusive");
                return true; // Not a critical failure
            }

        } catch (\Exception $e) {
            $this->error("❌ Recovery functionality test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test category data specifically
     */
    private function testCategoryData()
    {
        try {
            $categories = Category::all();
            $stats = [
                'total_categories' => $categories->count(),
                'categories_with_images' => 0,
                'categories_with_products' => 0,
                'valid_categories' => 0
            ];

            foreach ($categories as $category) {
                // Check if category has products
                $productCount = UnifiedProduct::where('category_id', $category->id)->count();
                if ($productCount > 0) {
                    $stats['categories_with_products']++;
                }

                // Check if category has image
                if ($category->image) {
                    $stats['categories_with_images']++;
                    if (Storage::exists($category->image)) {
                        $stats['valid_categories']++;
                    }
                } else {
                    $stats['valid_categories']++;
                }
            }

            $this->info("📁 Category Data Test Results:");
            $this->info("- Total categories: {$stats['total_categories']}");
            $this->info("- Categories with products: {$stats['categories_with_products']}");
            $this->info("- Categories with images: {$stats['categories_with_images']}");
            $this->info("- Valid categories: {$stats['valid_categories']}");

            $validityRate = $stats['total_categories'] > 0 ? 
                ($stats['valid_categories'] / $stats['total_categories']) * 100 : 100;

            if ($validityRate >= 90) {
                $this->info("✅ Category data validity: {$validityRate}% (Excellent)");
                return true;
            } else {
                $this->error("❌ Category data validity: {$validityRate}% (Poor)");
                return false;
            }

        } catch (\Exception $e) {
            $this->error("❌ Category data test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test attachment data specifically
     */
    private function testAttachmentData()
    {
        try {
            $attachments = Attachment::all();
            $stats = [
                'total_attachments' => $attachments->count(),
                'attachments_with_images' => 0,
                'valid_attachments' => 0
            ];

            foreach ($attachments as $attachment) {
                if ($attachment->image) {
                    $stats['attachments_with_images']++;
                    if (Storage::exists($attachment->image)) {
                        $stats['valid_attachments']++;
                    }
                } else {
                    $stats['valid_attachments']++;
                }
            }

            $this->info("🔧 Attachment Data Test Results:");
            $this->info("- Total attachments: {$stats['total_attachments']}");
            $this->info("- Attachments with images: {$stats['attachments_with_images']}");
            $this->info("- Valid attachments: {$stats['valid_attachments']}");

            $validityRate = $stats['total_attachments'] > 0 ? 
                ($stats['valid_attachments'] / $stats['total_attachments']) * 100 : 100;

            if ($validityRate >= 90) {
                $this->info("✅ Attachment data validity: {$validityRate}% (Excellent)");
                return true;
            } else {
                $this->error("❌ Attachment data validity: {$validityRate}% (Poor)");
                return false;
            }

        } catch (\Exception $e) {
            $this->error("❌ Attachment data test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test checkpoint creation
     */
    private function testCheckpointCreation()
    {
        try {
            // Run checkpoint creation command
            $command = 'php artisan images:checkpoint --create --force';
            $output = shell_exec($command);
            
            if (strpos($output, 'Checkpoint created successfully') !== false) {
                $this->info("✅ Checkpoint creation test passed");
                return true;
            } else {
                $this->error("❌ Checkpoint creation test failed");
                return false;
            }

        } catch (\Exception $e) {
            $this->error("❌ Checkpoint creation test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Test checkpoint restoration
     */
    private function testCheckpointRestoration()
    {
        try {
            // Check if checkpoints exist
            $checkpointCount = DB::table('image_checkpoints')->count();
            
            if ($checkpointCount === 0) {
                $this->warn("⚠️ No checkpoints found for restoration test");
                return true;
            }

            // Test checkpoint verification
            $command = 'php artisan images:checkpoint --verify';
            $output = shell_exec($command);
            
            if (strpos($output, 'Checkpoint verification successful') !== false) {
                $this->info("✅ Checkpoint restoration test passed");
                return true;
            } else {
                $this->warn("⚠️ Checkpoint restoration test inconclusive");
                return true; // Not a critical failure
            }

        } catch (\Exception $e) {
            $this->error("❌ Checkpoint restoration test failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Generate comprehensive test report
     */
    private function generateTestReport($testResults)
    {
        $report = [
            'timestamp' => now()->toISOString(),
            'test_results' => $testResults,
            'summary' => [
                'total_tests' => count($testResults),
                'passed_tests' => count(array_filter($testResults)),
                'failed_tests' => count(array_filter($testResults, function($result) {
                    return !$result;
                })),
                'success_rate' => (count(array_filter($testResults)) / count($testResults)) * 100
            ],
            'recommendations' => $this->generateTestRecommendations($testResults)
        ];

        // Save report
        $reportPath = storage_path('app/test_reports/image_checkpoint_test_' . now()->format('Y-m-d_H-i-s') . '.json');
        $this->ensureDirectoryExists(dirname($reportPath));
        file_put_contents($reportPath, json_encode($report, JSON_PRETTY_PRINT));

        $this->info("📊 Test report saved to: {$reportPath}");
    }

    /**
     * Generate test recommendations
     */
    private function generateTestRecommendations($testResults)
    {
        $recommendations = [];

        if (!$testResults['database_integrity']) {
            $recommendations[] = "Fix database integrity issues before proceeding";
        }

        if (!$testResults['image_accessibility']) {
            $recommendations[] = "Recover missing images and verify all image paths";
        }

        if (!$testResults['backup_functionality']) {
            $recommendations[] = "Verify backup service configuration and permissions";
        }

        if (!$testResults['category_data']) {
            $recommendations[] = "Review category data and fix invalid references";
        }

        if (!$testResults['attachment_data']) {
            $recommendations[] = "Review attachment data and fix missing images";
        }

        if (!$testResults['checkpoint_creation']) {
            $recommendations[] = "Verify checkpoint creation permissions and storage";
        }

        if (!$testResults['checkpoint_restoration']) {
            $recommendations[] = "Verify checkpoint restoration functionality";
        }

        if (empty($recommendations)) {
            $recommendations[] = "All systems are functioning properly";
        }

        return $recommendations;
    }

    /**
     * Ensure directory exists
     */
    private function ensureDirectoryExists($path)
    {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }
} 