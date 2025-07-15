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
        Schema::create('image_checkpoints', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['created', 'verified', 'failed', 'restored'])->default('created');
            $table->integer('total_images')->default(0);
            $table->integer('verified_images')->default(0);
            $table->integer('recovered_images')->default(0);
            $table->integer('missing_images')->default(0);
            $table->string('db_snapshot_path')->nullable();
            $table->string('file_backup_path')->nullable();
            $table->bigInteger('total_size')->default(0);
            $table->text('description')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('restored_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index('created_at');
        });

        Schema::create('checkpoint_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('checkpoint_id');
            $table->string('path');
            $table->string('entity_type');
            $table->unsignedBigInteger('entity_id');
            $table->boolean('is_primary')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            // Foreign key
            $table->foreign('checkpoint_id')->references('id')->on('image_checkpoints')->onDelete('cascade');
            
            // Indexes
            $table->index(['checkpoint_id', 'entity_type', 'entity_id']);
            $table->index('path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkpoint_images');
        Schema::dropIfExists('image_checkpoints');
    }
}; 