<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {


        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            // return response([
            //     'message' => '暂无该用户'
            // ], 412);
            return  $this->fail(412, '暂无该用户');
        }
        $token = $user->createToken('admin-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return $this->success(200, '登录成功', $response);
    }
}
