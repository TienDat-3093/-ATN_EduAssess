<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\UsersRequest;
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
class ApiUsersController extends Controller
{


    public function resetPassword(Request $request)
    {
        $email = $request->input('email');
        $user = Users::where('email', $email)->first();

        if ($user) {

            $newPassword = Str::random(10);
            $user->password = Hash::make($newPassword);

            $user->save();
            /* return response()->json(['message' => $user->displayname]); */
            Mail::to($user->email)->send(new PasswordResetMail($user, $newPassword));


            return response()->json(['message' => 'A new password has been sent to your email.']);
        }
        return response()->json(['message' => 'Email not found.']);

    }
    public function register(Request $request)
    {
        $formData = $request->all();
        $data = $formData['formData'];


        $user = new Users();
        $user->displayname = $data['displayname'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->date_of_birth = $data['date_of_birth'];
        $user->status = 1;
        $user->admin_role = 0;



        /* if (request()->hasFile('avatar')) {
            $file = request()->file('avatar');
            $fileName = now()->format('YmdHis') . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('img/users', $fileName);
            $user->image = $path;
        } */

        $user->save();
        return response()->json(['message' => 'Register successful']);
    }


    public function login()
    {

        $credentials = request(['email', 'password']);

        $user = Users::where('email', $credentials['email'])->first();

        if (!$user || $user->status != 1 || $user->admin_role !== 0) {
            return response()->json(['error' => 'Unauthorized - User is inactive'], 401);
        }
        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized - Invalid credentials'], 401);
        }

        /* Cache::put('api_token_' . auth('api')->user()->id, $token, 1440); */
        //Cache khong het han
        Cache::forever('api_token_' . auth('api')->user()->id, $token);

        return $this->respondWithToken($token);
    }

    public function editAccount(Request $request)
    {
        $formData = $request->all();
        $data = $formData['formData'];

        $user = auth()->user();
        $user->displayname = $data["displayName"];
        $user->date_of_birth = $data["birthDay"];
        if (isset($data["image"])) {
            if (is_uploaded_file($data["image"])) {
                $file = $data["image"];
                $fileName = now()->format('YmdHis') . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('img/users', $fileName);
            } else {
                $path = $data["image"];
            }

        }
        if(!empty($path))
        {
            $dataToUpdate = [
                'image' => $path,
                'displayname' => $data["displayName"],
                'date_of_birth' => $data["birthDay"]
            ];
        }
        else{
            $dataToUpdate = [
                'image' => null,
                'displayname' => $data["displayName"],
                'date_of_birth' => $data["birthDay"]
            ];
        }

        $user->update($dataToUpdate);

        return response()->json([
            'success' => true,
            'message' => "Account updated successfully",

        ]);
    }
    public function editPassword(Request $request)
    {
        $formData = $request->all();
        $data = $formData['formData'];
        $user = auth()->user();
        if (Hash::check($data['currentPassword'], $user->password)) {
            $user->update([
                'password' => Hash::make($data['newPassword']),
            ]);
            return response()->json([
                'success' => true,
                'message' => "Updated password successfully",

            ]);
        }
        return response()->json([
            'success' => false,
            'message' => "Wrong password",

        ]);
    }


    public function profile()
    {
        return response()->json(Auth::guard('api')->user());
    }


    /* public function logout()
    {
        $user = auth('api')->user();

        if ($user) {

            Cache::forget('api_token_' . $user->id);

            Auth::guard('api')->logout();


            $isLogout = !Auth::guard('api')->check();

            if ($isLogout) {
                return response()->json(['message' => 'Successfully logged out'], 200);
            } else {
                return response()->json(['message' => 'Logged out but user is still logged in'], 500);
            }
        } else {
            return response()->json(['message' => 'No user is currently logged in'], 400);
        }
    } */
    public function logout()
    {
        try {
            $user = auth('api')->user();

            if ($user) {
                // Log user details


                // Invalidate the token
                Cache::forget('api_token_' . $user->id);
                JWTAuth::invalidate(JWTAuth::getToken());

                return response()->json(['message' => 'Successfully logged out'], 200);
            }
        } catch (\Exception $e) {

            return response()->json(['message' => 'An error occurred during logout'], 500);
        }
    }


    public function refresh()
    {

        return $this->respondWithToken(auth()->refresh());
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 3600
        ]);
    }
}
