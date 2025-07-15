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
        Schema::table('categories', function (Blueprint $table) {
            // Add missing columns if they don't exist
            if (!Schema::hasColumn('categories', 'is_viewable')) {
                $table->boolean('is_viewable')->default(false);
            }
            
            if (!Schema::hasColumn('categories', 'slug')) {
                $table->string('slug')->nullable();
            }
            
            // Ensure product_type_id exists and is properly configured
            if (!Schema::hasColumn('categories', 'product_type_id')) {
                $table->integer('product_type_id')->nullable();
            }
            
            // Make image column nullable since it might not always be required
            $table->text('image')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['is_viewable', 'slug']);
            $table->dropColumn('product_type_id');
            $table->text('image')->nullable(false)->change();
        });
    }
};
