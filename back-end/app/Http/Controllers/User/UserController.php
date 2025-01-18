<?php

namespace App\Http\Controllers\User;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Update user information",
     *     description="Updates the specified user's name, last name, and email.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","lastName","email"},
     *             @OA\Property(property="name", type="string", example="John", description="First name (2-64 characters)"),
     *             @OA\Property(property="lastName", type="string", example="Doe", description="Last name (max 64 characters)"),
     *             @OA\Property(property="email", type="string", format="email", example="john.doe@example.com", description="Unique email address (max 64 characters)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="user")
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
    public function update(Request $request, int $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:2|max:64',
                'lastName' => 'required|string|max:64',
                'email' => "required|string|email|max:64|unique:Users,U_Email,$id",
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::where('U_Id', $id)->update([
                'U_Name' => $request->get('name'),
                'U_LastName' => $request->get('lastName'),
                'U_Email' => $request->get('email'),
            ]);

            return response()->json([
                'user' => new UserResource($user),
            ], 204);
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }


    /**
     * @OA\Schema(
     *     schema="UserResource",
     *     type="object",
     *     title="UserResource",
     *     description="Resource representation of a user",
     *     @OA\Property(
     *         property="id",
     *         type="integer",
     *         description="ID of the user",
     *         example=1
     *     ),
     *     @OA\Property(
     *         property="email",
     *         type="string",
     *         description="Email address of the user",
     *         example="user@example.com"
     *     ),
     *     @OA\Property(
     *         property="name",
     *         type="string",
     *         description="First name of the user",
     *         example="John"
     *     ),
     *     @OA\Property(
     *         property="lastName",
     *         type="string",
     *         description="Last name of the user",
     *         example="Doe"
     *     ),
     *     @OA\Property(
     *         property="profileImage",
     *         type="string",
     *         description="URL of the user's profile image. Returns null if no profile image is set.",
     *         example="https://work-hive.liara.run/public/user_profiles/user.jpg",
     *         nullable=true
     *     )
     * ),
     *
     * @OA\Get(
     *     path="/api/users",
     *     operationId="getAllUsers",
     *     tags={"Users"},
     *     summary="Get all users",
     *     description="Fetches all users from the database.",
     *     @OA\Response(
     *         response=200,
     *         description="Users retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     ref="#/components/schemas/UserResource"
     *                 )
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
    public function index()
    {
        try {
            return response()->json(UserResource::collection(User::all()));
        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ]);
        }
    }

}
