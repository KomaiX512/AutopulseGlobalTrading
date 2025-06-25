<?php

namespace App\Http\Controllers;

use App\Models\UserReviews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserReviewsController extends Controller
{

    public function index()
    {

        try {

            $reviews = UserReviews::all();
            if ($reviews) {

                return response()->json(['success' => true, 'data' => $reviews]);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'failed to get reviews', 'error' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        try {

            $user = Auth::user();

            if ($user) {

                $review = new UserReviews();
                $review->review_text = $request->input('review_text');
                $review->user_name = $request->input('user_name');
                $review->user_email = $request->input('user_email');
                $review->country = $request->input('country');
                $review->rating = $request->input('rating');
                $review->review_date = $request->input('review_date');
                $review->save();

                return response()->json(['success' => true, 'message' => 'Category created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, )
    {
        try {

            $user = Auth::user();

            if ($user) {

                $review = UserReviews::findOrFail($request->input('id'));

                if ($review) {

                    $review->review_text = $request->input('review_text');
                    $review->user_name = $request->input('user_name');
                    $review->user_email = $request->input('user_email');
                    $review->country = $request->input('country');
                    $review->rating = $request->input('rating');
                    $review->review_date = $request->input('review_date');
                    $review->save();

                    return response()->json(['success' => true, 'message' => 'Review created successfully'], 200);
                }

                return response()->json(['success' => false, 'message' => 'Review not found'], 404);

            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to save review', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $review = UserReviews::findOrFail($id);

            if ($review) {

                $review->delete();

                return response()->json(['message' => 'review deleted successfully.'], 200);
            }

            return response()->json(['error' => 'review not found'], 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
    }
}
