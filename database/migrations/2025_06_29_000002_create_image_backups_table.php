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
        Schema::create('image_backups', function (Blueprint $table) {
            $table->id();
            
            // Original Image Information
            $table->string('original_path'); // Original storage path
            $table->string('filename');
            $table->string('mime_type');
            $table->bigInteger('file_size'); // in bytes
            
            // Backup Locations (Multiple redundancy)
            $table->string('backup_path_1')->nullable(); // Local backup
            $table->string('backup_path_2')->nullable(); // Cloud backup (AWS S3, etc.)
            $table->string('backup_path_3')->nullable(); // CDN backup
            $table->string('backup_path_4')->nullable(); // Secondary cloud backup
            
            // Backup Status
            $table->enum('backup_status', ['pending', 'completed', 'failed', 'partial'])->default('pending');
            $table->timestamp('last_backup_at')->nullable();
            $table->timestamp('last_verified_at')->nullable();
            
            // Image Metadata
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->string('checksum')->nullable(); // For integrity verification
            
            // Related Entity
            $table->morphs('imageable'); // Polymorphic relationship - creates imageable_type, imageable_id and index
            $table->string('image_type')->default('product'); // product, attachment, brand, etc.
            
            // Priority and Order
            $table->boolean('is_primary')->default(false);
            $table->integer('sort_order')->default(0);
            
            // Timestamps
            $table->timestamps();
            
            // Additional Indexes (excluding the one created by morphs)
            $table->index('backup_status');
            $table->index('image_type');
            $table->index('checksum');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_backups');
    }
}; 