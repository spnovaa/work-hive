<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserProfileImageController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/users/{userId}/profile-image",
     *     summary="Upload or update a user's profile image",
     *     description="Uploads a profile image for the specified user and stores the file in the server. The stored image can be accessed via the provided URL.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="ID of the user uploading the profile image",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Profile image file to upload",
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"profile_image"},
     *                 @OA\Property(
     *                     property="profile_image",
     *                     type="string",
     *                     format="binary",
     *                     description="Image file (jpeg, png, jpg, gif)"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile image uploaded successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Profile image uploaded successfully"),
     *             @OA\Property(property="profile_image", type="string", example="https://work-hive.liara.run/storage/profile_images/1673879834_605f9d4c8e9e9.jpg", description="Public URL to access the uploaded profile image")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid file upload or validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Validation error message")
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
    public function store(Request $request, int $userId)
    {
        try {
            // Validate the image file
            $validator = Validator::make($request->all(), [
                'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048' // Max 2MB
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::find($userId);
            if (!$user) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

                $file->storeAs('public/profile_images', $filename);

                if ($user->U_ProfileImg && Storage::exists('public/profile_images/' . $user->U_ProfileImg)) {
                    Storage::delete('public/profile_images/' . $user->U_ProfileImg);
                }

                $user->update([
                    'U_ProfileImg' => $filename
                ]);
            }

            return response()->json([
                'code' => 'success',
                'message' => 'Profile image uploaded successfully',
                'profile_image' => asset('storage/profile_images/' . $user->U_ProfileImg)
            ], 200);

        } catch (\Throwable $throwable) {
            dd($throwable);
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/users/{userId}/profile-image",
     *     summary="Update a user's profile image",
     *     description="Replaces the existing profile image of a user with a new one. Deletes the old image and uploads the new image.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="ID of the user whose profile image will be updated",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="New profile image file to upload",
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"profile_image"},
     *                 @OA\Property(
     *                     property="profile_image",
     *                     type="string",
     *                     format="binary",
     *                     description="Image file (jpeg, png, jpg, gif)"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile image updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Profile image updated successfully"),
     *             @OA\Property(property="profile_image", type="string", example="http://your-app-domain/storage/profile_images/1673879834_605f9d4c8e9e9.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid file upload or validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Validation error message")
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
    public function update(Request $request, int $userId)
    {
        try {
            // Validate the image file
            $validator = Validator::make($request->all(), [
                'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048' // Max 2MB
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            // Find the user
            $user = User::find($userId);
            if (!$user) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            // Delete old profile image if exists
            if ($user->U_ProfileImg && Storage::exists('public/profile_images/' . $user->U_ProfileImg)) {
                Storage::delete('public/profile_images/' . $user->U_ProfileImg);
            }

            // Store the new profile image
            $file = $request->file('profile_image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/profile_images', $filename);

            // Update the user's profile image in the database
            $user->update([
                'U_ProfileImg' => $filename
            ]);

            return response()->json([
                'code' => 'success',
                'message' => 'Profile image updated successfully',
                'profile_image' => asset('storage/profile_images/' . $user->U_ProfileImg)
            ], 200);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{userId}/profile-image",
     *     summary="Delete a user's profile image",
     *     description="Deletes the profile image of a user from the server and removes the image reference from the database.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="ID of the user whose profile image will be deleted",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile image deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Profile image deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found or no profile image exists",
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="User not found or no profile image to delete")
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
    public function destroy(int $userId)
    {
        try {
            // Find the user
            $user = User::find($userId);
            if (!$user) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            // Delete the profile image if it exists
            if ($user->U_ProfileImg && Storage::exists('public/profile_images/' . $user->U_ProfileImg)) {
                Storage::delete('public/profile_images/' . $user->U_ProfileImg);

                // Remove the image reference from the database
                $user->update([
                    'U_ProfileImg' => null
                ]);

                return response()->json([
                    'code' => 'success',
                    'message' => 'Profile image deleted successfully'
                ], 200);
            }

            return response()->json([
                'code' => 'error',
                'message' => 'No profile image to delete'
            ], 404);

        } catch (\Throwable $throwable) {
            return response()->json([
                'code' => 'error',
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

}
