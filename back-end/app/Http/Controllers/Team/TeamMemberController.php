<?php

namespace App\Http\Controllers\Team;

use App\Http\Resources\Team\TeamShowResource;
use App\Models\Team\Team;
use Illuminate\Routing\Controller;

class TeamMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     *
     * @OA\Get(
     *     path="/api/user/teams",
     *     summary="Get all teams",
     *     description="Retrieve a list of all teams.",
     *     operationId="getTeams",
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
        //return a list of teams that the user is member of.
        try {
            $teams = auth()->user()->teams;
            return response()->json(TeamShowResource::collection($teams));
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ]);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/user/teams/{id}",
     *     summary="Get a team by ID",
     *     description="Retrieve a specific team by its ID.",
     *     operationId="getMemberTeamById",
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
            $teams = auth()->user()->teams()->where('T_Id', $id)->first();
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
}
