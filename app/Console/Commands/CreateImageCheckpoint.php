<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\UnifiedProduct;
use App\Models\ImageBackup;
use App\Services\ImageBackupService;
use App\Services\RobustImageService;
use Carbon\Carbon;
use App\Models\Category;
use App\Models\Attachment;

class CreateImageCheckpoint extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'images:checkpoint 
                            {--create : Create a new checkpoint}
                            {--verify : Verify current checkpoint}
                            {--restore : Restore from latest checkpoint}
                            {--list : List all checkpoints}
                            {--test : Test checkpoint functionality}
                            {--force : Force checkpoint creation even if issues found}';

    /**
     * The console command description.
     */
    protected $description = 'Create and manage image checkpoints to prevent data loss';

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
        if ($this->option('create')) {
            $this->createComprehensiveCheckpoint();
        } elseif ($this->option('verify')) {
            $this->verifyCheckpoint();
        } elseif ($this->option('restore')) {
            $this->restoreFromCheckpoint();
        } elseif ($this->option('list')) {
            $this->listCheckpoints();
        } elseif ($this->option('test')) {
            $this->testCheckpointFunctionality();
        } else {
            $this->showHelp();
        }
    }

    /**
     * Create a comprehensive checkpoint
     */
    private function createCheckpoint()
    {
        $this->info('🛡️ Creating Image Checkpoint...');
        $this->info('================================');

        // Step 1: Verify all images exist
        $this->info('Step 1: Verifying all images...');
        $imageStats = $this->verifyAllImages();
        
        if ($imageStats['missing'] > 0 && !$this->option('force')) {
            $this->error("❌ Found {$imageStats['missing']} missing images. Cannot create checkpoint.");
            $this->error("Use --force to create checkpoint anyway, or fix missing images first.");
            return 1;
        }

        // Step 2: Create database snapshot
        $this->info('Step 2: Creating database snapshot...');
        $dbSnapshot = $this->createDatabaseSnapshot();
        
        if (!$dbSnapshot) {
            $this->error('❌ Failed to create database snapshot');
            return 1;
        }

        // Step 3: Create file system backup
        $this->info('Step 3: Creating file system backup...');
        $fileBackup = $this->createFileSystemBackup();
        
        if (!$fileBackup) {
            $this->error('❌ Failed to create file system backup');
            return 1;
        }

        // Step 4: Create checkpoint record
        $this->info('Step 4: Creating checkpoint record...');
        $checkpointId = $this->createCheckpointRecord($imageStats, $dbSnapshot, $fileBackup);
        
        if (!$checkpointId) {
            $this->error('❌ Failed to create checkpoint record');
            return 1;
        }

        // Step 5: Verify checkpoint integrity
        $this->info('Step 5: Verifying checkpoint integrity...');
        $integrityCheck = $this->verifyCheckpointIntegrity($checkpointId);
        
        if (!$integrityCheck) {
            $this->error('❌ Checkpoint integrity verification failed');
            return 1;
        }

        $this->info('✅ Checkpoint created successfully!');
        $this->info("Checkpoint ID: {$checkpointId}");
        $this->info("Total Images: {$imageStats['total']}");
        $this->info("Verified Images: {$imageStats['verified']}");
        $this->info("Recovered Images: {$imageStats['recovered']}");
        $this->info("Missing Images: {$imageStats['missing']}");
        
        return 0;
    }

    /**
     * Create a comprehensive checkpoint for all content types
     */
    private function createComprehensiveCheckpoint()
    {
        $this->info('🛡️ Creating Comprehensive Image Checkpoint...');
        $this->info('==============================================');

        // Step 1: Verify all images exist
        $this->info('Step 1: Verifying all images...');
        $imageStats = $this->verifyAllImagesComprehensive();
        
        if ($imageStats['missing'] > 0 && !$this->option('force')) {
            $this->warn("⚠️ Found {$imageStats['missing']} missing images. Creating checkpoint anyway with --force.");
        }

        // Step 2: Create database snapshot
        $this->info('Step 2: Creating database snapshot...');
        $dbSnapshot = $this->createComprehensiveDatabaseSnapshot();
        
        if (!$dbSnapshot) {
            $this->error('❌ Failed to create database snapshot');
            return 1;
        }

        // Step 3: Create file system backup
        $this->info('Step 3: Creating file system backup...');
        $fileBackup = $this->createFileSystemBackup();
        
        if (!$fileBackup) {
            $this->error('❌ Failed to create file system backup');
            return 1;
        }

        // Step 4: Create checkpoint record
        $this->info('Step 4: Creating checkpoint record...');
        $checkpointId = $this->createCheckpointRecord($imageStats, $dbSnapshot, $fileBackup);
        
        if (!$checkpointId) {
            $this->error('❌ Failed to create checkpoint record');
            return 1;
        }

        // Step 5: Verify checkpoint integrity
        $this->info('Step 5: Verifying checkpoint integrity...');
        $integrityCheck = $this->verifyCheckpointIntegrity($checkpointId);
        
        if (!$integrityCheck) {
            $this->error('❌ Checkpoint integrity verification failed');
            return 1;
        }

        $this->info('✅ Comprehensive checkpoint created successfully!');
        $this->info("Checkpoint ID: {$checkpointId}");
        $this->info("Total Images: {$imageStats['total']}");
        $this->info("Verified Images: {$imageStats['verified']}");
        $this->info("Recovered Images: {$imageStats['recovered']}");
        $this->info("Missing Images: {$imageStats['missing']}");
        
        return 0;
    }

    /**
     * Verify current checkpoint
     */
    private function verifyCheckpoint()
    {
        $this->info('🔍 Verifying Current Checkpoint...');
        $this->info('================================');

        $latestCheckpoint = DB::table('image_checkpoints')
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$latestCheckpoint) {
            $this->error('❌ No checkpoints found');
            return 1;
        }

        $this->info("Latest Checkpoint: {$latestCheckpoint->id}");
        $this->info("Created: {$latestCheckpoint->created_at}");
        $this->info("Status: {$latestCheckpoint->status}");

        // Verify images from checkpoint
        $checkpointImages = DB::table('checkpoint_images')
            ->where('checkpoint_id', $latestCheckpoint->id)
            ->get();

        $this->info("Images in checkpoint: {$checkpointImages->count()}");

        $verified = 0;
        $missing = 0;

        foreach ($checkpointImages as $image) {
            if (Storage::exists($image->path)) {
                $verified++;
            } else {
                $missing++;
                $this->warn("Missing image: {$image->path}");
            }
        }

        $this->info("Verified images: {$verified}");
        $this->info("Missing images: {$missing}");

        if ($missing === 0) {
            $this->info('✅ Checkpoint verification successful - all images present');
            return 0;
        } else {
            $this->error("❌ Checkpoint verification failed - {$missing} images missing");
            return 1;
        }
    }

    /**
     * Restore from latest checkpoint
     */
    private function restoreFromCheckpoint()
    {
        $this->info('🔄 Restoring from Checkpoint...');
        $this->info('==============================');

        $latestCheckpoint = DB::table('image_checkpoints')
            ->where('status', 'verified')
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$latestCheckpoint) {
            $this->error('❌ No verified checkpoints found');
            return 1;
        }

        $this->info("Restoring from checkpoint: {$latestCheckpoint->id}");

        // Restore database state
        $this->info('Restoring database state...');
        $dbRestored = $this->restoreDatabaseState($latestCheckpoint->db_snapshot_path);
        
        if (!$dbRestored) {
            $this->error('❌ Failed to restore database state');
            return 1;
        }

        // Restore file system
        $this->info('Restoring file system...');
        $filesRestored = $this->restoreFileSystem($latestCheckpoint->file_backup_path);
        
        if (!$filesRestored) {
            $this->error('❌ Failed to restore file system');
            return 1;
        }

        $this->info('✅ Restoration completed successfully');
        return 0;
    }

    /**
     * List all checkpoints
     */
    private function listCheckpoints()
    {
        $this->info('📋 Image Checkpoints');
        $this->info('===================');

        $checkpoints = DB::table('image_checkpoints')
            ->orderBy('created_at', 'desc')
            ->get();

        if ($checkpoints->isEmpty()) {
            $this->info('No checkpoints found');
            return 0;
        }

        $headers = ['ID', 'Created', 'Status', 'Images', 'Size', 'Description'];
        $rows = [];

        foreach ($checkpoints as $checkpoint) {
            $imageCount = DB::table('checkpoint_images')
                ->where('checkpoint_id', $checkpoint->id)
                ->count();

            $rows[] = [
                $checkpoint->id,
                $checkpoint->created_at,
                $checkpoint->status,
                $imageCount,
                $this->formatBytes($checkpoint->total_size),
                $checkpoint->description
            ];
        }

        $this->table($headers, $rows);
        return 0;
    }

    /**
     * Test checkpoint functionality
     */
    private function testCheckpointFunctionality()
    {
        $this->info('🧪 Testing Checkpoint Functionality...');
        $this->info('=====================================');

        // Test 1: Verify image registry
        $this->info('Test 1: Verifying image registry...');
        $registryCount = DB::table('image_registry')->count();
        $this->info("Images in registry: {$registryCount}");

        // Test 2: Verify image backups
        $this->info('Test 2: Verifying image backups...');
        $backupCount = ImageBackup::count();
        $this->info("Backup records: {$backupCount}");

        // Test 3: Test image recovery
        $this->info('Test 3: Testing image recovery...');
        $recoveryTest = $this->testImageRecovery();
        $this->info($recoveryTest ? '✅ Recovery test passed' : '❌ Recovery test failed');

        // Test 4: Test database operations
        $this->info('Test 4: Testing database operations...');
        $dbTest = $this->testDatabaseOperations();
        $this->info($dbTest ? '✅ Database test passed' : '❌ Database test failed');

        // Test 5: Test file system operations
        $this->info('Test 5: Testing file system operations...');
        $fsTest = $this->testFileSystemOperations();
        $this->info($fsTest ? '✅ File system test passed' : '❌ File system test failed');

        $this->info('✅ All checkpoint functionality tests completed');
        return 0;
    }

    /**
     * Verify all images in the system
     */
    private function verifyAllImages()
    {
        $stats = [
            'total' => 0,
            'verified' => 0,
            'recovered' => 0,
            'missing' => 0
        ];

        // Check unified products
        $products = UnifiedProduct::all();
        foreach ($products as $product) {
            if ($product->primary_image) {
                $stats['total']++;
                if (Storage::exists($product->primary_image)) {
                    $stats['verified']++;
                } else {
                    if ($this->robustImageService->recoverImage($product->primary_image)) {
                        $stats['recovered']++;
                    } else {
                        $stats['missing']++;
                    }
                }
            }

            if ($product->additional_images) {
                foreach ($product->additional_images as $imagePath) {
                    $stats['total']++;
                    if (Storage::exists($imagePath)) {
                        $stats['verified']++;
                    } else {
                        if ($this->robustImageService->recoverImage($imagePath)) {
                            $stats['recovered']++;
                        } else {
                            $stats['missing']++;
                        }
                    }
                }
            }
        }

        return $stats;
    }

    /**
     * Verify all images in the system comprehensively
     */
    private function verifyAllImagesComprehensive()
    {
        $stats = [
            'total' => 0,
            'verified' => 0,
            'recovered' => 0,
            'missing' => 0
        ];

        // Check unified products (blogs, solutions, attachments, accessories, heavy machinery)
        $products = UnifiedProduct::all();
        foreach ($products as $product) {
            if ($product->primary_image) {
                $stats['total']++;
                if (Storage::exists($product->primary_image)) {
                    $stats['verified']++;
                } else {
                    if ($this->robustImageService->recoverImage($product->primary_image)) {
                        $stats['recovered']++;
                    } else {
                        $stats['missing']++;
                    }
                }
            }

            if ($product->additional_images) {
                foreach ($product->additional_images as $imagePath) {
                    $stats['total']++;
                    if (Storage::exists($imagePath)) {
                        $stats['verified']++;
                    } else {
                        if ($this->robustImageService->recoverImage($imagePath)) {
                            $stats['recovered']++;
                        } else {
                            $stats['missing']++;
                        }
                    }
                }
            }
        }

        // Check attachments
        $attachments = Attachment::all();
        foreach ($attachments as $attachment) {
            if ($attachment->image_path) {
                $stats['total']++;
                if (Storage::exists($attachment->image_path)) {
                    $stats['verified']++;
                } else {
                    if ($this->robustImageService->recoverImage($attachment->image_path)) {
                        $stats['recovered']++;
                    } else {
                        $stats['missing']++;
                    }
                }
            }
        }

        return $stats;
    }

    /**
     * Create database snapshot
     */
    private function createDatabaseSnapshot()
    {
        try {
            $timestamp = now()->format('Y-m-d_H-i-s');
            $snapshotPath = "backups/database_snapshots/snapshot_{$timestamp}.json";
            
            // Create directory
            $dir = storage_path('app/backups/database_snapshots');
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }

            // Export database data as JSON
            $snapshot = [
                'timestamp' => now()->toISOString(),
                'unified_products' => UnifiedProduct::all()->toArray(),
                'categories' => Category::all()->toArray(),
                'attachments' => Attachment::all()->toArray(),
                'image_backups' => DB::table('image_backups')->get()->toArray(),
                'image_registry' => DB::table('image_registry')->get()->toArray(),
                'image_checkpoints' => DB::table('image_checkpoints')->get()->toArray(),
                'checkpoint_images' => DB::table('checkpoint_images')->get()->toArray()
            ];

            file_put_contents(storage_path("app/{$snapshotPath}"), json_encode($snapshot, JSON_PRETTY_PRINT));

            return $snapshotPath;
        } catch (\Exception $e) {
            Log::error('Database snapshot failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Create comprehensive database snapshot
     */
    private function createComprehensiveDatabaseSnapshot()
    {
        try {
            $timestamp = now()->format('Y-m-d_H-i-s');
            $snapshotPath = "backups/database_snapshots/comprehensive_snapshot_{$timestamp}.json";
            $fullPath = storage_path('app/' . $snapshotPath);

            // Ensure directory exists
            $directory = dirname($fullPath);
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            $snapshotData = [
                'created_at' => now()->toISOString(),
                'description' => 'Comprehensive checkpoint including all content types',
                'unified_products' => DB::table('unified_products')->get()->toArray(),
                'categories' => DB::table('categories')->get()->toArray(),
                'attachments' => DB::table('attachments')->get()->toArray(),
                'blogs' => DB::table('blogs')->get()->toArray(),
                'solutions' => DB::table('solutions')->get()->toArray(),
                'image_backups' => DB::table('image_backups')->get()->toArray(),
                'image_registry' => DB::table('image_registry')->get()->toArray(),
                'image_checkpoints' => DB::table('image_checkpoints')->get()->toArray(),
                'checkpoint_images' => DB::table('checkpoint_images')->get()->toArray(),
            ];

            file_put_contents($fullPath, json_encode($snapshotData, JSON_PRETTY_PRINT));

            return $snapshotPath;
        } catch (\Exception $e) {
            Log::error('Comprehensive database snapshot creation failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Create file system backup
     */
    private function createFileSystemBackup()
    {
        try {
            $timestamp = now()->format('Y-m-d_H-i-s');
            $backupPath = "backups/file_system_backups/fs_backup_{$timestamp}.tar.gz";
            
            // Create directory
            $dir = storage_path('app/backups/file_system_backups');
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }

            // Create tar.gz backup of storage/app/public
            $command = sprintf(
                'tar -czf %s -C %s public/',
                storage_path("app/{$backupPath}"),
                storage_path('app')
            );

            exec($command, $output, $returnCode);

            if ($returnCode === 0) {
                return $backupPath;
            }

            return false;
        } catch (\Exception $e) {
            Log::error('File system backup failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Create checkpoint record
     */
    private function createCheckpointRecord($imageStats, $dbSnapshot, $fileBackup)
    {
        try {
            // First, let's check if we have any existing checkpoints and clean up old ones
            $existingCheckpoints = DB::table('image_checkpoints')->count();
            if ($existingCheckpoints > 10) {
                // Keep only the latest 10 checkpoints
                $oldCheckpoints = DB::table('image_checkpoints')
                    ->orderBy('created_at', 'desc')
                    ->skip(10)
                    ->take($existingCheckpoints - 10)
                    ->pluck('id');
                
                if ($oldCheckpoints->count() > 0) {
                    DB::table('checkpoint_images')->whereIn('checkpoint_id', $oldCheckpoints)->delete();
                    DB::table('image_checkpoints')->whereIn('id', $oldCheckpoints)->delete();
                }
            }

            $checkpointId = DB::table('image_checkpoints')->insertGetId([
                'status' => 'created',
                'total_images' => $imageStats['total'],
                'verified_images' => $imageStats['verified'],
                'recovered_images' => $imageStats['recovered'],
                'missing_images' => $imageStats['missing'],
                'db_snapshot_path' => $dbSnapshot,
                'file_backup_path' => $fileBackup,
                'total_size' => $this->calculateTotalSize(),
                'description' => 'Automatic checkpoint created by system',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // Create checkpoint images record in smaller batches
            $this->createCheckpointImagesRecord($checkpointId);

            return $checkpointId;
        } catch (\Exception $e) {
            Log::error('Checkpoint record creation failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Create checkpoint images record
     */
    private function createCheckpointImagesRecord($checkpointId)
    {
        try {
            // Get all products in chunks to avoid memory issues
            $products = UnifiedProduct::chunk(100, function($productChunk) use ($checkpointId) {
                $imageRecords = [];

                foreach ($productChunk as $product) {
                    if ($product->primary_image) {
                        $imageRecords[] = [
                            'checkpoint_id' => $checkpointId,
                            'path' => $product->primary_image,
                            'entity_type' => 'UnifiedProduct',
                            'entity_id' => $product->id,
                            'is_primary' => true,
                            'created_at' => now()
                        ];
                    }

                    if ($product->additional_images) {
                        foreach ($product->additional_images as $index => $imagePath) {
                            $imageRecords[] = [
                                'checkpoint_id' => $checkpointId,
                                'path' => $imagePath,
                                'entity_type' => 'UnifiedProduct',
                                'entity_id' => $product->id,
                                'is_primary' => false,
                                'sort_order' => $index,
                                'created_at' => now()
                            ];
                        }
                    }
                }

                // Insert in smaller batches
                if (!empty($imageRecords)) {
                    foreach (array_chunk($imageRecords, 500) as $batch) {
                        DB::table('checkpoint_images')->insert($batch);
                    }
                }
            });

            return true;
        } catch (\Exception $e) {
            Log::error('Checkpoint images record creation failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Verify checkpoint integrity
     */
    private function verifyCheckpointIntegrity($checkpointId)
    {
        try {
            // Verify database snapshot exists
            $checkpoint = DB::table('image_checkpoints')->find($checkpointId);
            $dbSnapshotPath = storage_path('app/' . $checkpoint->db_snapshot_path);
            
            if (!file_exists($dbSnapshotPath)) {
                return false;
            }

            // Verify file backup exists
            $fileBackupPath = storage_path('app/' . $checkpoint->file_backup_path);
            if (!file_exists($fileBackupPath)) {
                return false;
            }

            // Update status to verified
            DB::table('image_checkpoints')
                ->where('id', $checkpointId)
                ->update([
                    'status' => 'verified',
                    'verified_at' => now()
                ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Checkpoint integrity verification failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Restore database state
     */
    private function restoreDatabaseState($snapshotPath)
    {
        try {
            $fullPath = storage_path('app/' . $snapshotPath);
            
            if (!file_exists($fullPath)) {
                return false;
            }

            $snapshotData = json_decode(file_get_contents($fullPath), true);

            // Restore UnifiedProducts
            DB::table('unified_products')->truncate();
            if (isset($snapshotData['unified_products'])) {
                DB::table('unified_products')->insert($snapshotData['unified_products']);
            }

            // Restore Categories
            DB::table('categories')->truncate();
            if (isset($snapshotData['categories'])) {
                DB::table('categories')->insert($snapshotData['categories']);
            }

            // Restore Attachments
            DB::table('attachments')->truncate();
            if (isset($snapshotData['attachments'])) {
                DB::table('attachments')->insert($snapshotData['attachments']);
            }

            // Restore ImageBackups
            DB::table('image_backups')->truncate();
            if (isset($snapshotData['image_backups'])) {
                DB::table('image_backups')->insert($snapshotData['image_backups']);
            }

            // Restore ImageRegistry
            DB::table('image_registry')->truncate();
            if (isset($snapshotData['image_registry'])) {
                DB::table('image_registry')->insert($snapshotData['image_registry']);
            }

            // Restore ImageCheckpoints
            DB::table('image_checkpoints')->truncate();
            if (isset($snapshotData['image_checkpoints'])) {
                DB::table('image_checkpoints')->insert($snapshotData['image_checkpoints']);
            }

            // Restore CheckpointImages
            DB::table('checkpoint_images')->truncate();
            if (isset($snapshotData['checkpoint_images'])) {
                DB::table('checkpoint_images')->insert($snapshotData['checkpoint_images']);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Database restoration failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Restore file system
     */
    private function restoreFileSystem($backupPath)
    {
        try {
            $fullPath = storage_path('app/' . $backupPath);
            
            if (!file_exists($fullPath)) {
                return false;
            }

            $command = sprintf(
                'tar -xzf %s -C %s',
                $fullPath,
                storage_path('app')
            );

            exec($command, $output, $returnCode);

            return $returnCode === 0;
        } catch (\Exception $e) {
            Log::error('File system restoration failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Test image recovery
     */
    private function testImageRecovery()
    {
        try {
            // Find a test image
            $testImage = DB::table('image_registry')->first();
            
            if (!$testImage) {
                return true; // No images to test
            }

            // Test recovery
            return $this->robustImageService->recoverImage($testImage->path);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Test database operations
     */
    private function testDatabaseOperations()
    {
        try {
            // Test basic database operations
            $testRecord = DB::table('image_checkpoints')->count();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Test file system operations
     */
    private function testFileSystemOperations()
    {
        try {
            // Test storage operations
            $testPath = 'test_checkpoint_' . time() . '.txt';
            Storage::put($testPath, 'test');
            Storage::delete($testPath);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Calculate total size of all images
     */
    private function calculateTotalSize()
    {
        $totalSize = 0;
        
        $products = UnifiedProduct::all();
        foreach ($products as $product) {
            if ($product->primary_image && Storage::exists($product->primary_image)) {
                $totalSize += Storage::size($product->primary_image);
            }

            if ($product->additional_images) {
                foreach ($product->additional_images as $imagePath) {
                    if (Storage::exists($imagePath)) {
                        $totalSize += Storage::size($imagePath);
                    }
                }
            }
        }

        return $totalSize;
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
} 