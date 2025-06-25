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
        Schema::table('attachments', function (Blueprint $table) {
            // Add missing columns after 'id'
            $table->unsignedBigInteger('category_id')->nullable()->after('id');
            $table->unsignedBigInteger('brand_id')->nullable()->after('category_id');
            $table->text('features')->nullable()->after('description');
            $table->decimal('price', 10, 2)->nullable()->after('features');
            $table->decimal('stock', 10, 2)->default(0)->after('price');

            // Add foreign key constraints
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attachments', function (Blueprint $table) {
            // Drop foreign keys first
            $table->dropForeign(['category_id']);
            $table->dropForeign(['brand_id']);

            // Drop columns
            $table->dropColumn(['category_id', 'brand_id', 'features', 'price', 'stock']);
        });
    }
};
