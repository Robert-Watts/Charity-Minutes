<?php

namespace App\Http\Controllers;

use App\Models\Charity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CharityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return string
     */
    public function index()
    {
        $charities = Charity::all();
        return $charities->toJson();
    }

    /**
     * Display the specified resource.
     *
    */
    public function show($id)
    {
        $x = Charity::findOrFail($id);
        return $x->toJson();
    }
}
