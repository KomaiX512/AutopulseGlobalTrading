<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Solution;
use App\Models\Attachment;
use App\Models\Blog;
use App\Models\UnifiedProduct;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PopulateMissingData extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'data:populate 
                            {--solutions : Populate solutions data}
                            {--attachments : Populate attachments data}
                            {--blogs : Populate additional blogs}
                            {--all : Populate all missing data}';

    /**
     * The console command description.
     */
    protected $description = 'Populate missing data for solutions, attachments, and other content';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting data population...');

        if ($this->option('all') || $this->option('solutions')) {
            $this->populateSolutions();
        }

        if ($this->option('all') || $this->option('attachments')) {
            $this->populateAttachments();
        }

        if ($this->option('all') || $this->option('blogs')) {
            $this->populateBlogs();
        }

        $this->info('Data population completed!');
    }

    /**
     * Populate solutions data
     */
    protected function populateSolutions()
    {
        $this->info('Populating solutions...');

        $solutions = [
            [
                'name' => 'Heavy Machinery Solutions',
                'slug' => 'heavy-machinery',
                'description' => 'Comprehensive heavy machinery solutions for construction, mining, and industrial applications. Our range includes excavators, bulldozers, loaders, and specialized equipment.',
                'image' => 'public/images/solutions/heavy-machinery.jpg',
                'is_viewable' => true,
                'category_keywords' => ['EXCAVATORS', 'BULDOZERS', 'WHEEL LOADER', 'SKID STEERS']
            ],
            [
                'name' => 'Electric Vehicle Solutions',
                'slug' => 'electric-vehicles',
                'description' => 'Cutting-edge electric vehicle solutions including cars, motorcycles, and e-bikes. Featuring latest technology and sustainable transportation options.',
                'image' => 'public/images/solutions/electric-vehicles.jpg',
                'is_viewable' => true,
                'category_keywords' => ['SEDAN', 'SUV', 'COUPE', 'HATCHBACK', 'VAN']
            ],
            [
                'name' => 'Construction Equipment',
                'slug' => 'construction-equipment',
                'description' => 'Professional construction equipment for all project sizes. From compact machines to large-scale construction vehicles.',
                'image' => 'public/images/solutions/construction.jpg',
                'is_viewable' => true,
                'category_keywords' => ['CRANE', 'BACKHOE', 'FORKLIFT', 'GRADER']
            ],
            [
                'name' => 'Transportation Solutions',
                'slug' => 'transportation',
                'description' => 'Complete transportation solutions including trucks, trailers, and logistics vehicles for efficient material movement.',
                'image' => 'public/images/solutions/transportation.jpg',
                'is_viewable' => true,
                'category_keywords' => ['TRUCKS', 'PICK UP']
            ],
            [
                'name' => 'Material Handling Equipment',
                'slug' => 'material-handling',
                'description' => 'Specialized material handling equipment including forklifts, loaders, and automated handling systems.',
                'image' => 'public/images/solutions/material-handling.jpg',
                'is_viewable' => true,
                'category_keywords' => ['FORKLIFT', 'WHEEL LOADER']
            ]
        ];

        foreach ($solutions as $solutionData) {
            $categoryKeywords = $solutionData['category_keywords'];
            unset($solutionData['category_keywords']);

            $solution = Solution::updateOrCreate(
                ['slug' => $solutionData['slug']],
                $solutionData
            );

            // Attach products based on categories
            $categories = Category::whereIn('name', $categoryKeywords)->get();
            $productIds = UnifiedProduct::whereIn('category_id', $categories->pluck('id'))
                ->where('is_viewable', true)
                ->limit(20)
                ->pluck('id');

            if ($productIds->count() > 0) {
                $solution->products()->sync($productIds);
                $this->info("Solution '{$solution->name}' created with {$productIds->count()} products");
            }
        }

        $this->info('Solutions populated successfully!');
    }

    /**
     * Populate attachments data
     */
    protected function populateAttachments()
    {
        $this->info('Populating attachments...');

        $attachments = [
            [
                'name' => 'Hydraulic Pump Assembly',
                'description' => 'High-performance hydraulic pump for heavy machinery. Compatible with excavators and loaders.',
                'image' => 'public/images/attachments/hydraulic-pump.jpg',
                'category' => 'Hydraulic Parts',
                'price' => 2500.00,
                'stock' => 15
            ],
            [
                'name' => 'Excavator Bucket - 1.2m3',
                'description' => 'Heavy-duty excavator bucket suitable for general excavation work. Reinforced steel construction.',
                'image' => 'public/images/attachments/excavator-bucket.jpg',
                'category' => 'Buckets & Attachments',
                'price' => 3200.00,
                'stock' => 8
            ],
            [
                'name' => 'Track Chain Assembly',
                'description' => 'Durable track chain for tracked excavators and bulldozers. Premium quality materials.',
                'image' => 'public/images/attachments/track-chain.jpg',
                'category' => 'Undercarriage Parts',
                'price' => 4500.00,
                'stock' => 12
            ],
            [
                'name' => 'Engine Air Filter',
                'description' => 'High-efficiency air filter for diesel engines. Fits multiple heavy machinery models.',
                'image' => 'public/images/attachments/air-filter.jpg',
                'category' => 'Engine Parts',
                'price' => 85.00,
                'stock' => 50
            ],
            [
                'name' => 'Hydraulic Cylinder',
                'description' => 'Heavy-duty hydraulic cylinder for boom and arm operations. Various sizes available.',
                'image' => 'public/images/attachments/hydraulic-cylinder.jpg',
                'category' => 'Hydraulic Parts',
                'price' => 1800.00,
                'stock' => 20
            ],
            [
                'name' => 'Cab Glass Set',
                'description' => 'Complete cab glass set including front, side, and rear windows. Safety glass construction.',
                'image' => 'public/images/attachments/cab-glass.jpg',
                'category' => 'Cab Parts',
                'price' => 650.00,
                'stock' => 25
            ],
            [
                'name' => 'Final Drive Motor',
                'description' => 'Final drive motor for tracked machines. High torque output and reliability.',
                'image' => 'public/images/attachments/final-drive.jpg',
                'category' => 'Drive System',
                'price' => 5500.00,
                'stock' => 6
            ],
            [
                'name' => 'Alternator Assembly',
                'description' => 'Heavy-duty alternator for charging systems. 24V output for commercial vehicles.',
                'image' => 'public/images/attachments/alternator.jpg',
                'category' => 'Electrical Parts',
                'price' => 420.00,
                'stock' => 30
            ],
            [
                'name' => 'Radiator Core',
                'description' => 'High-efficiency radiator core for engine cooling. Aluminum construction.',
                'image' => 'public/images/attachments/radiator.jpg',
                'category' => 'Cooling System',
                'price' => 890.00,
                'stock' => 18
            ],
            [
                'name' => 'Seat Assembly - Operator',
                'description' => 'Ergonomic operator seat with suspension and adjustable features. Comfort and safety.',
                'image' => 'public/images/attachments/operator-seat.jpg',
                'category' => 'Cab Parts',
                'price' => 1200.00,
                'stock' => 14
            ],
            [
                'name' => 'Hydraulic Filter Set',
                'description' => 'Complete hydraulic filter set including return, suction, and pilot filters.',
                'image' => 'public/images/attachments/hydraulic-filters.jpg',
                'category' => 'Hydraulic Parts',
                'price' => 180.00,
                'stock' => 40
            ],
            [
                'name' => 'Rubber Track Pad',
                'description' => 'Replacement rubber track pads for reduced ground pressure and improved traction.',
                'image' => 'public/images/attachments/rubber-track.jpg',
                'category' => 'Undercarriage Parts',
                'price' => 320.00,
                'stock' => 35
            ],
            [
                'name' => 'Control Valve Block',
                'description' => 'Main control valve for hydraulic system operations. Precision-engineered.',
                'image' => 'public/images/attachments/control-valve.jpg',
                'category' => 'Hydraulic Parts',
                'price' => 3800.00,
                'stock' => 10
            ],
            [
                'name' => 'LED Work Light Kit',
                'description' => 'High-intensity LED work lights for improved visibility during operations.',
                'image' => 'public/images/attachments/led-lights.jpg',
                'category' => 'Electrical Parts',
                'price' => 290.00,
                'stock' => 45
            ],
            [
                'name' => 'Fuel Tank Assembly',
                'description' => 'Heavy-duty fuel tank with mounting hardware. Various capacities available.',
                'image' => 'public/images/attachments/fuel-tank.jpg',
                'category' => 'Fuel System',
                'price' => 1450.00,
                'stock' => 12
            ],
            [
                'name' => 'Transmission Filter',
                'description' => 'High-quality transmission filter for smooth operation and extended life.',
                'image' => 'public/images/attachments/transmission-filter.jpg',
                'category' => 'Drive System',
                'price' => 125.00,
                'stock' => 55
            ],
            [
                'name' => 'Boom Cylinder Pin Set',
                'description' => 'Precision-machined pin set for boom cylinder connections. Hardened steel.',
                'image' => 'public/images/attachments/cylinder-pins.jpg',
                'category' => 'Hydraulic Parts',
                'price' => 220.00,
                'stock' => 28
            ],
            [
                'name' => 'Engine Control Module',
                'description' => 'Advanced engine control module for optimal performance and emissions control.',
                'image' => 'public/images/attachments/engine-control.jpg',
                'category' => 'Engine Parts',
                'price' => 2200.00,
                'stock' => 8
            ]
        ];

        foreach ($attachments as $attachmentData) {
            $attachment = Attachment::create([
                'name' => $attachmentData['name'],
                'description' => $attachmentData['description'],
                'image' => $attachmentData['image'],
                'category' => $attachmentData['category'],
                'price' => $attachmentData['price'],
                'stock' => $attachmentData['stock'],
                'slug' => Str::slug($attachmentData['name']),
                'is_viewable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        $this->info('Attachments populated successfully!');
    }

    /**
     * Populate additional blogs
     */
    protected function populateBlogs()
    {
        $this->info('Populating blogs...');

        $blogs = [
            [
                'title' => 'The Future of Heavy Machinery: Electric and Autonomous Equipment',
                'content' => 'The construction and heavy machinery industry is experiencing a revolutionary transformation with the introduction of electric and autonomous equipment. As environmental concerns grow and technology advances, manufacturers are developing innovative solutions that promise to reshape the industry landscape.',
                'image' => 'public/images/blogs/future-machinery.jpg',
                'author' => 'AutoPulse Team',
                'is_published' => true
            ],
            [
                'title' => 'Maintenance Best Practices for Heavy Equipment',
                'content' => 'Proper maintenance is crucial for maximizing the lifespan and performance of heavy equipment. Regular inspections, scheduled servicing, and proper operating procedures can significantly reduce downtime and operating costs.',
                'image' => 'public/images/blogs/maintenance-practices.jpg',
                'author' => 'AutoPulse Team',
                'is_published' => true
            ],
            [
                'title' => 'Understanding Hydraulic Systems in Construction Equipment',
                'content' => 'Hydraulic systems are the heart of most construction equipment, providing the power and precision needed for heavy-duty operations. Understanding how these systems work can help operators and technicians maintain optimal performance.',
                'image' => 'public/images/blogs/hydraulic-systems.jpg',
                'author' => 'AutoPulse Team',
                'is_published' => true
            ],
            [
                'title' => 'Safety Protocols for Heavy Machinery Operations',
                'content' => 'Operating heavy machinery requires strict adherence to safety protocols to protect operators, workers, and the public. Comprehensive training and proper safety procedures are essential for accident prevention.',
                'image' => 'public/images/blogs/safety-protocols.jpg',
                'author' => 'AutoPulse Team',
                'is_published' => true
            ],
            [
                'title' => 'Cost-Effective Solutions for Small Construction Projects',
                'content' => 'Small construction projects require careful consideration of equipment choices to maintain profitability. Compact and versatile machines can provide excellent value for smaller-scale operations.',
                'image' => 'public/images/blogs/small-projects.jpg',
                'author' => 'AutoPulse Team',
                'is_published' => true
            ]
        ];

        foreach ($blogs as $blogData) {
            $blog = Blog::create([
                'title' => $blogData['title'],
                'content' => $blogData['content'],
                'image' => $blogData['image'],
                'author' => $blogData['author'],
                'slug' => Str::slug($blogData['title']),
                'is_published' => $blogData['is_published'],
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        $this->info('Blogs populated successfully!');
    }
}
