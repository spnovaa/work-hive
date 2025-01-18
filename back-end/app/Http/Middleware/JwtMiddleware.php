<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        if (!($this->isAuth($request) || $this->isDoc($request)))
            try {
                $user = JWTAuth::parseToken()->authenticate();
            } catch (JWTException $e) {
                return response()->json(['error' => 'Token not valid'], 401);
            }

        return $next($request);
    }

    private function isAuth($request)
    {
        return in_array($request->url(), [
            env('APP_URL') . '/api/register',
            env('APP_URL'),
            env('APP_URL') . '/api/login',
        ]);
    }

    private function isDoc($request)
    {
        $arr = explode('/', $request->url());
        return count($arr) > 3 && (in_array($arr[3], ['docs', 'storage', 'public', 'profile_images']));
    }
}
