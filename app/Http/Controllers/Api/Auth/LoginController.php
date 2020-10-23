<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * @api {post} /api/v1/auth/login 1. Getting token
     * @apiVersion 1.0.0
     * @apiName AuthLogin
     * @apiGroup 01.Auth
     *
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     *
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['message' => trans('auth.unauthorized')], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * @api {post} /api/v1/auth/logout 2. Log the user out (Invalidate the token).
     * @apiVersion 1.0.0
     * @apiName Logout
     * @apiGroup 01.Auth
     *
     * @return Response
     *
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => trans('auth.logout')]);
    }

    /**
     * @api {post} /api/v1/auth/refresh 3. Refresh a token.
     * @apiVersion 1.0.0
     * @apiName Refresh token
     * @apiGroup 01.Auth
     *
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return Response
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60*24*7,
            'user' => auth()->user()
        ]);
    }
}
