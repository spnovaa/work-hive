<?php

namespace App\Http\Controllers\Task;

use App\Http\Resources\Task\SubTaskShowResource;
use App\Models\Task\SubTask;
use App\Models\Task\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class SubTaskController extends Controller
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
     *     schema="SubTaskShowResource",
     *     type="object",
     *     title="SubTaskShowResource",
     *     description="Resource representation of a subtask",
     *     @OA\Property(
     *         property="id",
     *         type="integer",
     *         description="ID of the subtask",
     *         example=1
     *     ),
     *     @OA\Property(
     *         property="title",
     *         type="string",
     *         description="Title of the subtask",
     *         example="Subtask Title Example"
     *     ),
     *     @OA\Property(
     *         property="isCompleted",
     *         type="boolean",
     *         description="Status of the subtask indicating whether it is completed",
     *         example=true
     *     ),
     *     @OA\Property(
     *         property="taskId",
     *         type="integer",
     *         description="ID of the task associated with the subtask",
     *         example=2
     *     )
     * ),
     *
     * @OA\Get(
     *     path="/api/subtasks/{id}",
     *     operationId="showSubTask",
     *     tags={"SubTasks"},
     *     summary="Get a subtask by ID",
     *     description="Fetches a specific subtask by its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the subtask to retrieve",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subtask retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="subTask",
     *                 type="object",
     *                 ref="#/components/schemas/SubTaskShowResource"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Subtask not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="SubTask Not Found!")
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
            $sub_task = SubTask::find($id);
            if (!$sub_task)
                return response()->json([
                    'code' => 'error',
                    'message' => 'SubTask Not Found!'
                ], 400);

            return response()->json([
                'subTask' => new SubTaskShowResource($sub_task)
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
     *     path="/api/subtasks",
     *     operationId="indexSubTasks",
     *     tags={"SubTasks"},
     *     summary="Get subtasks by task ID",
     *     description="Fetches all subtasks associated with a specific task by its ID.",
     *     @OA\Parameter(
     *         name="taskId",
     *         in="query",
     *         required=true,
     *         description="ID of the task to retrieve subtasks for",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subtasks retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="subTasks",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     ref="#/components/schemas/SubTaskShowResource"
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
                'taskId' => 'required|int|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $task = Task::find($request->get('taskId'));

            return response()->json([
                'subTasks' => SubTaskShowResource::collection($task->sub_tasks)
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
     *     path="/api/subtasks",
     *     operationId="storeSubTask",
     *     tags={"SubTasks"},
     *     summary="Create a new subtask",
     *     description="Creates a new subtask and associates it with the specified task ID.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="title",
     *                 type="string",
     *                 description="Title of the subtask",
     *                 example="Subtask Example Title",
     *                 minLength=3,
     *                 maxLength=64
     *             ),
     *             @OA\Property(
     *                 property="taskId",
     *                 type="integer",
     *                 description="ID of the parent task to which this subtask belongs",
     *                 example=1,
     *                 minimum=0
     *             ),
     *             @OA\Property(
     *                 property="isCompleted",
     *                 type="boolean",
     *                 description="Indicates whether the subtask is completed",
     *                 example=true,
     *                 nullable=true
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Subtask created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="subTask",
     *                 type="object",
     *                 ref="#/components/schemas/SubTaskShowResource"
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
     *         response=404,
     *         description="Parent task does not exist",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Parent Task Does Not Exists!")
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
                'taskId' => 'required|int|min:0',
                'isCompleted' => 'boolean|nullable'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            if (!Task::where('T_Id', $request->get('taskId'))->exists())
                return response()->json([
                    'code' => 'error',
                    'message' => 'Parent Task Does Not Exists!'
                ], 404);

            $sub_task = SubTask::create([
                'S_TaskId' => $request->get('taskId'),
                'S_Title' => $request->get('title'),
                'S_IsCompleted' => !!$request->get('isCompleted')
            ]);

            return response()->json([
                'subTask' => new SubTaskShowResource($sub_task)
            ], 201);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }


    /**
     * @OA\Put(
     *     path="/api/subtasks/{id}",
     *     operationId="updateSubTask",
     *     tags={"SubTasks"},
     *     summary="Update a subtask by ID",
     *     description="Updates an existing subtask with the provided details.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the subtask to update",
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
     *                 description="Updated title of the subtask",
     *                 example="Updated Subtask Title",
     *                 minLength=3,
     *                 maxLength=64
     *             ),
     *             @OA\Property(
     *                 property="taskId",
     *                 type="integer",
     *                 description="ID of the parent task to which this subtask belongs",
     *                 example=1,
     *                 minimum=0
     *             ),
     *             @OA\Property(
     *                 property="isCompleted",
     *                 type="boolean",
     *                 description="Indicates whether the subtask is completed",
     *                 example=true,
     *                 nullable=true
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Subtask updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="subTask",
     *                 type="object",
     *                 ref="#/components/schemas/SubTaskShowResource"
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
     *         response=404,
     *         description="Subtask or parent task does not exist",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="SubTask Does Not Exists!")
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
                'taskId' => 'required|int|min:0',
                'isCompleted' => 'boolean|nullable'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $sub_task = SubTask::find($id);
            if (!$sub_task)
                return response()->json([
                    'code' => 'error',
                    'message' => 'SubTask Does Not Exists!'
                ], 404);

            if (!Task::where('T_Id', $request->get('taskId'))->exists())
                return response()->json([
                    'code' => 'error',
                    'message' => 'Parent Task Does Not Exists!'
                ], 404);

            $sub_task->update([
                'S_TaskId' => $request->get('taskId'),
                'S_Title' => $request->get('title'),
                'S_IsCompleted' => !!$request->get('isCompleted')
            ]);

            return response()->json([
                'subTask' => new SubTaskShowResource($sub_task)
            ], 204);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }
}
