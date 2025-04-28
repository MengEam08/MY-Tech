<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class frontAccountController extends Controller
{
    public function register(Request $request)
{
    $rules = [
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required',
    ];

    $validator = Validator::make($request->all(), $rules);

    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'error' => $validator->errors()
        ], 400);
    }

    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->role = 'customer';
    $user->save();

    return response()->json([
        'status' => 200,
        'message' => 'You have registered successfully.'
    ], 200);
}


public function authenticate(Request $request)
{
    // Validate the email and password fields
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required'
    ]);

    // If validation fails
    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'error' => $validator->errors()
        ], 400);
    }

    // If authentication attempt is successful
    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        $user = Auth::user(); // Get authenticated user
        $token = $user->createToken('token')->plainTextToken; // Create token

        return response()->json([
            'status' => 200,
            'token' => $token,
            'id' => $user->id,
            'name' => $user->name
        ], 200);
    }

    // If credentials are incorrect
    return response()->json([
        'status' => 401,
        'message' => 'Either email/password is incorrect.'
    ], 401);
}


    
    

}
