<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMeetingRequest;
use App\Http\Requests\EditMettingRequest;
use App\Http\Resources\MeetingResource;
use App\Models\Charity;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateMeetingRequest $request)
    {
        $meeting = Meeting::create($request->all());
        
        return new MeetingResource($meeting);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function show($meeting_id)
    {
        return new MeetingResource(Meeting::findOrFailOrFail($meeting_id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function update(EditMettingRequest $request, Meeting $meeting)
    {
        $meeting->fill($request->all())->save();
        return new MeetingResource($meeting);
    }
}
