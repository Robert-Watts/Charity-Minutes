<?php

namespace App\Http\Controllers;

use App\Http\Resources\CharityResource;
use App\Models\Charity;

class CharityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return string
     */
    public function index()
    {
        return CharityResource::collection(Charity::with('members')->with('trustees')->get());
    }

    /**
     * Display the specified resource.
     *
    */
    public function show($id)
    {
        return new CharityResource(Charity::with('members')->with('trustees')->with('trustees.member')->findOrFail($id));
    }
}
