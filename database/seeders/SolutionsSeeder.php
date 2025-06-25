<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Solution;
use App\Models\Product;
use Illuminate\Support\Str;

class SolutionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $solutions = [
            [
                'name' => 'Material Handling Machines',
                'slug' => 'material-handling',
                'description' => 'Specialized equipment for moving and managing materials efficiently in warehouses, construction sites, and industrial facilities.',
                'image' => '/images/solutions/material-handling.jpg',
                'is_viewable' => true
            ],
            [
                'name' => 'Land/Ground Clearing Machines',
                'slug' => 'land-clearing',
                'description' => 'Powerful equipment for site preparation, land development, and vegetation clearing for construction and agricultural projects.',
                'image' => '/images/solutions/land-clearing.jpg',
                'is_viewable' => true
            ],
            [
                'name' => 'Road Construction Machines',
                'slug' => 'road-construction',
                'description' => 'Heavy machinery designed for road building, paving, and infrastructure development projects.',
                'image' => '/images/solutions/road-construction.jpg',
                'is_viewable' => true
            ],
            [
                'name' => 'General Construction Machines',
                'slug' => 'general-construction',
                'description' => 'Versatile equipment for various construction projects including building, demolition, and site development.',
                'image' => '/images/solutions/general-construction.jpg',
                'is_viewable' => true
            ],
            [
                'name' => 'Mining & Excavation Equipment',
                'slug' => 'mining-excavation',
                'description' => 'Heavy-duty machines designed for mining operations, excavation work, and earth moving projects.',
                'image' => '/images/solutions/mining-excavation.jpg',
                'is_viewable' => true
            ],
            [
                'name' => 'Agricultural / Farm Support Machinery',
                'slug' => 'agricultural',
                'description' => 'Specialized equipment for agricultural applications, farming operations, and rural development projects.',
                'image' => '/images/solutions/agricultural.jpg',
                'is_viewable' => true
            ]
        ];

        foreach ($solutions as $solutionData) {
            $solution = Solution::create($solutionData);
            
            // Get products based on keywords in solution name for initial categorization
            $keywords = $this->getKeywordsForSolution($solutionData['slug']);
            
            $products = Product::whereHas('category', function($query) use ($keywords) {
                foreach($keywords as $keyword) {
                    $query->orWhere('name', 'like', '%' . $keyword . '%');
                }
            })
            ->orWhere(function($query) use ($keywords) {
                foreach($keywords as $keyword) {
                    $query->orWhere('name', 'like', '%' . $keyword . '%')
                          ->orWhere('description', 'like', '%' . $keyword . '%');
                }
            })
            ->limit(20) // Limit initial products per solution
            ->get();

            if ($products->count() > 0) {
                $solution->products()->attach($products->pluck('id'));
            }
        }
    }

    /**
     * Get relevant keywords for each solution type
     */
    private function getKeywordsForSolution($slug)
    {
        return match($slug) {
            'material-handling' => ['loader', 'forklift', 'crane', 'handler', 'conveyor'],
            'land-clearing' => ['bulldozer', 'dozer', 'clearing', 'grader', 'scraper'],
            'road-construction' => ['paver', 'roller', 'compactor', 'asphalt', 'road'],
            'general-construction' => ['excavator', 'backhoe', 'demolition', 'concrete'],
            'mining-excavation' => ['mining', 'drill', 'shovel', 'dump truck', 'quarry'],
            'agricultural' => ['tractor', 'harvester', 'plough', 'seeder', 'farm'],
            default => []
        };
    }
} 