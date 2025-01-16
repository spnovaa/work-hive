<?php

namespace App\Http\Controllers\Task;

use App\Http\Resources\Task\TaskShowResource;
use App\Models\Task\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @OA\Schema(
     *      schema="TaskShowResource",
     *      type="object",
     *      title="TaskShowResource",
     *      description="Resource representation of a task",
     *      @OA\Property(
     *          property="id",
     *          type="integer",
     *          description="ID of the task",
     *          example=1
     *      ),
     *      @OA\Property(
     *          property="title",
     *          type="string",
     *          description="Title of the task",
     *          example="Task Title Example"
     *      ),
     *      @OA\Property(
     *          property="description",
     *          type="string",
     *          description="Description of the task",
     *          example="Task description goes here."
     *      ),
     *      @OA\Property(
     *          property="progress",
     *          type="integer",
     *          description="Progress of the task as a percentage",
     *          example=75
     *      ),
     *      @OA\Property(
     *          property="dueDate",
     *          type="string",
     *          format="date-time",
     *          description="Due date of the task",
     *          example="2025-02-01T12:00:00Z"
     *      ),
     *      @OA\Property(
     *          property="priority",
     *          type="string",
     *          description="Priority of the task (e.g., high, medium, low)",
     *          example="high"
     *      ),
     *      @OA\Property(
     *          property="project",
     *          type="object",
     *          ref="#/components/schemas/Project",
     *          description="The project associated with this task"
     *      )
     *  ),
     * @OA\Get(
     *     path="/tasks/{id}",
     *     operationId="showTask",
     *     tags={"Tasks"},
     *     summary="Get a task by ID",
     *     description="Fetches a specific task by its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the task to retrieve",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="task",
     *                 type="object",
     *                 ref="#/components/schemas/TaskShowResource"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Task Not Found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Detailed error message")
     *         )
     *     )
     * )
     */
    public function show(int $id)
    {
        try {
            $task = Task::find($id);
            if (!$task)
                return response()->json([
                    'code' => 'error',
                    'message' => 'Task Not Found.'
                ], 404);

            return response()->json([
                'task' => new TaskShowResource($task)
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/tasks",
     *     operationId="indexTasks",
     *     tags={"Tasks"},
     *     summary="Get tasks by project ID",
     *     description="Fetches all tasks associated with a specific project by its ID.",
     *     @OA\Parameter(
     *         name="projectId",
     *         in="query",
     *         required=true,
     *         description="ID of the project to retrieve tasks for",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tasks retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="tasks",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     ref="#/components/schemas/TaskShowResource"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 additionalProperties={
     *                     "type": "array",
     *                     "items": {
     *                         "type": "string"
     *                     }
     *                 }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Detailed error message")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'projectId' => 'required|int' //in query
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $tasks = Task::where('T_ProjectId', $request->get('projectId'))->get();

            return response()->json([
                'tasks' => TaskShowResource::collection($tasks)
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }


    /**
     * @OA\Post(
     *     path="/tasks",
     *     operationId="storeTask",
     *     tags={"Tasks"},
     *     summary="Create a new task",
     *     description="Creates a new task with the provided details.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="title",
     *                 type="string",
     *                 description="Title of the task",
     *                 example="New Task",
     *                 minLength=3,
     *                 maxLength=64
     *             ),
     *             @OA\Property(
     *                 property="description",
     *                 type="string",
     *                 description="Description of the task",
     *                 example="Detailed description of the task.",
     *                 maxLength=256,
     *                 nullable=true
     *             ),
     *             @OA\Property(
     *                 property="progress",
     *                 type="integer",
     *                 description="Progress percentage of the task",
     *                 example=50,
     *                 minimum=0,
     *                 maximum=100,
     *                 nullable=true
     *             ),
     *             @OA\Property(
     *                 property="dueDate",
     *                 type="string",
     *                 format="date",
     *                 description="Due date of the task",
     *                 example="2025-02-15"
     *             ),
     *             @OA\Property(
     *                 property="priority",
     *                 type="integer",
     *                 description="Priority level of the task",
     *                 example=5,
     *                 minimum=0,
     *                 maximum=10
     *             ),
     *             @OA\Property(
     *                 property="projectId",
     *                 type="integer",
     *                 description="ID of the project the task is associated with",
     *                 example=1,
     *                 minimum=0
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Task created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="task",
     *                 type="object",
     *                 ref="#/components/schemas/TaskShowResource"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 additionalProperties={
     *                     "type": "array",
     *                     "items": {
     *                         "type": "string"
     *                     }
     *                 }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Detailed error message")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|min:3|max:64',
                'description' => 'string|max:256|nullable',
                'progress' => 'required|int|min:0|max:100|nullable',
                'dueDate' => 'required|date',
                'priority' => 'required|int|min:0|max:10',
                'projectId' => 'required|int|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $task = Task::create([
                'T_Title' => $request->get('title'),
                'T_Description' => $request->get('description'),
                'T_Progress' => $request->get('progress'),
                'T_DueDate' => $request->get('dueDate'),
                'T_Priority' => $request->get('priority'),
                'T_ProjectId' => $request->get('projectId')
            ]);

            return response()->json([
                'task' => new TaskShowResource($task)
            ]);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }


    /**
     * @OA\Delete(
     *     path="/tasks/{id}",
     *     operationId="deleteTask",
     *     tags={"Tasks"},
     *     summary="Delete a task by ID",
     *     description="Deletes a specific task by its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the task to delete",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Task Deleted Successfully!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Task Not Found!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Detailed error message")
     *         )
     *     )
     * )
     */
    public function destroy(int $id)
    {
        try {
            $task = Task::find($id);
            if (!$task)
                return response()->json([
                    'code' => 'error',
                    'message' => 'Task Not Found!'
                ], 404);

            Task::where('T_Id', $id)->delete();

            return response()->json([
                'code' => 'success',
                'message' => 'Task Deleted Successfully!'
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/tasks/{id}",
     *     operationId="updateTask",
     *     tags={"Tasks"},
     *     summary="Update a task by ID",
     *     description="Updates an existing task with the provided details.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the task to update",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="title",
     *                 type="string",
     *                 description="Updated title of the task",
     *                 example="Updated Task Title",
     *                 minLength=3,
     *                 maxLength=64
     *             ),
     *             @OA\Property(
     *                 property="description",
     *                 type="string",
     *                 description="Updated description of the task",
     *                 example="Updated task description goes here.",
     *                 maxLength=256,
     *                 nullable=true
     *             ),
     *             @OA\Property(
     *                 property="progress",
     *                 type="integer",
     *                 description="Updated progress percentage of the task",
     *                 example=60,
     *                 minimum=0,
     *                 maximum=100,
     *                 nullable=true
     *             ),
     *             @OA\Property(
     *                 property="dueDate",
     *                 type="string",
     *                 format="date",
     *                 description="Updated due date of the task",
     *                 example="2025-03-01"
     *             ),
     *             @OA\Property(
     *                 property="priority",
     *                 type="integer",
     *                 description="Updated priority level of the task",
     *                 example=7,
     *                 minimum=0,
     *                 maximum=10
     *             ),
     *             @OA\Property(
     *                 property="projectId",
     *                 type="integer",
     *                 description="Updated ID of the project the task is associated with",
     *                 example=2,
     *                 minimum=0
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="task",
     *                 type="object",
     *                 ref="#/components/schemas/TaskShowResource"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 additionalProperties={
     *                     "type": "array",
     *                     "items": {
     *                         "type": "string"
     *                     }
     *                 }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Detailed error message")
     *         )
     *     )
     * )
     */
    public function update(Request $request, int $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|min:3|max:64',
                'description' => 'string|max:256|nullable',
                'progress' => 'required|int|min:0|max:100|nullable',
                'dueDate' => 'required|date',
                'priority' => 'required|int|min:0|max:10',
                'projectId' => 'required|int|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            Task::where('T_Id', $id)->update([
                'T_Title' => $request->get('title'),
                'T_Description' => $request->get('description'),
                'T_Progress' => $request->get('progress'),
                'T_DueDate' => $request->get('dueDate'),
                'T_Priority' => $request->get('priority'),
                'T_ProjectId' => $request->get('projectId')
            ]);

            $task = Task::find($id);

            return response()->json([
                'task' => new TaskShowResource($task)
            ]);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }
}
