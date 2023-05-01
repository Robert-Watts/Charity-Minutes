<?php

namespace Tests\Feature;

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MemberTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the charity api get single charity method.
     *
     * @return void
     */
    public function test_charity_api_get_route()
    {
        $member = new Member();
        $member->name = "Test Member";
        $member->charity_id = 1;
        $member->save();
        $id = $member->id;

        $response = $this->get('/api/member/' . $id);
        $response->assertJsonPath('data.name', "Test Member");
        $response->assertJsonPath('data.charity.id', 1);
        $response->assertJsonPath('data.charity.name', "Test Charity");
        $response->assertJsonPath('data.charity.objectives', "To facilitate good testing of charity software.");
        $response->assertStatus(200);
    }
}
