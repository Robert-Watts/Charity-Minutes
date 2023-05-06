<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    /**
     * The database columns that are assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'date_of_meeting',
        'attendance',
        'minutes',
        'charity_id'
    ];

    /**
     * Get the charity that the meeting is about.
     */
    public function charity()
    {
        return $this->belongsTo(Charity::class);
    }
}
