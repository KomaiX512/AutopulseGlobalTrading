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
        Schema::create('image_registry', function (Blueprint $table) {
            $table->id();
            $table->string('path')->unique();
            $table->string('original_name');
            $table->string('filename');
            $table->string('category');
            $table->unsignedBigInteger('entity_id');
            $table->unsignedBigInteger('size');
            $table->string('mime_type');
            $table->json('metadata')->nullable();
            $table->enum('status', ['active', 'replaced', 'missing', 'deleted'])->default('active');
            $table->enum('backup_status', ['pending', 'completed', 'failed'])->default('pending');
            $table->timestamp('replaced_at')->nullable();
            $table->string('replaced_by')->nullable();
            $table->timestamp('missing_since')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['category', 'entity_id']);
            $table->index('status');
            $table->index('backup_status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_registry');
    }
};
