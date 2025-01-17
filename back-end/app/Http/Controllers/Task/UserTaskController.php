<?php

namespace App\Http\Controllers\Task;

use App\Http\Resources\Task\TaskShowResource;
use App\Models\Task\Task;
use App\Models\Task\UsersTasks;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class UserTaskController extends Controller
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
     * @OA\Get(
     *     path="/api/user/tasks",
     *     operationId="indexUserTasks",
     *     tags={"UserTasks"},
     *     summary="Get tasks for the authenticated user with optional filters",
     *     description="Fetches tasks for the authenticated user, with optional filters for due date and overdue status.",
     *     @OA\Parameter(
     *         name="date",
     *         in="query",
     *         required=false,
     *         description="Filter tasks by a specific due date",
     *         @OA\Schema(
     *             type="string",
     *             format="date",
     *             example="2025-01-01"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="overdue",
     *         in="query",
     *         required=false,
     *         description="Filter tasks by overdue status. If true, only overdue tasks are returned.",
     *         @OA\Schema(
     *             type="boolean",
     *             example=true
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
                'date' => 'date|nullable',
                'overdue' => 'boolean|nullable'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            /**
             * @var $user User
             */
            $user = auth()->user();
            $tasks = $user->tasks();

            if ($request->get('date'))
                $tasks->where('T_DueDate', $request->get('date'));
            if ($request->get('overdue'))
                $tasks->where('T_DueDate', now()->format('Y-m-d'));
            if ($request->get('overdue') === false)
                $tasks->where('T_DueDate', '<=', now()->format('Y-m-d'));
            return response()->json([
                'tasks' => TaskShowResource::collection($tasks->get())
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
     *     path="/api/user/tasks",
     *     operationId="assignTaskToUser",
     *     tags={"UsersTasks"},
     *     summary="Assign a task to a user",
     *     description="Assigns an existing task to a user based on user ID and task ID.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="userId",
     *                 type="integer",
     *                 description="ID of the user to whom the task will be assigned",
     *                 example=1,
     *                 minimum=1
     *             ),
     *             @OA\Property(
     *                 property="taskId",
     *                 type="integer",
     *                 description="ID of the task to assign to the user",
     *                 example=1,
     *                 minimum=1
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task successfully assigned to the user",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Task Has Assigned To The Intended User.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error or missing user/task",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="User Not Found! / Task Not Found!")
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
                'userId' => 'required|int|min:1',
                'taskId' => 'required|int|min:1'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            if (!Task::where('T_Id', $request->get('taskId'))->exists())
                return response()->json([
                    'code' => 'error',
                    'message' => 'Task Not Found!'
                ], 404);
            if (!User::where('U_Id', $request->get('userId'))->exists())
                return response()->json([
                    'code' => 'error',
                    'message' => 'User Not Found!'
                ], 404);
            UsersTasks::insert([
                'U_UserID' => $request->get('userId'),
                'U_TaskId' => $request->get('taskId')
            ]);

            return response()->json([
                'code' => 'success',
                'message' => 'Task Has Been Assigned To The Intended User.'
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete (
     *     path="/api/user/tasks",
     *     operationId="removeTaskFromUser",
     *     tags={"UsersTasks"},
     *     summary="Remove a task assignment from a user",
     *     description="Removes the assignment of a task from a user based on user ID and task ID.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="userId",
     *                 type="integer",
     *                 description="ID of the user from whom the task will be removed",
     *                 example=1,
     *                 minimum=1
     *             ),
     *             @OA\Property(
     *                 property="taskId",
     *                 type="integer",
     *                 description="ID of the task to remove from the user",
     *                 example=1,
     *                 minimum=1
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task successfully removed from the user",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Task Has Been Successfully Removed From User")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error or missing user/task",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Validation failed or User/Task not found")
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
    public function destroy(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'userId' => 'required|int|min:1',
                'taskId' => 'required|int|min:1'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }
            UsersTasks::where([
                'U_UserId' => $request->get('userId'),
                'taskId' => $request->get('taskId')
            ])->delete();

            return response()->json([
                'code' => 'success',
                'message' => 'Task Has Been Successfully Removed From User'
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }
}
