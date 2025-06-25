<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FAQController extends Controller
{


    public function index()
    {

        try {

            $faqs = FAQ::all();
            if ($faqs) {

                return response()->json(['success' => true, 'data' => $faqs]);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'failed to get faqs', 'error' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        try {

            $user = Auth::user();

            if ($user) {

                $faq = new FAQ();
                $faq->question = $request->input('question');
                $faq->answer = $request->input('answer');
                $faq->description = $request->input('description') ?? '';
                $faq->save();

                return response()->json(['success' => true, 'message' => 'Category created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request,)
    {
        try {

            $user = Auth::user();

            if ($user) {

                $faq = FAQ::findOrFail($request->input('id'));

                if ($faq) {

                    $faq->question = $request->input('question');
                    $faq->answer = $request->input('answer');
                    $faq->description = $request->input('description') ?? '';
                    $faq->save();
    

                    return response()->json(['success' => true, 'message' => 'faq created successfully'], 200);
                }

                return response()->json(['success' => false, 'message' => 'faq not found'], 404);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to save faq', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $faq = FAQ::findOrFail($id);

            if ($faq) {

                $faq->delete();

                return response()->json(['message' => 'faq deleted successfully.'], 200);
            }

            return response()->json(['error' => 'faq not found'], 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
    }
}
