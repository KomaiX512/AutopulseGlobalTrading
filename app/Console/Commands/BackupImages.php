<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ImageBackupService;
use App\Models\UnifiedProduct;
use App\Models\ImageBackup;

class BackupImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:backup 
                            {--all : Backup all product images}
                            {--product= : Backup specific product by ID}
                            {--verify : Verify existing backups}
                            {--monitor : Monitor image health and restore if needed}
                            {--cleanup : Clean up old backup files}
                            {--status : Show backup status}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manage image backups for products';

    protected $backupService;

    /**
     * Create a new command instance.
     */
    public function __construct(ImageBackupService $backupService)
    {
        parent::__construct();
        $this->backupService = $backupService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if ($this->option('all')) {
            $this->backupAllImages();
        } elseif ($this->option('product')) {
            $this->backupSpecificProduct();
        } elseif ($this->option('verify')) {
            $this->verifyBackups();
        } elseif ($this->option('monitor')) {
            $this->monitorImageHealth();
        } elseif ($this->option('cleanup')) {
            $this->cleanupOldBackups();
        } elseif ($this->option('status')) {
            $this->showBackupStatus();
        } else {
            $this->showHelp();
        }
    }

    private function backupAllImages()
    {
        $this->info('Starting backup of all product images...');
        
        $result = $this->backupService->createScheduledBackup();
        
        $this->info("Backup completed: {$result['success']}/{$result['total']} products backed up successfully");
        
        if ($result['success'] < $result['total']) {
            $this->warn('Some products failed to backup. Check logs for details.');
        }
    }

    private function backupSpecificProduct()
    {
        $productId = $this->option('product');
        $product = UnifiedProduct::find($productId);
        
        if (!$product) {
            $this->error("Product with ID {$productId} not found.");
            return;
        }
        
        $this->info("Backing up images for product: {$product->name}");
        
        $success = $this->backupService->backupProductImages($product);
        
        if ($success) {
            $this->info('Product images backed up successfully.');
        } else {
            $this->error('Failed to backup product images. Check logs for details.');
        }
    }

    private function verifyBackups()
    {
        $this->info('Verifying image backups...');
        
        $result = $this->backupService->verifyAllBackups();
        
        $this->info("Verification completed: {$result['verified']} verified, {$result['failed']} failed");
        
        if ($result['failed'] > 0) {
            $this->warn("{$result['failed']} backups failed verification. Check logs for details.");
        }
    }

    private function monitorImageHealth()
    {
        $this->info('Monitoring image health...');
        
        $restored = $this->backupService->monitorImageHealth();
        
        if ($restored > 0) {
            $this->info("Successfully restored {$restored} images from backup.");
        } else {
            $this->info('All images are healthy. No restoration needed.');
        }
    }

    private function cleanupOldBackups()
    {
        $this->info('Cleaning up old backup files...');
        
        $success = $this->backupService->cleanupOldBackups(30); // Keep 30 days
        
        if ($success) {
            $this->info('Old backup files cleaned up successfully.');
        } else {
            $this->error('Failed to cleanup old backup files. Check logs for details.');
        }
    }

    private function showBackupStatus()
    {
        $this->info('Image Backup Status:');
        $this->line('');
        
        // Total products
        $totalProducts = UnifiedProduct::count();
        $productsWithImages = UnifiedProduct::whereNotNull('primary_image')->count();
        
        $this->line("Total Products: {$totalProducts}");
        $this->line("Products with Images: {$productsWithImages}");
        $this->line('');
        
        // Backup statistics
        $totalBackups = ImageBackup::count();
        $completedBackups = ImageBackup::where('backup_status', 'completed')->count();
        $pendingBackups = ImageBackup::where('backup_status', 'pending')->count();
        $failedBackups = ImageBackup::where('backup_status', 'failed')->count();
        $partialBackups = ImageBackup::where('backup_status', 'partial')->count();
        
        $this->line("Total Backups: {$totalBackups}");
        $this->line("Completed: {$completedBackups}");
        $this->line("Pending: {$pendingBackups}");
        $this->line("Failed: {$failedBackups}");
        $this->line("Partial: {$partialBackups}");
        $this->line('');
        
        // Recent activity
        $recentBackups = ImageBackup::where('created_at', '>=', now()->subDays(7))->count();
        $recentVerifications = ImageBackup::where('last_verified_at', '>=', now()->subDays(7))->count();
        
        $this->line("Backups in last 7 days: {$recentBackups}");
        $this->line("Verifications in last 7 days: {$recentVerifications}");
        
        if ($failedBackups > 0) {
            $this->warn("⚠️  {$failedBackups} failed backups detected. Run 'php artisan images:backup --verify' for details.");
        }
        
        if ($pendingBackups > 0) {
            $this->info("ℹ️  {$pendingBackups} pending backups. Run 'php artisan images:backup --all' to process them.");
        }
    }

    private function showHelp()
    {
        $this->info('Image Backup Management Commands:');
        $this->line('');
        $this->line('  --all          Backup all product images');
        $this->line('  --product=ID   Backup specific product by ID');
        $this->line('  --verify       Verify existing backups');
        $this->line('  --monitor      Monitor image health and restore if needed');
        $this->line('  --cleanup      Clean up old backup files');
        $this->line('  --status       Show backup status');
        $this->line('');
        $this->line('Examples:');
        $this->line('  php artisan images:backup --all');
        $this->line('  php artisan images:backup --product=123');
        $this->line('  php artisan images:backup --verify');
        $this->line('  php artisan images:backup --monitor');
    }
} 