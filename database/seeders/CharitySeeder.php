<?php

namespace Database\Seeders;

use App\Models\Charity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CharitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Charity::create([
            'id'=>1,
            'name' => 'Test Charity',
            'objectives' => 'To facilitate good testing of charity software.',
        ]);
        
    }
}
