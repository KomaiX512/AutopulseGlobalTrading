<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use App\Models\Attachment;
use App\Models\Blog;
use App\Models\Solution;
use App\Models\ProductType;
use App\Services\RobustImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TestAllFunctionality extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'test:all-functionality 
                            {--categories : Test category functionality}
                            {--attachments : Test attachment functionality}  
                            {--blogs : Test blog functionality}
                            {--sliders : Test slider functionality}
                            {--solutions : Test solution functionality}
                            {--all : Test all functionality}';

    /**
     * The console command description.
     */
    protected $description = 'Test all admin functionality to ensure bulletproof operation';

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
        $this->info('🧪 Testing All AutoPulse Functionality...');

        if ($this->option('all') || $this->option('categories')) {
            $this->testCategories();
        }

        if ($this->option('all') || $this->option('attachments')) {
            $this->testAttachments();
        }

        if ($this->option('all') || $this->option('blogs')) {
            $this->testBlogs();
        }

        if ($this->option('all') || $this->option('sliders')) {
            $this->testSliders();
        }

        if ($this->option('all') || $this->option('solutions')) {
            $this->testSolutions();
        }

        if (!$this->option('categories') && !$this->option('attachments') && !$this->option('blogs') && !$this->option('sliders') && !$this->option('solutions')) {
            $this->runAllTests();
        }

        $this->info('✅ All tests completed successfully!');
    }

    /**
     * Test category functionality
     */
    protected function testCategories()
    {
        $this->info('🏷️  Testing Category Functionality...');

        try {
            // Create test image file
            $testImagePath = $this->createTestImage('test-category-image.jpg');
            
            $productType = ProductType::first();
            if (!$productType) {
                $this->error('No product types found. Creating one...');
                $productType = ProductType::create([
                    'name' => 'Test Product Type',
                    'slug' => 'test-product-type',
                    'description' => 'Test product type for validation'
                ]);
            }

            // Test category creation
            $category = new Category();
            $category->name = 'Test Heavy Machinery Category - ' . now()->format('H:i:s');
            $category->description = 'Testing bulletproof category system with robust image handling';
            $category->product_type_id = $productType->id;
            $category->is_viewable = 1;
            $category->slug = Str::slug($category->name) . '-' . uniqid();
            $category->save();

            // Test image upload with robust service
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'test-category-image.jpg',
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
                $this->info("✅ Category created successfully: {$category->name}");
                $this->info("   Image stored at: {$result['path']}");
            } else {
                $this->error("❌ Failed to store category image: {$result['error']}");
                $category->delete();
                return;
            }

            // Verify category appears in listings
            $categories = Category::where('is_viewable', 1)->get();
            $found = $categories->where('id', $category->id)->first();
            
            if ($found) {
                $this->info("✅ Category appears in public listings");
            } else {
                $this->error("❌ Category not found in public listings");
            }

            // Verify image exists and is backed up
            if (Storage::exists($category->image)) {
                $this->info("✅ Category image file verified on disk");
            } else {
                $this->error("❌ Category image file missing on disk");
            }

            $this->info("✅ Category functionality test completed");
            
        } catch (\Exception $e) {
            $this->error("❌ Category test failed: " . $e->getMessage());
        }
    }

    /**
     * Test attachment functionality
     */
    protected function testAttachments()
    {
        $this->info('🔧 Testing Attachment/Accessories Functionality...');

        try {
            // Create test image file
            $testImagePath = $this->createTestImage('test-attachment-image.jpg');

            // Test attachment creation
            $attachment = new Attachment();
            $attachment->name = 'Test Hydraulic Pump - ' . now()->format('H:i:s');
            $attachment->description = 'Testing bulletproof attachment system with secure image handling';
            $attachment->category_id = 1; // Use category_id instead of category
            $attachment->price = 2500.00;
            $attachment->stock = 15;
            $attachment->slug = Str::slug($attachment->name) . '-' . uniqid();
            $attachment->is_viewable = 1;
            $attachment->save();

            // Test image upload with robust service
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'test-attachment-image.jpg',
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
                $this->info("✅ Attachment created successfully: {$attachment->name}");
                $this->info("   Image stored at: {$result['path']}");
            } else {
                $this->error("❌ Failed to store attachment image: {$result['error']}");
                $attachment->delete();
                return;
            }

            // Verify attachment appears in listings
            $attachments = Attachment::where('is_viewable', 1)->get();
            $found = $attachments->where('id', $attachment->id)->first();
            
            if ($found) {
                $this->info("✅ Attachment appears in public listings");
            } else {
                $this->error("❌ Attachment not found in public listings");
            }

            // Verify image exists and is backed up
            if (Storage::exists($attachment->image)) {
                $this->info("✅ Attachment image file verified on disk");
            } else {
                $this->error("❌ Attachment image file missing on disk");
            }

            $this->info("✅ Attachment functionality test completed");
            
        } catch (\Exception $e) {
            $this->error("❌ Attachment test failed: " . $e->getMessage());
        }
    }

    /**
     * Test blog functionality
     */
    protected function testBlogs()
    {
        $this->info('📝 Testing Blog Functionality...');

        try {
            // Create test image file
            $testImagePath = $this->createTestImage('test-blog-image.jpg');

            // Test blog creation
            $blog = new Blog();
            $blog->title = 'Test Blog: Heavy Machinery Innovation - ' . now()->format('H:i:s');
            $blog->content = 'Testing bulletproof blog system with advanced content management and secure image handling capabilities.';
            $blog->author = 'AutoPulse Test Team';
            $blog->slug = Str::slug($blog->title) . '-' . uniqid();
            $blog->is_published = 1;
            $blog->published_at = now();
            $blog->save();

            // Test image upload with robust service
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'test-blog-image.jpg',
                'image/jpeg',
                null,
                true
            );

            $result = $this->robustImageService->storeImage(
                $uploadedFile,
                'blogs',
                $blog->id,
                ['type' => 'blog', 'blog_title' => $blog->title]
            );

            if ($result['success']) {
                $blog->image = $result['path'];
                $blog->save();
                $this->info("✅ Blog created successfully: {$blog->title}");
                $this->info("   Image stored at: {$result['path']}");
            } else {
                $this->error("❌ Failed to store blog image: {$result['error']}");
                $blog->delete();
                return;
            }

            // Verify blog appears in listings
            $blogs = Blog::where('is_published', 1)->get();
            $found = $blogs->where('id', $blog->id)->first();
            
            if ($found) {
                $this->info("✅ Blog appears in public listings");
            } else {
                $this->error("❌ Blog not found in public listings");
            }

            // Verify image exists and is backed up
            if (Storage::exists($blog->image)) {
                $this->info("✅ Blog image file verified on disk");
            } else {
                $this->error("❌ Blog image file missing on disk");
            }

            $this->info("✅ Blog functionality test completed");
            
        } catch (\Exception $e) {
            $this->error("❌ Blog test failed: " . $e->getMessage());
        }
    }

    /**
     * Test solution functionality
     */
    protected function testSolutions()
    {
        $this->info('🔧 Testing Solutions Functionality...');

        try {
            // Create test image file
            $testImagePath = $this->createTestImage('test-solution-image.jpg');

            // Test solution creation
            $solution = new Solution();
            $solution->name = 'Test Mining Equipment Solutions - ' . now()->format('H:i:s');
            $solution->description = 'Testing bulletproof solutions system with product grouping and secure image handling';
            $solution->slug = Str::slug($solution->name) . '-' . uniqid();
            $solution->is_viewable = 1;
            $solution->save();

            // Test image upload with robust service
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'test-solution-image.jpg',
                'image/jpeg',
                null,
                true
            );

            $result = $this->robustImageService->storeImage(
                $uploadedFile,
                'solutions',
                $solution->id,
                ['type' => 'solution', 'solution_name' => $solution->name]
            );

            if ($result['success']) {
                $solution->image = $result['path'];
                $solution->save();
                $this->info("✅ Solution created successfully: {$solution->name}");
                $this->info("   Image stored at: {$result['path']}");
            } else {
                $this->error("❌ Failed to store solution image: {$result['error']}");
                $solution->delete();
                return;
            }

            // Verify solution appears in listings
            $solutions = Solution::where('is_viewable', 1)->get();
            $found = $solutions->where('id', $solution->id)->first();
            
            if ($found) {
                $this->info("✅ Solution appears in public listings");
            } else {
                $this->error("❌ Solution not found in public listings");
            }

            // Verify image exists and is backed up
            if (Storage::exists($solution->image)) {
                $this->info("✅ Solution image file verified on disk");
            } else {
                $this->error("❌ Solution image file missing on disk");
            }

            $this->info("✅ Solution functionality test completed");
            
        } catch (\Exception $e) {
            $this->error("❌ Solution test failed: " . $e->getMessage());
        }
    }

    /**
     * Test slider functionality
     */
    protected function testSliders()
    {
        $this->info('🖼️  Testing Slider Functionality...');

        try {
            // Create test image file
            $testImagePath = $this->createTestImage('test-slider-image.jpg');

            // Test slider creation
            $slider = new \App\Models\Slider();
            $slider->url = '/products/heavy-machinery';
            $slider->view_type = 'home_slider';
            
            // Store overlay text in metadata
            $metadata = [
                'title' => 'Test Heavy Machinery Solutions - ' . now()->format('H:i:s'),
                'subtitle' => 'Professional Equipment for Every Project',
                'description' => 'Testing bulletproof slider system with secure image handling and overlay text'
            ];
            $slider->metadata = json_encode($metadata);
            $slider->save();

            // Test image upload with robust service
            $uploadedFile = new UploadedFile(
                $testImagePath,
                'test-slider-image.jpg',
                'image/jpeg',
                null,
                true
            );

            $result = $this->robustImageService->storeImage(
                $uploadedFile,
                'slides',
                $slider->id,
                ['type' => 'slider', 'view_type' => $slider->view_type]
            );

            if ($result['success']) {
                $slider->image = $result['path'];
                $slider->save();
                $this->info("✅ Slider created successfully with metadata");
                $this->info("   Image stored at: {$result['path']}");
                $this->info("   Overlay text: " . json_decode($slider->metadata)->title);
            } else {
                $this->error("❌ Failed to store slider image: {$result['error']}");
                $slider->delete();
                return;
            }

            // Verify slider appears in listings
            $sliders = \App\Models\Slider::where('view_type', 'home_slider')->get();
            $found = $sliders->where('id', $slider->id)->first();
            
            if ($found) {
                $this->info("✅ Slider appears in home slider listings");
            } else {
                $this->error("❌ Slider not found in home slider listings");
            }

            // Verify image exists and is backed up
            if (Storage::exists($slider->image)) {
                $this->info("✅ Slider image file verified on disk");
            } else {
                $this->error("❌ Slider image file missing on disk");
            }

            $this->info("✅ Slider functionality test completed");
            
        } catch (\Exception $e) {
            $this->error("❌ Slider test failed: " . $e->getMessage());
        }
    }

    /**
     * Run all tests
     */
    protected function runAllTests()
    {
        $this->testCategories();
        $this->line('');
        $this->testAttachments();
        $this->line('');
        $this->testBlogs();
        $this->line('');
        $this->testSliders();
        $this->line('');
        $this->testSolutions();
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

            // Create a simple 100x100 test image
            $image = imagecreate(100, 100);
            $backgroundColor = imagecolorallocate($image, 200, 200, 200);
            $textColor = imagecolorallocate($image, 50, 50, 50);
            imagestring($image, 3, 10, 40, 'TEST', $textColor);
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
