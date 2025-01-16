<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="User registration",
     *     description="Register a new user and return user details with token.",
     *     operationId="registerUser",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "lastName", "email", "password"},
     *             @OA\Property(property="name", type="string", example="Mostafa"),
     *             @OA\Property(property="lastName", type="string", example="Rahmati"),
     *             @OA\Property(property="email", type="string", format="email", example="mm.rahmati94@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Isna1994")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful registration",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=2),
     *                 @OA\Property(property="name", type="string", example="Mostafa"),
     *                 @OA\Property(property="lastName", type="string", example="Rahmati"),
     *                 @OA\Property(property="email", type="string", example="mm.rahmati94@gmail.com")
     *             ),
     *             @OA\Property(property="token", type="string", example="eyJhbGciOiJIUzI1NiJ9.newUserToken")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Validation failed")
     *         )
     *     )
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:64',
            'lastName' => 'required|string|max:64',
            'email' => 'required|string|email|max:64|unique:Users,U_Email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'U_Name' => $request->get('name'),
            'U_LastName' => $request->get('lastName'),
            'U_Email' => $request->get('email'),
            'U_Password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ], 201);
    }

    /**
     * @OA\Info(
     *     title="WorkHive API",
     *     version="1.0.0",
     *     description="API documentation for WorkHive application."
     * ),
     * @OA\Post(
     *     path="/api/login",
     *     summary="User login",
     *     description="Authenticate user and return user details with token.",
     *     operationId="loginUser",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="mm.rahmati94@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="12345safas@")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful login",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Mostafa"),
     *                 @OA\Property(property="lastName", type="string", example="Rahmati"),
     *                 @OA\Property(property="email", type="string", example="mm.rahmati94@gmail.com"),
     *                 @OA\Property(property="password", type="string", example="$2y$12$syetgnrt0oyYWs90V9h11OlwwI72OdbzHIZPn43pJBdz912QRBCUm"),
     *                 @OA\Property(property="profileImg", type="string", nullable=true, example="http://base.com/route/1212.png"),
     *             ),
     *             @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd29ya2hpdmUubG9jYWwvYXBpL2xvZ2luIiwiaWF0IjoxNzM2ODY3NTQyLCJleHAiOjE3MzY4NzExNDIsIm5iZiI6MTczNjg2NzU0MiwianRpIjoidldVcDBTanNERDltQ1ladiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.zoZ7zoUX4sWIasOPthPhF0UVvsCt-iq4lWYo8buQB3c")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors(), 401);

        $user = User::where('U_Email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->U_Password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ], 201);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * @OA\Post(
     *     path="/password/reset",
     *     summary="Reset user's password",
     *     description="Resets the user's password and returns a new JWT token.",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id","currentPassword","password"},
     *             @OA\Property(property="id", type="integer", example=1, description="User ID"),
     *             @OA\Property(property="currentPassword", type="string", example="oldPass123", description="Current password"),
     *             @OA\Property(property="password", type="string", example="newPass456", description="New password (min 6 characters)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Password reset successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="user"),
     *             @OA\Property(property="token", type="string", example="jwt.token.here")
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
    public function reset(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|int|min:1',
                'currentPassword' => 'required|string|min:3',
                'password' => 'required|string|min:6'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::where([
                'U_Id' => $request->id,
                'U_Password' => Hash::make($request->get('currentPassword'))
            ]);

            if (!$user)
                return response()->json([
                    'message' => 'Invalid Credentials',
                    'code' => 'error'
                ], 403);

            $user->update([
                'U_Password' => Hash::make($request->get('password'))
            ]);

            $user = User::find($request->id);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'user' => new UserResource($user),
                'token' => $token
            ], 204);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
