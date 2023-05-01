<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrusteeResource extends JsonResource
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
            'member_id' => $this->member->id,
            'member_name'=>$this->member->name,
            'role' => $this->role,
            'charity' => CharityResource::make($this->whenLoaded("charity")),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
