<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Charity extends Model
{
    use HasFactory;

    /**
     * The database columns that are assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'objectives',
    ];

    /**
     * Get the members for the charity.
     */
    public function members()
    {
        return $this->hasMany(Member::class);
    }

    /**
     * Get the trustees for the charity.
     */
    public function trustees()
    {
        return $this->hasMany(Trusteeship::class);
    }

    /**
     * Get the meetings for a charity.
     */
    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }
}
