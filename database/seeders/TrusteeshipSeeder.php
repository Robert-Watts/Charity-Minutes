<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Member;
use App\Models\Trusteeship;

class TrusteeshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ["Chair", "Treasurer", "Secretary", "Officer", "Officer"];
        foreach ($roles as &$role) {
            $member = Member::factory()->create();

            Trusteeship::create([
                'role'=> $role,
                'charity_id' => 1,
                'member_id' => $member->id,
            ]);

        }
    }
}
