<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HeroBannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
         |--------------------------------------------------------------------------
         | Dummy hero banner
         |--------------------------------------------------------------------------
         | We use the existing `sliders` table to keep things simple. The image is
         | assumed to live at storage/app/public/images/slides/hero_demo.jpg . If you
         | do not have this file yet, place any image there or change the path.
         | The overlay text is stored in `metadata` as JSON.
         */
        DB::table('sliders')->insert([
            'image'      => 'public/images/slides/hero_demo.jpg',
            'url'        => '#', // hero banner normally not clickable
            'metadata'   => json_encode([
                'title'    => 'Your Trusted Machinery Partner',
                'subtitle' => 'Supplying quality equipment across the globe'
            ]),
            'view_type'  => 'hero_banner',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
} 