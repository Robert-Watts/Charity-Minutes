<?php

namespace App\Http\Controllers;

use App\Http\Resources\MemberResource;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display the a specific member.
     *
    */
    public function show($id)
    {
        return new MemberResource(Member::with("charity")->findOrFail($id));
    }
}
