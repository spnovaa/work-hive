<?php

namespace App\Http\Resources\Team;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if (!$this->T_Id)
            return [];
        return [
            'id' => $this->T_Id,
            'name' => $this->T_Name,
            'users' => UserResource::collection($this->users)
        ];
    }
}
