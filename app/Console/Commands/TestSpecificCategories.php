<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use App\Models\Attachment;
use App\Models\Product;
use App\Models\ProductType;
use App\Services\RobustImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TestSpecificCategories extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'test:specific-categories 
                            {--heavy-machinery : Test Heavy Machinery category}
                            {--attachments : Test Attachment/Accessories category}
                            {--all : Test both categories}';

    /**
     * The console command description.
     */
    protected $description = 'Test specific categories that were mentioned as problematic';

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
        $this->info('🔧 Testing Specific Categories...');

        if ($this->option('all') || $this->option('heavy-machinery')) {
            $this->testHeavyMachineryCategory();
        }

        if ($this->option('all') || $this->option('attachments')) {
            $this->testAttachmentCategory();
        }

        if (!$this->option('heavy-machinery') && !$this->option('attachments')) {
            $this->runBothTests();
        }

        $this->info('✅ Specific category tests completed!');
    }

    /**
     * Test Heavy Machinery category
     */
    protected function testHeavyMachineryCategory()
    {
        $this->info('🏗️  Testing Heavy Machinery Category...');

        try {
            // Get or create Heavy Machinery product type
            $productType = ProductType::where('name', 'LIKE', '%heavy%machinery%')
                ->orWhere('name', 'LIKE', '%machinery%')
                ->first();
            
            if (!$productType) {
                $productType = ProductType::create([
                    'name' => 'Heavy Machinery',
                    'slug' => 'heavy-machinery',
                    'description' => 'Industrial heavy machinery and equipment'
                ]);
                $this->info("✅ Created Heavy Machinery product type");
            }

            // Create Heavy Machinery category
            $testImagePath = $this->createTestImage('heavy-machinery-category.jpg');
            
            $category = new Category();
            $category->name = 'Heavy Machinery - Test Category ' . now()->format('H:i:s');
            $category->description = 'Industrial excavators, bulldozers, cranes, and heavy construction equipment';
            $category->product_type_id = $productType->id;
            $category->is_viewable = 1;
            $category->slug = Str::slug($category->name) . '-' . uniqid();
            $category->save();

            // Test robust image upload
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'heavy-machinery-category.jpg',
                'image/jpeg',
                null,
                true
            );

            $result = $this->robustImageService->storeImage(
                $uploadedFile,
                'categories',
                $category->id,
                ['type' => 'category', 'category_name' => $category->name]
            );

            if ($result['success']) {
                $category->image = $result['path'];
                $category->save();
                $this->info("✅ Heavy Machinery category created successfully");
                $this->info("   Image: {$result['path']}");
                $this->info("   Database ID: {$category->id}");
                $this->info("   Slug: {$category->slug}");
            } else {
                $this->error("❌ Failed to store Heavy Machinery category image: {$result['error']}");
                $category->delete();
                return;
            }

            // Verify it appears in listings
            $categories = Category::where('is_viewable', 1)
                ->where('product_type_id', $productType->id)
                ->get();
            
            $found = $categories->where('id', $category->id)->first();
            if ($found) {
                $this->info("✅ Category appears in filtered listings");
            } else {
                $this->error("❌ Category not found in filtered listings");
            }

            // Test frontend API endpoint
            $this->info("🌐 Testing frontend API endpoints...");
            $this->testCategoryEndpoints($category);

        } catch (\Exception $e) {
            $this->error("❌ Heavy Machinery category test failed: " . $e->getMessage());
        }
    }

    /**
     * Test Attachment/Accessories category
     */
    protected function testAttachmentCategory()
    {
        $this->info('🔧 Testing Attachment/Accessories Category...');

        try {
            // Create attachment/accessory item
            $testImagePath = $this->createTestImage('attachment-accessory.jpg');
            
            $attachment = new Attachment();
            $attachment->name = 'Hydraulic Cylinder - Test Accessory ' . now()->format('H:i:s');
            $attachment->description = 'High-pressure hydraulic cylinder for heavy machinery applications';
            $attachment->category_id = 1; // Use first available category
            $attachment->price = 1250.00;
            $attachment->stock = 25;
            $attachment->slug = Str::slug($attachment->name) . '-' . uniqid();
            $attachment->is_viewable = 1;
            $attachment->type = 'business';
            $attachment->save();

            // Test robust image upload
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'attachment-accessory.jpg',
                'image/jpeg',
                null,
                true
            );

            $result = $this->robustImageService->storeImage(
                $uploadedFile,
                'attachments',
                $attachment->id,
                ['type' => 'attachment', 'attachment_name' => $attachment->name]
            );

            if ($result['success']) {
                $attachment->image = $result['path'];
                $attachment->save();
                $this->info("✅ Attachment/Accessory created successfully");
                $this->info("   Image: {$result['path']}");
                $this->info("   Database ID: {$attachment->id}");
                $this->info("   Slug: {$attachment->slug}");
                $this->info("   Price: \${$attachment->price}");
            } else {
                $this->error("❌ Failed to store attachment image: {$result['error']}");
                $attachment->delete();
                return;
            }

            // Verify it appears in listings
            $attachments = Attachment::where('is_viewable', 1)
                ->where('type', 'business')
                ->get();
            
            $found = $attachments->where('id', $attachment->id)->first();
            if ($found) {
                $this->info("✅ Attachment appears in business product listings");
            } else {
                $this->error("❌ Attachment not found in business product listings");
            }

            // Test frontend API endpoint
            $this->info("🌐 Testing attachment API endpoints...");
            $this->testAttachmentEndpoints($attachment);

        } catch (\Exception $e) {
            $this->error("❌ Attachment category test failed: " . $e->getMessage());
        }
    }

    /**
     * Test category API endpoints
     */
    protected function testCategoryEndpoints($category)
    {
        try {
            // Test getting categories
            $categoriesResponse = \App\Http\Controllers\CategoryController::class;
            $controller = app($categoriesResponse);
            
            $request = new \Illuminate\Http\Request();
            $response = $controller->homeCategories();
            
            $data = json_decode($response->getContent(), true);
            if ($data['success'] && count($data['categories']) > 0) {
                $this->info("✅ Categories API endpoint working");
                
                // Check if our test category is in the response
                $foundInAPI = false;
                foreach ($data['categories'] as $cat) {
                    if ($cat['id'] == $category->id) {
                        $foundInAPI = true;
                        break;
                    }
                }
                
                if ($foundInAPI) {
                    $this->info("✅ Test category found in API response");
                } else {
                    $this->warn("⚠️  Test category not found in API response (may be filtered)");
                }
            } else {
                $this->error("❌ Categories API endpoint failed");
            }
        } catch (\Exception $e) {
            $this->error("❌ Category endpoint test failed: " . $e->getMessage());
        }
    }

    /**
     * Test attachment API endpoints
     */
    protected function testAttachmentEndpoints($attachment)
    {
        try {
            // Test getting attachments
            $attachmentResponse = \App\Http\Controllers\AttachmentController::class;
            $controller = app($attachmentResponse);
            
            $request = new \Illuminate\Http\Request();
            $response = $controller->homeAttachments();
            
            $data = json_decode($response->getContent(), true);
            if ($data['success'] && count($data['attachments']) > 0) {
                $this->info("✅ Attachments API endpoint working");
                
                // Check if our test attachment is in the response
                $foundInAPI = false;
                foreach ($data['attachments'] as $att) {
                    if ($att['id'] == $attachment->id) {
                        $foundInAPI = true;
                        break;
                    }
                }
                
                if ($foundInAPI) {
                    $this->info("✅ Test attachment found in API response");
                } else {
                    $this->warn("⚠️  Test attachment not found in API response (may be filtered)");
                }
            } else {
                $this->error("❌ Attachments API endpoint failed");
            }
        } catch (\Exception $e) {
            $this->error("❌ Attachment endpoint test failed: " . $e->getMessage());
        }
    }

    /**
     * Run both tests
     */
    protected function runBothTests()
    {
        $this->testHeavyMachineryCategory();
        $this->line('');
        $this->testAttachmentCategory();
    }

    /**
     * Create a test image file
     */
    protected function createTestImage($filename)
    {
        // Find an existing image to copy
        $existingImages = collect(Storage::files('public/images/products'))
            ->filter(function ($file) {
                return in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png']);
            });

        if ($existingImages->isEmpty()) {
            // Create a simple test image if none exist
            $testImagePath = storage_path('app/test-images/' . $filename);
            
            if (!File::exists(dirname($testImagePath))) {
                File::makeDirectory(dirname($testImagePath), 0755, true);
            }

            // Create a simple 200x200 test image
            $image = imagecreate(200, 200);
            $backgroundColor = imagecolorallocate($image, 100, 150, 200);
            $textColor = imagecolorallocate($image, 255, 255, 255);
            imagestring($image, 4, 50, 90, 'TEST', $textColor);
            imagestring($image, 3, 45, 110, 'CATEGORY', $textColor);
            imagejpeg($image, $testImagePath);
            imagedestroy($image);
            
            return $testImagePath;
        }

        // Copy an existing image
        $sourceImage = storage_path('app/' . $existingImages->first());
        $testImagePath = storage_path('app/test-images/' . $filename);
        
        if (!File::exists(dirname($testImagePath))) {
            File::makeDirectory(dirname($testImagePath), 0755, true);
        }
        
        File::copy($sourceImage, $testImagePath);
        
        return $testImagePath;
    }
}
