<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CharityResource extends JsonResource
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
            'name' => $this->name,
            'objectives' => $this->objectives,
            'members' => MemberResource::collection($this->whenLoaded("members")),
            'trustees' => TrusteeResource::collection($this->whenLoaded("trustees")),
            'meetings' => MeetingResource::collection($this->whenLoaded("meetings")),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
