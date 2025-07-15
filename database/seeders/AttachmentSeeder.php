<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Attachment;
use App\Models\Category;
use App\Models\Brand;

class AttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create categories for attachments
        $hydraulicCategory = Category::firstOrCreate(
            ['name' => 'Hydraulic Attachments'],
            [
                'image' => 'public/images/categories/hydraulic-attachments.jpg',
                'description' => 'Heavy-duty hydraulic attachments for construction machinery',
                'slug' => 'hydraulic-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        );

        $bucketCategory = Category::firstOrCreate(
            ['name' => 'Bucket Attachments'],
            [
                'image' => 'public/images/categories/bucket-attachments.jpg',
                'description' => 'Various sizes and types of excavator buckets',
                'slug' => 'bucket-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        );

        $drillingCategory = Category::firstOrCreate(
            ['name' => 'Drilling Attachments'],
            [
                'image' => 'public/images/categories/drilling-attachments.jpg',
                'description' => 'Specialized drilling and boring attachments',
                'slug' => 'drilling-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        );

        $couplingCategory = Category::firstOrCreate(
            ['name' => 'Coupling Systems'],
            [
                'image' => 'public/images/categories/coupling-systems.jpg',
                'description' => 'Quick coupling and attachment changing systems',
                'slug' => 'coupling-systems',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        );

        $demolitionCategory = Category::firstOrCreate(
            ['name' => 'Demolition Attachments'],
            [
                'image' => 'public/images/categories/demolition-attachments.jpg',
                'description' => 'Heavy-duty demolition and breaking attachments',
                'slug' => 'demolition-attachments',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        );

        $accessoriesCategory = Category::firstOrCreate(
            ['name' => 'Machine Accessories'],
            [
                'image' => 'public/images/categories/machine-accessories.jpg',
                'description' => 'Essential accessories and spare parts for machinery',
                'slug' => 'machine-accessories',
                'is_viewable' => true,
                'type' => 'customer',
                'product_type_id' => 1
            ]
        );

        // Get brands
        $catBrand = Brand::where('name', 'CAT')->first();
        $komatsuBrand = Brand::where('name', 'KOMATSU')->first();
        $hitachiBrand = Brand::where('name', 'HITACHI')->first();
        $jcbBrand = Brand::where('name', 'JCB')->first();
        $kobelcoBrand = Brand::where('name', 'KOBELCO')->first();

        $attachments = [
            // Hydraulic Attachments
            [
                'name' => 'Hydraulic Hammer - CAT HB580',
                'image' => 'public/images/attachments/hydraulic-hammer-cat.jpg',
                'description' => 'Professional grade hydraulic hammer for heavy demolition work. Features advanced hydraulic system for maximum efficiency and reduced noise levels.',
                'features' => '<ul><li>Operating weight: 580kg</li><li>Impact energy: 580-680 J</li><li>Blow frequency: 400-600 bpm</li><li>Oil flow: 40-80 L/min</li><li>Working pressure: 160-180 bar</li></ul>',
                'slug' => 'hydraulic-hammer-cat-hb580',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $hydraulicCategory->id,
                'brand_id' => $catBrand ? $catBrand->id : null,
                'price' => 18500.00,
                'stock' => 8
            ],
            [
                'name' => 'Hydraulic Breaker - Komatsu HB2050',
                'image' => 'public/images/attachments/hydraulic-breaker-komatsu.jpg',
                'description' => 'High-performance hydraulic breaker designed for medium to heavy demolition applications. Excellent for concrete breaking and rock excavation.',
                'features' => '<ul><li>Operating weight: 2050kg</li><li>Impact energy: 2050-2400 J</li><li>Blow frequency: 300-450 bpm</li><li>Oil flow: 80-120 L/min</li><li>Working pressure: 160-180 bar</li></ul>',
                'slug' => 'hydraulic-breaker-komatsu-hb2050',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $hydraulicCategory->id,
                'brand_id' => $komatsuBrand ? $komatsuBrand->id : null,
                'price' => 22500.00,
                'stock' => 5
            ],

            // Bucket Attachments
            [
                'name' => 'Excavator Bucket - Heavy Duty 1.2m³',
                'image' => 'public/images/attachments/excavator-bucket-heavy.jpg',
                'description' => 'Heavy-duty excavator bucket with reinforced construction for demanding applications. Perfect for digging in hard soil and rocky terrain.',
                'features' => '<ul><li>Capacity: 1.2m³</li><li>Width: 1200mm</li><li>Material: Hardox 450</li><li>Weight: 850kg</li><li>Teeth: 5 pieces included</li></ul>',
                'slug' => 'excavator-bucket-heavy-duty-1-2m3',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $bucketCategory->id,
                'brand_id' => $hitachiBrand ? $hitachiBrand->id : null,
                'price' => 3200.00,
                'stock' => 12
            ],
            [
                'name' => 'Rock Bucket - JCB 0.8m³',
                'image' => 'public/images/attachments/rock-bucket-jcb.jpg',
                'description' => 'Specialized rock bucket designed for handling large rocks and boulders. Features reinforced side plates and wear protection.',
                'features' => '<ul><li>Capacity: 0.8m³</li><li>Width: 1000mm</li><li>Material: Hardox 500</li><li>Weight: 650kg</li><li>Rock handling capability</li></ul>',
                'slug' => 'rock-bucket-jcb-0-8m3',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $bucketCategory->id,
                'brand_id' => $jcbBrand ? $jcbBrand->id : null,
                'price' => 2800.00,
                'stock' => 15
            ],

            // Drilling Attachments
            [
                'name' => 'Auger Attachment - 600mm Diameter',
                'image' => 'public/images/attachments/auger-attachment-600mm.jpg',
                'description' => 'High-quality auger attachment for drilling post holes and foundation work. Suitable for various soil conditions.',
                'features' => '<ul><li>Diameter: 600mm</li><li>Length: 3000mm</li><li>Material: High-strength steel</li><li>Helix pitch: 400mm</li><li>Maximum depth: 3m</li></ul>',
                'slug' => 'auger-attachment-600mm-diameter',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $drillingCategory->id,
                'brand_id' => $kobelcoBrand ? $kobelcoBrand->id : null,
                'price' => 4500.00,
                'stock' => 10
            ],
            [
                'name' => 'Core Drill Attachment - 200mm',
                'image' => 'public/images/attachments/core-drill-attachment.jpg',
                'description' => 'Precision core drilling attachment for concrete and rock drilling applications. Ideal for utility installations.',
                'features' => '<ul><li>Diameter: 200mm</li><li>Maximum depth: 1000mm</li><li>Diamond-tipped cutting edge</li><li>Water cooling system</li><li>High precision drilling</li></ul>',
                'slug' => 'core-drill-attachment-200mm',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $drillingCategory->id,
                'brand_id' => $catBrand ? $catBrand->id : null,
                'price' => 6800.00,
                'stock' => 6
            ],

            // Coupling Systems
            [
                'name' => 'Quick Coupler - Universal Type',
                'image' => 'public/images/attachments/quick-coupler-universal.jpg',
                'description' => 'Universal quick coupler system for fast attachment changing. Compatible with most excavator brands and models.',
                'features' => '<ul><li>Universal compatibility</li><li>Pin diameter: 80mm</li><li>Maximum weight: 3000kg</li><li>Safety lock system</li><li>Easy operation</li></ul>',
                'slug' => 'quick-coupler-universal-type',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $couplingCategory->id,
                'brand_id' => $komatsuBrand ? $komatsuBrand->id : null,
                'price' => 3500.00,
                'stock' => 20
            ],
            [
                'name' => 'Hydraulic Quick Coupler - CAT',
                'image' => 'public/images/attachments/hydraulic-quick-coupler-cat.jpg',
                'description' => 'Hydraulic quick coupler with advanced safety features and automatic locking system. Designed for CAT excavators.',
                'features' => '<ul><li>Hydraulic operation</li><li>Automatic safety lock</li><li>Pin diameter: 100mm</li><li>Maximum weight: 5000kg</li><li>CAT compatibility</li></ul>',
                'slug' => 'hydraulic-quick-coupler-cat',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $couplingCategory->id,
                'brand_id' => $catBrand ? $catBrand->id : null,
                'price' => 5200.00,
                'stock' => 8
            ],

            // Demolition Attachments
            [
                'name' => 'Demolition Shear - Heavy Duty',
                'image' => 'public/images/attachments/demolition-shear-heavy.jpg',
                'description' => 'Heavy-duty demolition shear for cutting steel structures, concrete, and other construction materials.',
                'features' => '<ul><li>Cutting force: 350 tons</li><li>Maximum steel thickness: 50mm</li><li>Jaw opening: 800mm</li><li>Weight: 2800kg</li><li>360° rotation</li></ul>',
                'slug' => 'demolition-shear-heavy-duty',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $demolitionCategory->id,
                'brand_id' => $hitachiBrand ? $hitachiBrand->id : null,
                'price' => 18500.00,
                'stock' => 4
            ],
            [
                'name' => 'Concrete Pulverizer - JCB',
                'image' => 'public/images/attachments/concrete-pulverizer-jcb.jpg',
                'description' => 'High-performance concrete pulverizer for crushing and processing concrete structures during demolition.',
                'features' => '<ul><li>Crushing force: 250 tons</li><li>Jaw opening: 600mm</li><li>Weight: 1800kg</li><li>Material: Hardox 450</li><li>Easy maintenance</li></ul>',
                'slug' => 'concrete-pulverizer-jcb',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $demolitionCategory->id,
                'brand_id' => $jcbBrand ? $jcbBrand->id : null,
                'price' => 12500.00,
                'stock' => 7
            ],

            // Machine Accessories
            [
                'name' => 'LED Work Light Kit - Universal',
                'image' => 'public/images/attachments/led-work-light-kit.jpg',
                'description' => 'High-brightness LED work light kit for improved visibility during night operations and low-light conditions.',
                'features' => '<ul><li>Brightness: 10,000 lumens</li><li>Power: 100W</li><li>Voltage: 12V/24V</li><li>Waterproof rating: IP67</li><li>Universal mounting</li></ul>',
                'slug' => 'led-work-light-kit-universal',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $accessoriesCategory->id,
                'brand_id' => null,
                'price' => 450.00,
                'stock' => 50
            ],
            [
                'name' => 'Hydraulic Filter Kit - Premium',
                'image' => 'public/images/attachments/hydraulic-filter-kit.jpg',
                'description' => 'Complete hydraulic filter kit for maintaining optimal hydraulic system performance and extending component life.',
                'features' => '<ul><li>Includes main filter, return filter</li><li>Filter efficiency: 10 microns</li><li>Compatible with most brands</li><li>High-quality materials</li><li>Easy installation</li></ul>',
                'slug' => 'hydraulic-filter-kit-premium',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $accessoriesCategory->id,
                'brand_id' => null,
                'price' => 280.00,
                'stock' => 100
            ],
            [
                'name' => 'Track Tensioner Tool - Professional',
                'image' => 'public/images/attachments/track-tensioner-tool.jpg',
                'description' => 'Professional track tensioner tool for proper track maintenance and adjustment on excavators and track loaders.',
                'features' => '<ul><li>Heavy-duty construction</li><li>Universal compatibility</li><li>Easy operation</li><li>Durable materials</li><li>Safety features</li></ul>',
                'slug' => 'track-tensioner-tool-professional',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $accessoriesCategory->id,
                'brand_id' => null,
                'price' => 350.00,
                'stock' => 25
            ],
            [
                'name' => 'Grease Gun Kit - Heavy Duty',
                'image' => 'public/images/attachments/grease-gun-kit.jpg',
                'description' => 'Heavy-duty grease gun kit for proper lubrication of machinery components and extending service life.',
                'features' => '<ul><li>Pressure: 10,000 PSI</li><li>Capacity: 18oz</li><li>Includes extension hoses</li><li>Professional grade</li><li>Easy maintenance</li></ul>',
                'slug' => 'grease-gun-kit-heavy-duty',
                'is_viewable' => true,
                'type' => 'customer',
                'category_id' => $accessoriesCategory->id,
                'brand_id' => null,
                'price' => 180.00,
                'stock' => 75
            ]
        ];

        foreach ($attachments as $attachment) {
            Attachment::firstOrCreate(
                ['slug' => $attachment['slug']],
                $attachment
            );
        }
    }
}
