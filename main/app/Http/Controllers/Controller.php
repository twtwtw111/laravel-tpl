<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function success($code = '', $message = "", $data = [])
    {
        return response()->json([

            'code' => $code,
            'message' => $message,
            'data' => $data,
        ]);
    }

    public function fail($code, $errMsg = "", $data = [])
    {
        return response()->json([

            'code' => $code,
            'message' => $errMsg,
            'data' => $data,
        ]);
    }
}
