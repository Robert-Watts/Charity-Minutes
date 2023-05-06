<?php

namespace App\Rules;

use App\Models\Charity;
use App\Models\Trusteeship;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;

/**
 * Validation Rule for an array of trustee ID in the format: [1,2,3]
 */
class Trustees implements DataAwareRule, InvokableRule
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
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): 
     *  \Illuminate\Translation\PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        # Get the charity ID from the HTTP request
        if (!array_key_exists("charity_id", $this->data)){
            $fail("Charity ID does not exist.");
            return; 
        }

        # Load the charity
        $charity = Charity::find($this->data['charity_id']);
        if ($charity === null){
            $fail("Could not find the charity in the database.");
            return;                    
        }

        # Convert the given list from json to an array
        $trustees = json_decode($value, true);
        if (json_last_error() !== JSON_ERROR_NONE){
            $fail("The trustees are not valid JSON.");
            return;
        }

        # For each of the trustee ID's
        foreach ($trustees as $trustee_id) {
            $trustee = Trusteeship::find($trustee_id);

            # Confirm that the trustee id is in the database
            if ($trustee === null){
                $fail("Could not find the trustee id " . $trustee_id . " in the database.");
                continue;
            }
            
            # Confirm that the trustee is a trustee of the charity
            if($trustee->charity->id != $charity->id) {
                $fail("The trustee id " . $trustee_id . " is not a trustee of the given charity.");
            }
        }
    }
}
