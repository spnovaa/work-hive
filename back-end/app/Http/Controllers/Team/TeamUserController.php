<?php

namespace App\Http\Controllers\Team;

use App\Http\Resources\Team\TeamShowResource;
use App\Models\Team\Team;
use App\Models\Team\TeamsUsers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class TeamUserController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/teams/users",
     *     summary="Add user to a team",
     *     description="Associates a user with a team by inserting a record into the TeamsUsers table.",
     *     tags={"Teams"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"userId","teamId"},
     *             @OA\Property(property="userId", type="integer", example=1, description="ID of the user to add"),
     *             @OA\Property(property="teamId", type="integer", example=2, description="ID of the team to join")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User added to the team successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="user added to the intended team")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object")
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
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'userId' => 'required|int',
                'teamId' => 'required|int'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            //TODO: move this part to service and repository
            TeamsUsers::insert([
                'T_UserId' => $request->get('userId'),
                'T_TeamId' => $request->get('teamId')
            ]);

            return response()->json([
                'code' => 'success',
                'message' => 'user added to the intended team'
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
     *     path="/api/teams/users/{team_id}",
     *     summary="Get team users",
     *     description="Retrieves detailed information about a specific team users by its ID.",
     *     tags={"Teams"},
     *     @OA\Parameter(
     *         name="team_id",
     *         in="path",
     *         required=true,
     *         description="ID of the team to retrieve",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Team details retrieved successfully",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Team not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Team not found")
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
    public function show(int $team_id)
    {
        try {
            return response()->json(new TeamShowResource(Team::find($team_id)));
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/users/{user_id}/teams",
     *     summary="Get all teams of a user",
     *     description="Retrieves all teams that a specific user is a member of.",
     *     tags={"Users", "Teams"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         required=true,
     *         description="ID of the user whose teams are being retrieved",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of user's teams retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="User not found")
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
    public function showUserTeams(int $user_id)
    {
        try{
            return response()->json([
               TeamShowResource::collection(User::find($user_id)->teams)
            ]);
        }catch (\Throwable $throwable){
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/teams/users",
     *     summary="Remove user from a team",
     *     description="Removes a user from a specific team by deleting the association in the TeamsUsers table.",
     *     tags={"Teams"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"userId","teamId"},
     *             @OA\Property(property="userId", type="integer", example=1, description="ID of the user to remove"),
     *             @OA\Property(property="teamId", type="integer", example=2, description="ID of the team to remove the user from")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User successfully removed from the team",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="user removed from the intended team")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input data",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Validation error message")
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
    public function destroy(Request $request)
    {
        try {
            TeamsUsers::where([
                'T_UserId' => $request->get('userId'),
                'T_TeamId' => $request->get('teamId')
            ])->delete();

            return response()->json([
                'code' => 'success',
                'message' => 'user removed from the intended team'
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

}
