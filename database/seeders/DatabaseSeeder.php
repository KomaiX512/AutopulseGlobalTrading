<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\HeroBannerSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed product types first
        $this->call([
            ProductTypeSeeder::class,
            AttachmentSeeder::class,
            AttachmentCategorySeeder::class,
            HeroBannerSeeder::class,
            ImportSqlSeeder::class,
        ]);
    }
}
