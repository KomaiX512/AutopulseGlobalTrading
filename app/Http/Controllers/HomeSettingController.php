<?php

namespace App\Http\Controllers;

use App\Models\HomeSetting;
use App\Models\ProductReview;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class HomeSettingController extends Controller
{

    public function getHomeSettings()
    {

        try {

            $settings = HomeSetting::find(1);

            if ($settings) {

                return response()->json(['success' => true, 'data' => $settings ?? []]);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'failed to get reviews', 'error' => $e->getMessage()], 500);
        }
    }

    public function getSlides($view)
    {

        try {

            $slides = Slider::where('view_type', $view)->get();

            if ($slides) {

                return response()->json(['success' => true, 'data' => $slides]);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'failed to get reviews', 'error' => $e->getMessage()], 500);
        }
    }

    public function storeSlides(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user) {
                $slide = new Slider();
                $slide->url = $request->input('url');
                $slide->view_type = $request->input('view_type');

                $slide->image = ($request->hasFile('image')) ? $request->file('image')->store('public/images/slides') : '';

                $slide->save();

                return response()->json(['success' => true, 'message' => 'Slides created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to slides category', 'error' => $e->getMessage()], 500);
        }
    }
    public function saveContactHTML(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user) {
                $setting = HomeSetting::find(1) ?? new HomeSetting();
                $setting->contact_us_html = $request->input('contact_us_html');
                $setting->save();

                return response()->json(['success' => true, 'message' => 'Slides created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to slides category', 'error' => $e->getMessage()], 500);
        }
    }

    public function saveAboutHTML(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user) {

                $setting = HomeSetting::find(1) ?? new HomeSetting();
                $setting->about_us_html = $request->input('about_us_html');

                $setting->save();

                return response()->json(['success' => true, 'message' => 'Slides created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to slides category', 'error' => $e->getMessage()], 500);
        }
    }


    public function updateSlides(Request $request, $id)
    {
        try {

            $user = Auth::user();

            if ($user) {

                $slide = ProductReview::find($id);

                if ($slide) {

                    $slide->url = $request->input('url');
                    $slide->view_type = $request->input('view_type');

                    if ($request->hasFile('image')) {

                        if ($slide->image) {

                            Storage::delete($slide->image);
                        }

                        $slide->image = $request->file('image')->store('public/images/slides');
                    }

                    $slide->save();
                }

                return response()->json(['success' => true, 'message' => 'Slides created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to create slide', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroySlides($id)
    {
        try {

            $slide = Slider::findOrFail($id);

            if ($slide) {

                $slide->delete();

                return response()->json(['message' => 'slide deleted successfully.'], 200);
            }

            return response()->json(['error' => 'slide not found'], 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
    }
}
