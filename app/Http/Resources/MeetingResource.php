<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MeetingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date_of_meeting' => $this->date_of_meeting,
            'attendance' => $this->attendance,
            'minutes' => $this->minutes,
            'charity' => TrusteeResource::collection($this->whenLoaded("charity")),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
