<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trusteeship extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role',
        'charity_id',
        'member_id',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function charity()
    {
        return $this->belongsTo(Charity::class);
    }
}
