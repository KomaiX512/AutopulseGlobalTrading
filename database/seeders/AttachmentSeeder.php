<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Attachment;

class AttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attachments = [
            [
                'name' => 'Hydraulic Hammers',
                'image' => 'attachments/hydraulic-hammer.jpg',
                'description' => 'Heavy-duty hydraulic hammers for breaking concrete and demolition work',
                'slug' => 'hydraulic-hammers',
                'is_viewable' => true,
                'type' => 'customer'
            ],
            [
                'name' => 'Quick Couplers',
                'image' => 'attachments/quick-coupler.jpg',
                'description' => 'Fast attachment changing system for excavators and machinery',
                'slug' => 'quick-couplers',
                'is_viewable' => true,
                'type' => 'customer'
            ],
            [
                'name' => 'Excavator Buckets',
                'image' => 'attachments/bucket.jpg',
                'description' => 'Various sizes and types of excavator buckets for different applications',
                'slug' => 'excavator-buckets',
                'is_viewable' => true,
                'type' => 'customer'
            ],
            [
                'name' => 'Ripper Attachments',
                'image' => 'attachments/ripper.jpg',
                'description' => 'Heavy-duty rippers for soil breaking and land preparation',
                'slug' => 'ripper-attachments',
                'is_viewable' => true,
                'type' => 'customer'
            ],
            [
                'name' => 'Auger Attachments',
                'image' => 'attachments/auger.jpg',
                'description' => 'Drilling attachments for post holes and foundation work',
                'slug' => 'auger-attachments',
                'is_viewable' => true,
                'type' => 'customer'
            ]
        ];

        foreach ($attachments as $attachment) {
            Attachment::create($attachment);
        }
    }
}
