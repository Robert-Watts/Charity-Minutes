<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Charity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
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
}
