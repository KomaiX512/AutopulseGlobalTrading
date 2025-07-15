<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductType;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productTypes = [
            [
                'id' => 1,
                'name' => 'Machine',
                'description' => 'Heavy machinery and equipment'
            ],
            [
                'id' => 2,
                'name' => 'Electric Bikes',
                'description' => 'Electric bicycles and e-bikes'
            ],
            [
                'id' => 3,
                'name' => 'Vehicles',
                'description' => 'Automotive vehicles and transport'
            ],
            [
                'id' => 4,
                'name' => 'Machine Part',
                'description' => 'Spare parts for machinery'
            ],
            [
                'id' => 5,
                'name' => 'Vehicle Part',
                'description' => 'Automotive spare parts'
            ],
            [
                'id' => 6,
                'name' => 'Bike Part',
                'description' => 'Bicycle and e-bike parts'
            ],
            [
                'id' => 7,
                'name' => 'Attachments & Accessories',
                'description' => 'Equipment attachments and accessories'
            ]
        ];

        foreach ($productTypes as $productTypeData) {
            ProductType::updateOrCreate(
                ['id' => $productTypeData['id']],
                $productTypeData
            );
        }
    }
}
