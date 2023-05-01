<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Charity;

class Member extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'charity_id'
    ];

    /**
     * Get the charity that owns the member.
     */
    public function charity()
    {
        return $this->belongsTo(Charity::class);
    }
}
