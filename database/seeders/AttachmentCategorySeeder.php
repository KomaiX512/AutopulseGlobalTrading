<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Attachment;

class AttachmentCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create attachment categories
        $categories = [
            [
                'name' => 'Hydraulic Attachments',
                'image' => 'public/images/categories/hydraulic-attachments.jpg',
                'description' => 'Heavy-duty hydraulic attachments for construction machinery',
                'slug' => 'hydraulic-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ],
            [
                'name' => 'Bucket Attachments',
                'image' => 'public/images/categories/bucket-attachments.jpg',
                'description' => 'Various sizes and types of excavator buckets',
                'slug' => 'bucket-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ],
            [
                'name' => 'Drilling Attachments',
                'image' => 'public/images/categories/drilling-attachments.jpg',
                'description' => 'Specialized drilling and boring attachments',
                'slug' => 'drilling-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ],
            [
                'name' => 'Coupling Systems',
                'image' => 'public/images/categories/coupling-systems.jpg',
                'description' => 'Quick coupling and attachment changing systems',
                'slug' => 'coupling-systems',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ],
            [
                'name' => 'Demolition Attachments',
                'image' => 'public/images/categories/demolition-attachments.jpg',
                'description' => 'Heavy-duty demolition and breaking attachments',
                'slug' => 'demolition-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);
        }

        // Update existing attachments to have categories and prices
        $attachmentUpdates = [
            'Hydraulic Hammers' => [
                'category_name' => 'Demolition Attachments',
                'price' => 15000.00,
                'stock' => 5
            ],
            'Quick Couplers' => [
                'category_name' => 'Coupling Systems', 
                'price' => 3500.00,
                'stock' => 10
            ],
            'Excavator Buckets' => [
                'category_name' => 'Bucket Attachments',
                'price' => 2500.00,
                'stock' => 15
            ],
            'Ripper Attachments' => [
                'category_name' => 'Demolition Attachments',
                'price' => 8000.00,
                'stock' => 8
            ],
            'Auger Attachments' => [
                'category_name' => 'Drilling Attachments',
                'price' => 4500.00,
                'stock' => 12
            ]
        ];

        foreach ($attachmentUpdates as $attachmentName => $data) {
            $attachment = Attachment::where('name', $attachmentName)->first();
            $category = Category::where('name', $data['category_name'])->first();
            
            if ($attachment && $category) {
                $attachment->update([
                    'category_id' => $category->id,
                    'price' => $data['price'],
                    'stock' => $data['stock']
                ]);
            }
        }
    }
}
