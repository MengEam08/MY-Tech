<?php

namespace App\Http\Controllers;

use App\Models\Storage;
use Illuminate\Http\Request;

class adminStorageController extends Controller
{
    public function index(){
        $storages = Storage::orderBy('name','ASC')->get(); 
        return response()->json([
            'status'=>200,
            'data'=>$storages
        ],200);
    }
}
