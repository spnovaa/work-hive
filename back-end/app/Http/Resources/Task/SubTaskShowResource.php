<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubTaskShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if (!$this->S_Id)
            return [];
        return [
            'id' => $this->S_Id,
            'title' => $this->S_Title,
            'isCompleted' => $this->S_IsCompleted,
            'taskId' => $this->S_TaskId
        ];
    }

}
