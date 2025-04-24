<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class adminTempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        // Get image file
        $image = $request->file('image');
        $image_name = time() . '.' . $image->getClientOriginalExtension();

        
        $image->move(public_path('uploads/temp'), $image_name);

        // Save to database
        $tempImage = new TempImage();
        $tempImage->name = $image_name; // Save actual file name
        $tempImage->save();

        //save image thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/' . $image_name));
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumb/' . $image_name));

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'data' => $tempImage
        ], 200);
    }
}
