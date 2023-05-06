<?php

namespace App\Rules;

use App\Models\Charity;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;
use \Illuminate\Translation\PotentiallyTranslatedString;

class Minutes implements DataAwareRule, InvokableRule
{
    /**
     * All of the data from the HTTP request.
     *
     * @var array
     */
    protected $data = [];

    /**
     * Set the data from the HTTP request.
     *
     * @param  array  $data
     * @return $this
     */
    public function setData($data)
    {
        $this->data = $data;
 
        return $this;
    }

    /**
     * Validate that a array is a valid text section of the minutes.
     * 
     * @param int $key The position of the section.
     * @param array $section The section
     * @param  \Closure(string): PotentiallyTranslatedString  $fail func to call 
     *        when theres an error
     */
    private function validate_text($key, $section, $fail){
        # Ensure the section only has two items (type and one other)
        if (count($section) != 2){
            $fail("Item " . $key . " does not contain the correct number of items.");
        }
    
        # Ensure that the value section exists
        if (!array_key_exists("value", $section)){
            $fail("Item " . $key . " does not contain a value.");
        } else {
            # Ensure that the value section is a string
            if (!is_string($section['value'])){
                $fail("Item " . $key . " value is not a string.");
            }
        }
    }

    /**
     * Validate that a array is a valid vote section of the minutes.
     * 
     * @param int $key The position of the section.
     * @param array $section The section
     * @param  \Closure(string): PotentiallyTranslatedString  $fail func to call 
     *          when there is an error
     * @param Charity $charity The charity that is being checked 
     */
    private function validate_vote($key, $section, $fail, $charity){
        # Check that the section contains the correct items
        if(!(array_key_exists("resolution", $section) and 
            array_key_exists("votes_for", $section) and
            array_key_exists("votes_against", $section)) 
            or count($section) != 4){
           $fail("Item " . $key . " Does not contain the correct items.");
        }

        # Check that the resolution is a string
        if (array_key_exists("resolution", $section) and !is_string($section['resolution'])){
            $fail("Item " . $key . " - Resolution is not a string.");
        }
        
        $missing_vote_tally = false;
        # Check that the votes for the resolution are a int above 0
        if (!array_key_exists("votes_for", $section) or 
            !is_int($section['votes_for']) or 
            $section['votes_for'] < 0){

            $fail("Item " . $key . " - Votes For is not a integer above 0.");
            $missing_vote_tally = true;
        }

        # Check that the votes against the resolution are a int above 0
        if (!array_key_exists("votes_against", $section) or
            !is_int($section['votes_against']) or 
            $section['votes_against'] < 0){

            $fail("Item " . $key . " - Votes Against is not a integer above 0.");
            $missing_vote_tally = true;
        }

        # If one of the vote tallys is not valid do not check anything else
        if ($missing_vote_tally === true){
            return;
        }

        # Caulate the total votes
        $total_votes = $section['votes_against'] + $section['votes_for'];

        # Ensure there is not more votes than trustees avalible
        if ($total_votes > $charity->trustees->count()){
            $fail("Item " . $key . " - There are more votes than trustees!");
        }

        # Calculate the Quorum for the charity 
        $two_thirds_trustees = round(($charity->trustees->count() / 3) * 2, 0);
        $quorum = $two_thirds_trustees > 2 ? $two_thirds_trustees : 2;

        # Get the trustees that are marked as present
        $trustees_present = json_decode($this->data['attendance'], true);
        if (json_last_error() !== JSON_ERROR_NONE){
            $fail("Item " . $key . " - The number of trustees present could not be varified.");
            return;
        }

        # Ensure that the number of votes is not grater than the number of trustees present
        if(count($trustees_present) < $total_votes){
            $fail("Item " . $key . " - More votes have been counted than there are trustees present!");
        }

        # Ensure that the number of votes is not grater than the quorum
        if($quorum > count($trustees_present)){
            $fail("Item " . $key . " - A Quorum of " . $quorum . " has not been met, this vote cannot take place!");
        }
    }

    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        if (!array_key_exists("charity_id", $this->data)){
            $fail("Charity ID does not exist.");
            return; 
        }

        $charity = Charity::find($this->data['charity_id']);
        if ($charity === null){
            $fail("Could not find the charity in the database.");
            return;                    
        }

        $minutes = json_decode($value, true);
        if (json_last_error() !== JSON_ERROR_NONE){
            $fail("The minutes are not valid JSON.");
            return;
        }

        foreach ($minutes as $key => $item) {
            if (!is_array($item)){
                $fail("Item " . $key + 1 . " of the minutes is not an array.");
            } else {

                if (!array_key_exists("type", $item)){            
                    $fail("Item " . $key + 1 . " does not contain a type.");
                    return; 
                }
                if ($item['type'] == "text"){ 
                    $this->validate_text($key + 1, $item, $fail);
                }
                elseif ($item['type'] == "vote"){   
                    $this->validate_vote($key + 1, $item, $fail, $charity);
                }
                else {
                    $fail("Item " . $key + 1 . " type is not valid.");
                }
            }
        }
    }


}
