<?php

namespace App\Rules;

use App\Models\Charity;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;

class Minutes implements DataAwareRule, InvokableRule
{
    /**
     * All of the data under validation.
     *
     * @var array
     */
    protected $data = [];

    /**
     * Set the data under validation.
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
     * 
     * @param int $key
     * @param array $object
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    private function validate_text($key, $object, $fail){
        if (count($object) != 2){
            $fail("Item " . $key . " does not contain the correct number of items.");
        }
    
        if (!array_key_exists("value", $object)){
            $fail("Item " . $key . " does not contain a value.");
        } else {
            if (!is_string($object['value'])){
                $fail("Item " . $key . " value is not a string.");
            }
        }
        
    }

    /**
     * 
     * @param int $key
     * @param array $object
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     * @param Charity $charity
     */
    private function validate_vote($key, $object, $fail, $charity){
        if(!(array_key_exists("resolution", $object) and 
        array_key_exists("votes_for", $object) and
        array_key_exists("votes_against", $object)) or
        count($object) != 4){
           $fail("Item " . $key . " Does not contain the correct items.");
        }

        if (array_key_exists("resolution", $object) and !is_string($object['resolution'])){
            $fail("Item " . $key . " - Resolution is not a string.");
        }
        
        $missing_vote_tally = false;

        if (!array_key_exists("votes_for", $object) or !is_int($object['votes_for']) or $object['votes_for'] < 0){
            $fail("Item " . $key . " - Votes For is not a integer above 0.");
            $missing_vote_tally = true;
        }

        if (!array_key_exists("votes_against", $object) or !is_int($object['votes_against']) or $object['votes_against'] < 0){
            $fail("Item " . $key . " - Votes Against is not a integer above 0.");
            $missing_vote_tally = true;
        }

        if ($missing_vote_tally === true){
            return;
        }

        $total_votes = $object['votes_against'] + $object['votes_for'];

        if ($total_votes > $charity->trustees->count()){
            $fail("Item " . $key . " - There are more votes than trustees!");
        }

        $two_thirds_trustees = round(($charity->trustees->count() / 3) * 2, 0);
        $quorum = $two_thirds_trustees > 2 ? $two_thirds_trustees : 2;

        $trustees_present = json_decode($this->data['attendance'], true);
        if (json_last_error() !== JSON_ERROR_NONE){
            $fail("The number of trustees present could not be varified.");
            return;
        }

        if(count($trustees_present) < $total_votes){
            $fail("Item " . $key . " - More votes have been counted than there are trustees present!");
        }

        if($quorum > count($trustees_present)){
            $fail("Item " . $key . " - A Quorum of " . $quorum . " has not been met, this vote cannot take place!");
        }



    }

    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
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
