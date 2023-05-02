<?php

namespace App\Rules;

use App\Models\Charity;
use App\Models\Trusteeship;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;

class Trustees implements DataAwareRule, InvokableRule
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

        $trustees = json_decode($value, true);
        if (json_last_error() !== JSON_ERROR_NONE){
            $fail("The trustees are not valid JSON.");
            return;
        }


        foreach ($trustees as $trustee_id) {
            $trustee = Trusteeship::find($trustee_id);
            if ($trustee === null){
                $fail("Could not find the trustee id " . $trustee_id . " in the database.");
                continue;
            }
            
            if($trustee->charity->id != $charity->id) {
                $fail("The trustee id " . $trustee_id . " is not a trustee of the given charity.");
            }
        }

    }
}
