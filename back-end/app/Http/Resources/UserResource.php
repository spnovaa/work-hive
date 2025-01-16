<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->U_Id,
            'email' => $this->U_Email,
            'name' => $this->U_Name,
            'lastName' => $this->U_LastName,
            'profileImage' => $this->U_ProfileImg ? $this->getProfileUrl() : null
        ];
    }

    private function getProfileUrl()
    {
        return env('APP_URL') . '/public/profile_images/' . $this->U_ProfileImg;
    }
}
