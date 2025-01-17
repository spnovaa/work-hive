<?php

namespace App\Http\Controllers\Team;

use App\Http\Resources\Team\TeamShowResource;
use App\Models\Team\Team;
use App\Models\Team\TeamsUsers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
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
     *
     * @OA\Get(
     *     path="/api/teams",
     *     summary="Get teams that current user is admin of",
     *     description="Retrieve a list of all teams that the user is admin of.",
     *     operationId="getMemberTeams",
     *     tags={"Teams"},
     *     @OA\Response(
     *         response=200,
     *         description="List of teams",
     *         @OA\JsonContent(
     *              type="object",
     *              example={{"id": 1, "name": "string", "users": {}}}
     *          )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Internal server error")
     *         )
     *     )
     * )
     */
    public function index()
    {
        try {
            $teams = auth()->user()->admin_of_teams;
            return response()->json(TeamShowResource::collection($teams));
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }


    /**
     * @OA\Post(
     *     path="/api/teams",
     *     operationId="createTeam",
     *     tags={"Teams"},
     *     summary="Create a new team",
     *     description="Creates a new team with the provided name.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 minLength=3,
     *                 maxLength=128,
     *                 example="Dream Team"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Team created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="team",
     *                 type="object",
     *
     *                 example={"id":1,"name":"string","users":{}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="error",
     *                 type="object",
     *                 example={"name": {"The name field is required."}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Error message details")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:3|max:128'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $team = Team::create([
                'T_Name' => $request->get('name'),
                'T_AdminId' => auth()->id()
            ]);

            return response()->json([
                'team' => new TeamShowResource($team)
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
     *     path="/api/teams/{id}",
     *     summary="Get a team by ID",
     *     description="Retrieve a specific team by its ID.",
     *     operationId="getTeamById",
     *     tags={"Teams"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the team",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team details",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="name", type="string", example="Team A"),
     *             @OA\Property(property="users", type="array", @OA\Items(type="object"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Team not found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Internal server error")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        try {
            $teams = Team::where([
                'T_Id' => $id,
                'T_AdminId' => auth()->id()
            ])->first();
            return response()->json([
                'team' => new TeamShowResource($teams)
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
     *     path="/api/teams/{id}",
     *     operationId="updateTeam",
     *     tags={"Teams"},
     *     summary="Update an existing team",
     *     description="Updates the name of a team by its ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the team to update",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 minLength=3,
     *                 maxLength=128,
     *                 example="Updated Team Name"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="team",
     *                 type="object",
     *
     *                 example={"id":1,"name":"string","users":{}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Team not found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Error message details")
     *         )
     *     )
     * )
     */
    public function update(Request $request, int $id)
    {
        try {
            $team = Team::where([
                'T_AdminId' => auth()->id(),
                'T_Id' => $id
            ])->first();

            if (!$team)
                return response()->json([
                    'code' => 'error',
                    'message' => 'Team Not Found! You Might Not Have Access To The Intended Team'
                ], 404);

            return response()->json([
                'team' => new TeamShowResource(Team::find($id))
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
     *     path="/api/teams/{id}",
     *     operationId="deleteTeam",
     *     tags={"Teams"},
     *     summary="Delete a team",
     *     description="Deletes a team and its related user associations by team ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the team to delete",
     *         required=true,
     *         @OA\Schema(type="string", example="1")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="team removed successfully"),
     *             @OA\Property(property="code", type="string", example="success")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Team not found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Error message details")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            $team = Team::where([
                'T_AdminId' => auth()->id(),
                'T_Id' => $id
            ])->first();

            if (!$team)
                return response()->json([
                    'code' => 'error',
                    'message' => 'Team Not Found! You Might Not Have Access To The Intended Team'
                ], 404);

            TeamsUsers::where('T_TeamId', $id)->delete();
            $team->delete();
            DB::commit();
            return response()->json([
                'message' => 'team removed successfully',
                'code' => 'success'
            ]);
        } catch (\Throwable $throwable) {
            DB::rollBack();
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }
}
