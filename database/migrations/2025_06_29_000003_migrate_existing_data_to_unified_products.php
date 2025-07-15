<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, let's create a backup of existing data
        $this->createDataBackup();
        
        // Migrate existing products to unified_products
        $this->migrateProducts();
        
        // Migrate existing attachments to unified_products
        $this->migrateAttachments();
        
        // Migrate existing spare parts to unified_products (if any data exists)
        $this->migrateSpareParts();
        
        // Verify migration integrity
        $this->verifyMigrationIntegrity();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration is not reversible as it consolidates data
        // You would need to implement a reverse migration if needed
    }

    private function createDataBackup()
    {
        // Create backup tables with timestamp
        $timestamp = now()->format('Y_m_d_H_i_s');
        
        // Backup products table
        if (Schema::hasTable('products')) {
            Schema::create("products_backup_{$timestamp}", function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('category_id')->nullable();
                $table->unsignedBigInteger('brand_id')->nullable();
                $table->string('name');
                $table->text('description')->nullable();
                $table->text('features')->nullable();
                $table->decimal('stock')->default(0);
                $table->decimal('ratings')->nullable();
                $table->decimal('price', 8, 2);
                $table->decimal('stock_price', 8, 2)->nullable();
                $table->timestamps();
                $table->softDeletes();
                $table->string('image')->nullable();
                $table->string('slug')->nullable();
                $table->decimal('discount')->nullable();
                $table->boolean('is_business_product')->default(false);
                $table->string('model')->nullable();
                $table->string('make')->nullable();
                $table->decimal('weight')->nullable();
            });
            
            // Copy data to backup table
            DB::statement("INSERT INTO products_backup_{$timestamp} SELECT * FROM products");
        }

        // Backup attachments table
        if (Schema::hasTable('attachments')) {
            Schema::create("attachments_backup_{$timestamp}", function (Blueprint $table) {
                $table->id();
                $table->text('name')->nullable();
                $table->text('image')->nullable();
                $table->text('description')->nullable();
                $table->text('slug')->nullable();
                $table->text('is_viewable')->nullable();
                $table->text('type')->nullable();
                $table->text('category_id')->nullable();
                $table->text('brand_id')->nullable();
                $table->text('features')->nullable();
                $table->text('price')->nullable();
                $table->text('stock')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
            
            // Copy data to backup table
            DB::statement("INSERT INTO attachments_backup_{$timestamp} SELECT * FROM attachments");
        }

        // Log the backup creation
        DB::table('migrations')->insert([
            'migration' => "data_backup_{$timestamp}",
            'batch' => DB::table('migrations')->max('batch') + 1
        ]);
    }

    private function migrateProducts()
    {
        $products = DB::table('products')->get();
        
        foreach ($products as $product) {
            // Get product images
            $productImages = DB::table('product_images')
                ->where('product_id', $product->id)
                ->orderBy('id')
                ->get();

            $primaryImage = null;
            $additionalImages = [];

            if ($productImages->count() > 0) {
                $primaryImage = $productImages->first()->image_path;
                $additionalImages = $productImages->slice(1)->pluck('image_path')->toArray();
            }

            // Safely determine category_id
            $categoryId = $this->getValidCategoryId($product->category_id);
            
            // Safely determine brand_id
            $brandId = $this->getValidBrandId($product->brand_id);
            
            // Determine product type based on category
            $category = DB::table('categories')->where('id', $categoryId)->first();
            $productTypeId = $this->determineProductTypeId($category);

            try {
                DB::table('unified_products')->insert([
                    'name' => $product->name,
                    'description' => $product->description,
                    'features' => $product->features,
                    'slug' => $this->generateUniqueSlug($product->name),
                    'category_id' => $categoryId,
                    'brand_id' => $brandId,
                    'product_type_id' => $productTypeId,
                    'price' => $product->price,
                    'stock_price' => $product->stock_price,
                    'stock' => $product->stock,
                    'discount' => $product->discount ?? 0,
                    'model' => $product->model ?? null,
                    'make' => $product->make ?? null,
                    'weight' => $product->weight ?? null,
                    'year' => null,
                    'serial_number' => null,
                    'primary_image' => $primaryImage,
                    'primary_image_backup' => null,
                    'additional_images' => $additionalImages ? json_encode($additionalImages) : null,
                    'additional_images_backup' => null,
                    'is_viewable' => true,
                    'is_business_product' => $product->is_business_product ?? false,
                    'status' => 'active',
                    'meta_title' => null,
                    'meta_description' => null,
                    'meta_keywords' => null,
                    'created_at' => $product->created_at,
                    'updated_at' => $product->updated_at,
                    'deleted_at' => $product->deleted_at,
                ]);
            } catch (\Exception $e) {
                // Log the error but continue with other products
                \Log::error("Failed to migrate product {$product->id}: " . $e->getMessage());
                continue;
            }
        }
    }

    private function migrateAttachments()
    {
        $attachments = DB::table('attachments')->get();
        
        foreach ($attachments as $attachment) {
            // Get attachment images
            $attachmentImages = DB::table('attachment_images')
                ->where('attachment_id', $attachment->id)
                ->orderBy('sort_order')
                ->get();

            $primaryImage = null;
            $additionalImages = [];

            if ($attachmentImages->count() > 0) {
                $firstImage = $attachmentImages->first();
                $primaryImage = (isset($firstImage->path) && $firstImage->path) ? $firstImage->path : null;
                $additionalImages = $attachmentImages->slice(1)->filter(function($img) {
                    return isset($img->path) && $img->path;
                })->pluck('path')->toArray();
            } elseif ($attachment->image) {
                $primaryImage = $attachment->image;
            }

            // Safely determine category_id
            $categoryId = $this->getValidCategoryId($attachment->category_id);
            
            // Safely determine brand_id
            $brandId = $this->getValidBrandId($attachment->brand_id);

            // Determine product type (attachments & accessories)
            $productTypeId = 7; // Attachments & Accessories

            try {
                DB::table('unified_products')->insert([
                    'name' => $attachment->name,
                    'description' => $attachment->description,
                    'features' => $attachment->features,
                    'slug' => $attachment->slug,
                    'category_id' => $categoryId,
                    'brand_id' => $brandId,
                    'product_type_id' => $productTypeId,
                    'price' => $attachment->price ?? 0,
                    'stock_price' => null,
                    'stock' => $attachment->stock ?? 0,
                    'discount' => 0,
                    'model' => null,
                    'make' => null,
                    'weight' => null,
                    'year' => null,
                    'serial_number' => null,
                    'primary_image' => $primaryImage,
                    'primary_image_backup' => null,
                    'additional_images' => $additionalImages ? json_encode($additionalImages) : null,
                    'additional_images_backup' => null,
                    'is_viewable' => $attachment->is_viewable,
                    'is_business_product' => $attachment->type === 'business',
                    'status' => 'active',
                    'meta_title' => null,
                    'meta_description' => null,
                    'meta_keywords' => null,
                    'created_at' => $attachment->created_at,
                    'updated_at' => $attachment->updated_at,
                    'deleted_at' => $attachment->deleted_at,
                ]);
            } catch (\Exception $e) {
                // Log the error but continue with other attachments
                \Log::error("Failed to migrate attachment {$attachment->id}: " . $e->getMessage());
                continue;
            }
        }
    }

    private function migrateSpareParts()
    {
        // Check if spare_parts table has any data
        $sparePartsCount = DB::table('spare_parts')->count();
        
        if ($sparePartsCount > 0) {
            $spareParts = DB::table('spare_parts')->get();
            
            foreach ($spareParts as $sparePart) {
                // Since spare_parts table is empty, this is just a placeholder
                // You can implement specific logic if spare parts data exists
                
                try {
                    DB::table('unified_products')->insert([
                        'name' => $sparePart->name ?? 'Spare Part',
                        'description' => $sparePart->description ?? null,
                        'features' => $sparePart->features ?? null,
                        'slug' => $this->generateUniqueSlug($sparePart->name ?? 'spare-part'),
                        'category_id' => $this->getValidCategoryId($sparePart->category_id ?? 1),
                        'brand_id' => $this->getValidBrandId($sparePart->brand_id ?? null),
                        'product_type_id' => 4, // Machine Part
                        'price' => $sparePart->price ?? 0,
                        'stock_price' => null,
                        'stock' => $sparePart->stock ?? 0,
                        'discount' => 0,
                        'model' => $sparePart->model ?? null,
                        'make' => $sparePart->make ?? null,
                        'weight' => $sparePart->weight ?? null,
                        'year' => null,
                        'serial_number' => null,
                        'primary_image' => $sparePart->image ?? null,
                        'primary_image_backup' => null,
                        'additional_images' => null,
                        'additional_images_backup' => null,
                        'is_viewable' => true,
                        'is_business_product' => false,
                        'status' => 'active',
                        'meta_title' => null,
                        'meta_description' => null,
                        'meta_keywords' => null,
                        'created_at' => $sparePart->created_at ?? now(),
                        'updated_at' => $sparePart->updated_at ?? now(),
                        'deleted_at' => $sparePart->deleted_at ?? null,
                    ]);
                } catch (\Exception $e) {
                    // Log the error but continue with other spare parts
                    \Log::error("Failed to migrate spare part {$sparePart->id}: " . $e->getMessage());
                    continue;
                }
            }
        }
    }

    private function getValidCategoryId($categoryId)
    {
        if (!$categoryId) {
            return 1; // Default category
        }

        // Check if category exists
        $category = DB::table('categories')->where('id', $categoryId)->first();
        if ($category) {
            return $categoryId;
        }

        // If category doesn't exist, return default category
        \Log::warning("Category ID {$categoryId} not found, using default category");
        return 1;
    }

    private function getValidBrandId($brandId)
    {
        if (!$brandId) {
            return null; // Allow null brand_id
        }

        // Check if brand exists
        $brand = DB::table('brands')->where('id', $brandId)->first();
        if ($brand) {
            return $brandId;
        }

        // If brand doesn't exist, return null
        \Log::warning("Brand ID {$brandId} not found, setting to null");
        return null;
    }

    private function determineProductTypeId($category)
    {
        if (!$category) {
            return 1; // Default to Machine
        }

        // Map categories to product types based on your existing data
        $categoryName = strtolower($category->name);
        
        if (str_contains($categoryName, 'machine') || str_contains($categoryName, 'excavator') || str_contains($categoryName, 'loader')) {
            return 1; // Machine
        } elseif (str_contains($categoryName, 'bike') || str_contains($categoryName, 'electric')) {
            return 2; // Electric Bikes
        } elseif (str_contains($categoryName, 'vehicle') || str_contains($categoryName, 'car')) {
            return 3; // Vehicles
        } elseif (str_contains($categoryName, 'part') || str_contains($categoryName, 'spare')) {
            return 4; // Machine Part
        } elseif (str_contains($categoryName, 'attachment') || str_contains($categoryName, 'accessory')) {
            return 7; // Attachments & Accessories
        }

        return 1; // Default to Machine
    }

    private function generateUniqueSlug($name)
    {
        $baseSlug = \Illuminate\Support\Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (DB::table('unified_products')->where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    private function verifyMigrationIntegrity()
    {
        // Count records in original tables
        $originalProductsCount = DB::table('products')->count();
        $originalAttachmentsCount = DB::table('attachments')->count();
        $originalSparePartsCount = DB::table('spare_parts')->count();

        // Count records in unified table
        $unifiedProductsCount = DB::table('unified_products')->count();

        // Log migration summary
        \Log::info("Migration completed successfully:");
        \Log::info("- Original products: {$originalProductsCount}");
        \Log::info("- Original attachments: {$originalAttachmentsCount}");
        \Log::info("- Original spare parts: {$originalSparePartsCount}");
        \Log::info("- Total unified products: {$unifiedProductsCount}");

        // Verify no data loss
        $expectedTotal = $originalProductsCount + $originalAttachmentsCount + $originalSparePartsCount;
        if ($unifiedProductsCount < $expectedTotal) {
            \Log::warning("Potential data loss detected. Expected: {$expectedTotal}, Actual: {$unifiedProductsCount}");
        } else {
            \Log::info("No data loss detected. All records migrated successfully.");
        }
    }
}; 