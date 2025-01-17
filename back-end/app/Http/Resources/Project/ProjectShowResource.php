<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\Team\TeamShowResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if (!$this->P_Id)
            return [];
        return [
            'id' => $this->P_Id,
            'name' => $this->P_Name,
            'team' => new TeamShowResource($this->team),
            'img' => $this->P_Img ? $this->getImgUrl() : null
        ];
    }

    private function getImgUrl()
    {
        return env('APP_URL') . '/public/project_images/' . $this->P_Img;
    }
}
