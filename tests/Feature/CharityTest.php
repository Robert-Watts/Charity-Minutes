<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CharityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the charity seeder.
     *
     * @return void
     */
    public function test_charity_seeder()
    {
        $this->seed();

        $this->assertDatabaseHas('charities', [
            'name' => 'Test Charity',
        ]);
    }

    /**
     * Test the charity api get all method.
     *
     * @return void
     */
    public function test_charity_api_get_all_route()
    {
        $this->seed();

        $response = $this->get('/api/charity');
        $response->assertJsonPath('data.0.id', 1);
        $response->assertJsonPath('data.0.name', "Test Charity");
        $response->assertJsonPath('data.0.objectives', "To facilitate good testing of charity software.");
        $response->assertStatus(200);
    }

    /**
     * Test the charity api get single charity method.
     *
     * @return void
     */
    public function test_charity_api_get_route()
    {
        $this->seed();

        $response = $this->get('/api/charity/1');
        $response->assertJsonPath('data.name', "Test Charity");
        $response->assertJsonPath('data.objectives', "To facilitate good testing of charity software.");
        $response->assertStatus(200);
    }
}
