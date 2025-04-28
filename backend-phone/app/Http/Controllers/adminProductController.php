<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Log;

class adminProductController extends Controller
{
    //Return all products
    public function index(){
        $products = Product::orderBy('created_at', 'DESC')
                    ->with('product_images')
                    ->get();
        return response()->json([
            'status'=>200,
            'data'=>$products
        ],200);

    }

    // store a new product
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|exists:category,id',
            'brand' => 'required|exists:brands,id',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required|in:0,1',
            'gallery.*' => 'nullable|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured ?? 'no';
        $product->barcode = $request->barcode;
        $product->save();

        // Save image product
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempimageId) {
                $tempImage = TempImage::find($tempimageId);

                if ($tempImage) {
                    //large
                    $extArray = explode('.', $tempImage->name);
                    $ext = end($extArray);
                    $imageName = $product->id . '.' . time() . '.' . $ext;

                    $manager = new ImageManager(Driver::class);
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->scaleDown(1200);
                    $img->save(public_path('uploads/products/large/' . $imageName));
                    //small
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->coverDown(400, 460);
                    $img->save(public_path('uploads/products/small/' . $imageName));

                    $productImage = new ProductImage();
                    $productImage->image = $imageName;
                    $productImage->product_id = $product->id;
                    $productImage->save();

                    // Save first image as main product image
                    if ($key == 0) {
                        $product->image = $imageName;
                        $product->save();
                    }

                    // Optionally: Delete temp image after use
                    // unlink(public_path('uploads/temp/' . $tempImage->name));
                    // $tempImage->delete();
                }
            }
    }

    return response()->json([
        'status' => 200,
        'message' => 'Product has been created successfully'
    ], 200);
}



    //Return a single product     
    public function show($id){
        $product =  Product::with('product_images')
                ->find($id);
        if($product == null){
            return response()->json([
                'status' => 400,
                'message' => 'Product not found'
            ],400);
        }
        return response()->json([
            'status'=>200,
            'data'=>$product
        ],200);
    }

    //Update a  product
    public function update(Request $request, $id){
        $product =  Product::find($id);
        if($product == null){
            return response()->json([
                'status' => 400,
                'message' => 'Product not found'
            ],400);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku,' . $id,
            'is_featured' => 'required',
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        //update product
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured ?? 'no';
        $product->barcode = $request->barcode;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product has been updated successfully'
        ], 200);
    }

    //delete a product
    public function destroy($id){
        $product =  Product::with('product_images')->find($id);
        if($product == null){
            return response()->json([
                'status' => 400,
                'message' => 'Product not found'
            ],400);
            $product->delete();
            if($product->product_images()){
                foreach($product->product_image()  as $productImage){
                    File::delete(public_path('uploads/products/large/'.$productImage->image));
                    File::delete(public_path('uploads/products/small/'.$productImage->image));
                }
            }
        }
        $product->delete();

        return response()->json([
            'status'=>200,
            'message' => 'Product has been deleted successfully'
        ],200);
    }
    
    public function saveProductImage(Request $request)
    {
        // Validate the image file for multiple formats
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048' // Accepts jpeg, png, jpg, gif files
        ]);

        // If validation fails, return error
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        // Get the image file from the request
        $image = $request->file('image');
        $image_name = $request->product_id . '-' . time() . '.' . $image->getClientOriginalExtension(); // Dynamic name for the image

        try {
            // Use ImageManager to handle the image
            $manager = new ImageManager(Driver::class);

            // Process the large image
            $img = $manager->read($image->getPathname());
            $img->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio(); // Maintain aspect ratio for resizing
            });
            $img->save(public_path('uploads/products/large/' . $image_name)); // Save large image

            // Process the small image
            $img = $manager->read($image->getPathname());
            $img->resize(400, 460); // Resize small image
            $img->save(public_path('uploads/products/small/' . $image_name)); // Save small image

            // Save the image data to the database
            $productImage = new ProductImage();
            $productImage->image = $image_name;
            $productImage->product_id = $request->product_id;
            $productImage->save(); // Save the product image record

            return response()->json([
                'status' => 200,
                'message' => 'Image uploaded successfully',
                'data' => $productImage
            ], 200);

        } catch (\Exception $e) {
            // Log the error if image processing fails
            Log::error('Error uploading image: ' . $e->getMessage()); // Use Log facade

            return response()->json([
                'status' => 500,
                'error' => 'Image decoding failed: ' . $e->getMessage()
            ], 500);
        }
    }
//     public function saveProductImage(Request $request)
// {
//     // Validate the image file for multiple formats
//     $validator = Validator::make($request->all(), [
//         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048' // Accepts jpeg, png, jpg, gif files
//     ]);

//     // If validation fails, return error
//     if ($validator->fails()) {
//         return response()->json([
//             'status' => 400,
//             'error' => $validator->errors()
//         ], 400);
//     }

//     // Get the image file from the request
//     $image = $request->file('image');
//     $image_name = $request->product_id . '-' . time() . '.' . $image->getClientOriginalExtension(); // Dynamic name for the image

//     try {
//         // Use ImageManager to handle the image
//         $manager = new ImageManager(Driver::class);

//         // Process the large image
//         $img = $manager->read($image->getPathname());
//         $img->resize(1200, null, function ($constraint) {
//             $constraint->aspectRatio(); // Maintain aspect ratio for resizing
//         });
//         $img->save(public_path('uploads/products/large/' . $image_name)); // Save large image

//         // Process the small image
//         $img = $manager->read($image->getPathname());
//         $img->resize(400, 460); // Resize small image
//         $img->save(public_path('uploads/products/small/' . $image_name)); // Save small image

//         // Save the image data to the database
//         $productImage = new ProductImage();
//         $productImage->image = $image_name;
//         $productImage->product_id = $request->product_id;
//         $productImage->save(); // Save the product image record

//         return response()->json([
//             'status' => 200,
//             'message' => 'Image uploaded successfully',
//             'data' => $productImage
//         ], 200);

//     } catch (\Exception $e) {
//         // Log the error if image processing fails
        

//         return response()->json([
//             'status' => 500,
//             'error' => 'Image decoding failed: ' . $e->getMessage()
//         ], 500);
//     }
// }

    public function deleteProductImage ($id){
       $productImage= ProductImage::find($id);
       if($productImage==null){
        return response()->json([
            'status'=>400,
            'message'=>'imagenot found'
        ],00);
       }
       File::delete(public_path('uploads/products/large/'.$productImage->image));
       File::delete(public_path('uploads/products/small/'.$productImage->image));

       $productImage->delete();
       return response()->json([
        'status'=>200,
        'message'=>'product image delete successfully.'
       ],200);
    }

}
