<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'image')) {
                $table->string('image')->nullable();
            }
            if (!Schema::hasColumn('products', 'slug')) {
                $table->string('slug')->unique();
            }
            if (!Schema::hasColumn('products', 'discount')) {
                $table->decimal('discount', 8, 2)->default(0);
            }
            if (!Schema::hasColumn('products', 'is_business_product')) {
                $table->boolean('is_business_product')->default(0);
            }
            if (!Schema::hasColumn('products', 'model')) {
                $table->string('model')->nullable();
            }
            if (!Schema::hasColumn('products', 'make')) {
                $table->string('make')->nullable();
            }
            if (!Schema::hasColumn('products', 'weight')) {
                $table->decimal('weight', 10, 2)->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['image', 'slug', 'discount', 'is_business_product', 'model', 'make', 'weight']);
        });
    }
}; 