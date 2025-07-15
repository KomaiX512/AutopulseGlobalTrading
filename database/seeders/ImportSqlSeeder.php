<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ImportSqlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path to the SQL dump file
        $sqlPath = base_path('app/autopulse.sql');

        if (! File::exists($sqlPath)) {
            $this->command->error("SQL dump not found at {$sqlPath}");
            return;
        }

        $this->command->info('Importing SQL dump (this may take a while)...');

        // Disable foreign key checks for import
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Import the SQL file
        DB::unprepared(File::get($sqlPath));

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('SQL dump imported successfully.');
    }
} 