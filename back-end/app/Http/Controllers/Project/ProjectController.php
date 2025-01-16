<?php

namespace App\Http\Controllers\Project;

use App\Http\Resources\Project\ProjectShowResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use TheSeer\Tokenizer\Exception;

class ProjectController extends Controller
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
     *      schema="Project",
     *      type="object",
     *      @OA\Property(property="name", type="string", example="Project Name"),
     *      @OA\Property(property="img", type="string", example="https://work-hive.liara.run/storage/project_images/project123.jpg"),
     *      @OA\Property(
     *          property="team",
     *          type="object",
     *          @OA\Property(property="team_name", type="string", example="Team Alpha"),
     *          @OA\Property(property="team_lead", type="string", example="John Doe")
     *      )
     *  ),
     *
     * @OA\Get(
     *     path="/projects/{id}",
     *     summary="Get a project by ID",
     *     description="Fetches a project by its ID and returns its details.",
     *     tags={"Projects"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the project to retrieve",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project fetched successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="project",
     *                 type="object",
     *                 @OA\Property(property="name", type="string", example="Project Name"),
     *                 @OA\Property(property="img", type="string", example="https://work-hive.liara.run/storage/project_images/project123.jpg"),
     *                 @OA\Property(
     *                     property="team",
     *                     type="object",
     *                     description="see team show endpoint"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Project not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Error message")
     *         )
     *     ),
     *     @OA\SecurityScheme(
     *         securityScheme="bearerAuth",
     *         type="http",
     *         scheme="bearer"
     *     )
     * )
     */
    public function show(int $id)
    {
        try {
            $project = Project::find($id);
            if (!$project)
                return response()->json([
                    'code' => 'error',
                    'message' => 'Project Not Found'
                ], 404);
            return response()->json([
                'project' => new ProjectShowResource($project)
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
     *     path="/projects",
     *     summary="Get all projects",
     *     description="Fetches all projects and returns their details.",
     *     tags={"Projects"},
     *     @OA\Response(
     *         response=200,
     *         description="List of projects fetched successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="projects",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Project")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Error message")
     *         )
     *     ),
     *     @OA\SecurityScheme(
     *         securityScheme="bearerAuth",
     *         type="http",
     *         scheme="bearer"
     *     )
     * )
     */
    public function index()
    {
        try {
            return response()->json([
                'projects' => ProjectShowResource::collection(Project::all())
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
     *     path="/projects",
     *     operationId="storeProject",
     *     tags={"Projects"},
     *     summary="Create a new project",
     *     description="Stores a new project with the given name and team ID.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 description="Name of the project",
     *                 example="Project Alpha",
     *                 minLength=3,
     *                 maxLength=64
     *             ),
     *             @OA\Property(
     *                 property="teamId",
     *                 type="integer",
     *                 description="ID of the team associated with the project",
     *                 example=1,
     *                 minimum=1
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Project created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="project",
     *                 type="object",
     *                 ref="#/components/schemas/Project"
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
                'name' => 'required|string|min:3|max:64',
                'teamId' => 'required|int|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $project = Project::create([
                'P_Name' => $request->get('name'),
                'P_TeamId' => $request->get('teamId')
            ]);

            return response()->json([
                'project' => new ProjectShowResource($project)
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
     *     path="/projects/{id}",
     *     operationId="updateProject",
     *     tags={"Projects"},
     *     summary="Update an existing project",
     *     description="Updates the name and team ID of an existing project by its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the project to update",
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
     *                 property="name",
     *                 type="string",
     *                 description="Updated name of the project",
     *                 example="Updated Project Alpha",
     *                 minLength=3,
     *                 maxLength=64
     *             ),
     *             @OA\Property(
     *                 property="teamId",
     *                 type="integer",
     *                 description="Updated ID of the team associated with the project",
     *                 example=2,
     *                 minimum=1
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Project updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="project",
     *                 type="object",
     *                 ref="#/components/schemas/Project"
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
                'name' => 'required|string|min:3|max:64',
                'teamId' => 'required|int|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $project = Project::where('P_Id', $id)
                ->update([
                    'P_Name' => $request->get('name'),
                    'P_TeamId' => $request->get('teamId')
                ]);

            return response()->json([
                'project' => new ProjectShowResource($project)
            ], 204);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/projects/{id}",
     *     operationId="deleteProject",
     *     tags={"Projects"},
     *     summary="Delete a project",
     *     description="Deletes a project by its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the project to delete",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Project deleted successfully"),
     *             @OA\Property(property="code", type="string", example="success")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Project not found")
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
            $project = Project::find($id);
            if (!$project)
                return response()->json([
                    'code' => 'error',
                    'message' => 'Project not found'
                ], 404);

            $project->delete();
            return response()->json([
                'message' => 'Project deleted successfully',
                'code' => 'success'
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

}
