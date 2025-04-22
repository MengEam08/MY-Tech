<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class adminAuthController extends Controller
{
    public function authenticate(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ],400);
        }
        if(Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
            $user = User::find(Auth::user()->id);
            if($user->role == 'admin'){
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' => $user->id,
                    'name' => $user->name
                ],200);
            }else{
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authrized to access admin panel.'
                ],401);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Either email/password is inconrrect.'
            ],401);
        }

    }
}
