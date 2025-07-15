<?php

namespace App\Http\Controllers;

use App\Models\HomeSetting;
use App\Models\ProductReview;
use App\Models\Slider;
use App\Services\RobustImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HomeSettingController extends Controller
{
    protected $robustImageService;

    public function __construct(RobustImageService $robustImageService)
    {
        $this->robustImageService = $robustImageService;
    }

    public function getHomeSettings()
    {
        try {
            $settings = HomeSetting::find(1);

            if ($settings) {
                return response()->json(['success' => true, 'data' => $settings ?? []]);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'failed to get settings', 'error' => $e->getMessage()], 500);
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
            return response()->json(['success' => false, 'message' => 'failed to get slides', 'error' => $e->getMessage()], 500);
        }
    }

    public function storeSlides(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'nullable|string|max:255',
            'view_type' => 'required|string|in:home_slider,about_slider,hero_banner',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

                $slide = new Slider();
            $slide->url = $request->input('url') ?? '#';
                $slide->view_type = $request->input('view_type');

                // Store overlay text in metadata
                $metadata = [
                    'title' => $request->input('title'),
                    'subtitle' => $request->input('subtitle'),
                    'description' => $request->input('description')
                ];
                $slide->metadata = json_encode($metadata);
                $slide->save();

            // Handle image with robust service
            if ($request->hasFile('image')) {
                $result = $this->robustImageService->storeImage(
                    $request->file('image'),
                    'slides',
                    $slide->id,
                    ['type' => 'slider', 'view_type' => $slide->view_type]
                );

                if ($result['success']) {
                    $slide->image = $result['path'];
                    $slide->save();
            } else {
                    // Rollback slide creation if image fails
                    $slide->delete();
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to store slide image: ' . $result['error']
                    ], 500);
                }
            }

            return response()->json(['success' => true, 'message' => 'Slide created successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create slide', 'error' => $e->getMessage()], 500);
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

                return response()->json(['success' => true, 'message' => 'Contact content saved successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Unauthorized User'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to save contact content', 'error' => $e->getMessage()], 500);
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

                return response()->json(['success' => true, 'message' => 'About content saved successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Unauthorized User'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to save about content', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateSlides(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'nullable|string|max:255',
            'view_type' => 'required|string|in:home_slider,about_slider,hero_banner',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

            $slide = Slider::findOrFail($id);
            $slide->url = $request->input('url') ?? '#';
                    $slide->view_type = $request->input('view_type');

                    // Update overlay text in metadata
                    $metadata = [
                        'title' => $request->input('title'),
                        'subtitle' => $request->input('subtitle'),
                        'description' => $request->input('description')
                    ];
                    $slide->metadata = json_encode($metadata);

            // Handle image update with robust service
                    if ($request->hasFile('image')) {
                $result = $this->robustImageService->updateImage(
                    $request->file('image'),
                    $slide->image,
                    'slides',
                    $slide->id,
                    ['type' => 'slider', 'view_type' => $slide->view_type]
                );

                if ($result['success']) {
                    $slide->image = $result['path'];
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to update slide image: ' . $result['error']
                    ], 500);
                }
            }

            $slide->save();

            return response()->json(['success' => true, 'message' => 'Slide updated successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update slide', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroySlides($id)
    {
        try {
            $slide = Slider::findOrFail($id);

            // Mark image as deleted in registry
            if ($slide->image) {
                \DB::table('image_registry')
                    ->where('path', $slide->image)
                    ->update([
                        'status' => 'deleted',
                        'updated_at' => now()
                    ]);
            }

                $slide->delete();
            return response()->json(['success' => true, 'message' => 'Slide deleted successfully.'], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
