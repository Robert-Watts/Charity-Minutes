<?php

namespace Tests\Feature;

use App\Models\Meeting;
use App\Models\Trusteeship;
use App\Models\Charity;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MeetingTest extends TestCase
{
    use RefreshDatabase;

    private function create_test_meeting($date="2023-04-01", $attendance = "[]", $minutes='[{"type": "text", "value": ""}]'){
        $meeting = new Meeting();
        $meeting->date_of_meeting = $date;
        $meeting->attendance = $attendance;
        $meeting->minutes = $minutes;
        $meeting->charity_id = 1;
        $meeting->save();
        return $meeting;
    }

    /**
     * Test the create meeting API route adds to the meeting to the database
     *
     * @return void
     */
    public function test_create_meeting_returns_meeting()
    {
        $this->seed();

        $response = $this->post("/api/meeting/", [
            "date_of_meeting" => "2023-04-01", 
            "attendance" => "[]", 
            "minutes" => '[{"type": "text", "value": ""}]',
            "charity_id" => 1
        ]);

        $response->assertStatus(201);

        $response->assertJsonPath('data.date_of_meeting', "2023-04-01");
        $response->assertJsonPath('data.attendance', "[]");
        $response->assertJsonPath('data.minutes', '[{"type": "text", "value": ""}]');

        $this->assertDatabaseCount('meetings', 1);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_get_individual_meeting()
    {
        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->get("/api/meeting/" . $meeting->id);

        $response->assertStatus(200);

        $response->assertJsonPath('data.date_of_meeting', $meeting->date_of_meeting);
        $response->assertJsonPath('data.attendance', $meeting->attendance);
        $response->assertJsonPath('data.minutes', $meeting->minutes);
        $response->assertJsonPath('data.charity.id', $meeting->charity->id);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_minutes_text_has_too_many_keys()
    {
        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=>'[{"type": "text", "value": "foo", "key": "zar"}]'
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => 'Item 1 does not contain the correct number of items.',
        ]);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_minutes_has_value_key()
    {
        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=>'[{"type": "text", "foo": "bar"}]'
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => 'Item 1 does not contain a value.',
        ]);
    }


    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_minutes_value_is_string()
    {
        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=>'[{"type": "text", "value": 1}]'
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => 'Item 1 value is not a string.',
        ]);
    }


        /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_contains_correct_keys()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $values = [
            '[{"type": "vote", "value": 1}]', # Missing Resolution
            '[{"type": "vote", "resolution": 1}]', # Missing votes_for
            '[{"type": "vote", "resolution": 1, "votes_for": 1}]', # Missing votes_against
            '[{"type": "vote", "resolution": 1, "votes_for": 1, "votes_against": 1, "foo":"bar"}]', # Too Many Keys
        ];

        foreach ($values as $value) {

            $response = $this->put("/api/meeting/" . $meeting->id, [
                "charity_id"=> 1,
                "minutes"=> $value,
                "attendance"=>"[]"
            ]);
    
            $response->assertStatus(302);
            $response->assertInvalid([
                'minutes' => ' Does not contain the correct items.',
            ]);
    
        }

    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_resolution_is_string()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=> '[{"type": "vote", "resolution": 1, "votes_for": 1, "votes_against": 1}]',
            "attendance"=>"[]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => "Item 1 - Resolution is not a string."
        ]);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_votes_for_is_int_above_0()
    {
        $this->seed();

        $meeting = $this->create_test_meeting();

        $values = [
            '[{"type": "vote", "resolution": "1", "votes_against": 1}]', # Missing
            '[{"type": "vote", "resolution": "1", "votes_for": "foo bar", "votes_against": 1}]', # string
            '[{"type": "vote", "resolution": "1", "votes_for": -1, "votes_against": 1}]', # string
        ];

        foreach ($values as $value) {

            $response = $this->put("/api/meeting/" . $meeting->id, [
                "charity_id"=> 1,
                "minutes"=> $value,
                "attendance"=>"[]"
            ]);
    
            $response->assertStatus(302);
            $response->assertInvalid([
                'minutes' => ' Votes For is not a integer above 0.',
            ]);
    
        }
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_votes_aginst_is_int_above_0()
    {
        $this->seed();

        $meeting = $this->create_test_meeting();

        $values = [
            '[{"type": "vote", "resolution": "1", "votes_for": 1}]', # Missing
            '[{"type": "vote", "resolution": "1", "votes_against": "foo bar", "votes_for": 1}]', # string
            '[{"type": "vote", "resolution": "1", "votes_against": -1, "votes_for": 1}]', # string
        ];

        foreach ($values as $value) {

            $response = $this->put("/api/meeting/" . $meeting->id, [
                "charity_id"=> 1,
                "minutes"=> $value,
                "attendance"=>"[]"
            ]);
    
            $response->assertStatus(302);
            $response->assertInvalid([
                'minutes' => ' Votes Against is not a integer above 0.',
            ]);
    
        }
    }
    
    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_total_votes_more_than_number_of_trustees()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 50, "votes_against": 50}]',
            "attendance"=>"[]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => "Item 1 - There are more votes than trustees!"
        ]);
    }

        /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_total_votes_more_than_attendance()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 4, "votes_against": 0}]',
            "attendance"=>"[1,2,3]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => "Item 1 - More votes have been counted than there are trustees present"
        ]);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_present_trustees_more_than_quorum_of_two_thirds_trustees()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 4, "votes_against": 0}]',
            "attendance"=>"[1,2]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => "Item 1 - A Quorum of 3 has not been met, this vote cannot take place!"
        ]);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_vote_present_trustees_more_than_quorum_of_two()
    {

        $this->seed("Database\\Seeders\\CharitySeeder");
        $this->seed("Database\\Seeders\\MemberSeeder");
        
        # Create trustees
        $roles = ["Chair", "Treasurer"];
        foreach ($roles as $role) {
            $member = Member::factory()->create();
            Trusteeship::create([
                'role'=> $role,
                'charity_id' => 1,
                'member_id' => $member->id,
            ]);
        }
        
        $meeting = $this->create_test_meeting();
        $meeting->refresh();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 1, "votes_against": 0}]',
            "attendance"=>"[1]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => "Item 1 - A Quorum of 2 has not been met, this vote cannot take place!"
        ]);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_attendance_charity_does_not_exist()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 2,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 4, "votes_against": 0}]',
            "attendance"=>"[1,2,3,4]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'minutes' => "Could not find the charity in the database."
        ]);
    }


        /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_attendance_trustee_does_not_exist()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 1,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 4, "votes_against": 0}]',
            "attendance"=>"[1, 10]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'attendance' => "Could not find the trustee id 10 in the database."
        ]);
    }

    /**
     * Test the get route for an indervidual meeting
     *
     * @return void
     */
    public function test_validate_attendance_trustee_is_not_part_of_charity()
    {

        $this->seed();

        $meeting = $this->create_test_meeting();

        # Create a second charity
        Charity::create([
            'id'=>2,
            'name' => 'Blah Blah',
            'objectives' => 'Foo Bar',
        ]);
        
        # Create a member for the charity with id 11 and 12
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();

        Trusteeship::create([
            'role'=> "Chair",
            'charity_id' => 2,
            'member_id' => $member1->id,
        ]);
        Trusteeship::create([
            'role'=> "Tresurer",
            'charity_id' => 2,
            'member_id' => $member2->id,
        ]);

        $this->assertEquals(Trusteeship::count(), 7);

        $response = $this->put("/api/meeting/" . $meeting->id, [
            "charity_id"=> 2,
            "minutes"=> '[{"type": "vote", "resolution": "", "votes_for": 4, "votes_against": 0}]',
            "attendance"=>"[2]"
        ]);

        $response->assertStatus(302);
        $response->assertInvalid([
            'attendance' => "Could not find the trustee id 2 in the database."
        ]);
    }
}
