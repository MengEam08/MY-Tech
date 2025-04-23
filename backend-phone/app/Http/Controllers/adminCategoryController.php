<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class adminCategoryController extends Controller
{
    // Return all categories
    public function index()
    {
        $categories = Category::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories,
        ]);
    }

    // Store a new category
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required' 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 201,
            'message' => 'Category created successfully!',
            'data' => $category
        ]);
    }

    // Return a single category by ID
    public function show($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $category
        ]);
    }

    // Update a single category
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.',
                'data' => []
            ], 404);
        }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                // 'status' => 'required|in:active,inactive'
            ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category updated successfully!',
            'data' => $category
        ]);
    }

    // Destroy (delete) a single category
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully!'
        ]);
    }
}
