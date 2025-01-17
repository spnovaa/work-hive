<?php

namespace App\Http\Resources\Task;

use App\Http\Resources\Project\ProjectShowResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskShowResource extends JsonResource
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
            'title' => $this->T_Title,
            'description' => $this->T_Description,
            'progress' => $this->T_Progress,
            'dueDate' => $this->T_DueDate,
            'priority' => $this->Priority,
            'subTasks' => SubTaskShowResource::collection($this->sub_tasks),
            'project' => new ProjectShowResource($this->project),
        ];
    }

}
