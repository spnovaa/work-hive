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
