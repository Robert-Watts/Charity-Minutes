<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Charity;

class Member extends Model
{
    use HasFactory;

    /**
     * The database columns that are assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'charity_id'
    ];

    /**
     * Get the charity that the member is apart of.
     */
    public function charity()
    {
        return $this->belongsTo(Charity::class);
    }

    /**
     * Get the Trusteeships that the member holds.
     */
    public function trustees()
    {
        $this->hasMany(Trusteeship::class);
    }
}
