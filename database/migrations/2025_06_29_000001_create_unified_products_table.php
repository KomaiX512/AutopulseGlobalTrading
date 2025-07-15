<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('unified_products', function (Blueprint $table) {
            $table->id();
            
            // Basic Information
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('features')->nullable();
            $table->string('slug')->unique();
            
            // Product Classification
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
            $table->unsignedBigInteger('product_type_id');
            $table->foreign('product_type_id')->references('id')->on('product_types')->onDelete('cascade');
            
            // Pricing and Inventory
            $table->decimal('price', 12, 2);
            $table->decimal('stock_price', 12, 2)->nullable();
            $table->decimal('stock', 10, 2)->default(0);
            $table->decimal('discount', 5, 2)->default(0);
            
            // Product Specifications
            $table->string('model')->nullable();
            $table->string('make')->nullable();
            $table->decimal('weight', 8, 2)->nullable(); // in tons
            $table->string('year')->nullable();
            $table->string('serial_number')->nullable();
            
            // Image Management with Backup
            $table->string('primary_image')->nullable(); // Main product image
            $table->string('primary_image_backup')->nullable(); // Backup URL (CDN/Cloud)
            $table->json('additional_images')->nullable(); // Array of additional image paths
            $table->json('additional_images_backup')->nullable(); // Backup URLs for additional images
            
            // Status and Visibility
            $table->boolean('is_viewable')->default(true);
            $table->boolean('is_business_product')->default(false);
            $table->enum('status', ['active', 'inactive', 'discontinued'])->default('active');
            
            // SEO and Meta
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for performance
            $table->index(['product_type_id', 'category_id']);
            $table->index(['is_viewable', 'status']);
            $table->index(['price', 'stock']);
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unified_products');
    }
}; 