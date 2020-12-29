<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Facade\FlareClient\Http\Response;
use GuzzleHttp\Client;
use App\Events\TestBroadcastingEvent;
use App\Events\H2pDepositCallbackEvent;

class UserController extends Controller
{
    public function login(Request $request)
    {


        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => '暂无该用户'
            ], 412);
        }
        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'status' => 200,
            'data' => [
                'user' => $user,
                'token' => $token
            ]

        ];

        return response($response, 200);
    }

    public function test()
    {
        //  $data = ['state' => '200', 'message' => 'dsadasd'];

        $user = User::find(1);

        event(new H2pDepositCallbackEvent($user));
        // $data = [
        //     'channel' => 'service',
        //     'name' => 'hello',
        //     'data' => [
        //         "status" => 200,
        //         "message" => 'hello'
        //     ]
        // ];
        // $appId = 'test-service';
        // $key = '1e1398f9dcaf72e6c4dc471f231b27e6';
        // $httpUrl = "http://localhost:6001/apps/" . $appId . '/events?auth_key=' . $key;
        // // dump($httpUrl);
        // $client = new Client([
        //     'base_url' => $httpUrl,
        //     'timeout' => 1.0,
        // ]);
        // $response  = $client->post($httpUrl, [
        //     'json' => $data
        // ]);
        // $code = $response->getStatusCode();
        // dump($response);
    }
}
