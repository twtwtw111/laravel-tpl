<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;

use Facade\FlareClient\Http\Response;
use GuzzleHttp\Client;
use App\Events\TestBroadcastingEvent;
use App\Events\H2pDepositCallbackEvent;
use App\Events\Test;
use App\Models\User;

class UserController extends Controller
{


    public function test()
    {
        //  $data = ['state' => '200', 'message' => 'dsadasd'];

        $user = User::find(1);

        // event(new H2pDepositCallbackEvent($user));
        event(new TestBroadcastingEvent());
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

    public function userlist(Request $request)
    {
        //return $request->user();
        $list  = User::get();
        // event(new H2pDepositCallbackEvent($request->user()));

        event(new TestBroadcastingEvent());
        // dump($list);
        // Auth::guard('api')->user();
        // dump(Auth::guard('api')->user());
        // dump(auth('api')->user());
        return $this->success('200', '查询成功', $list);
    }
}
