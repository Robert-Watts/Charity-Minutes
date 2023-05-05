<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trusteeship extends Model
{
    /**
     * The database columns that are assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role',
        'charity_id',
        'member_id',
    ];

    /**
     * Get the member that holds the trusteeship.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the charty that the trusteeship is apart of.
     */
    public function charity()
    {
        return $this->belongsTo(Charity::class);
    }
}
