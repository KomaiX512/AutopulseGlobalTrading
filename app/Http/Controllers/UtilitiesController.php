<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\User;
use App\Models\Utilities;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UtilitiesController extends Controller
{
    /**
     * Display the checkout step.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $userId = Auth::id();
            $utility = Utilities::where('user_id', $userId)->first();

            if ($utility) {
                return response()->json([
                    'success' => true,
                    'checkout_step' => $utility->checkout_step
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No utility found for this user'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while retrieving the checkout step',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the checkout step.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'checkout_step' => 'required|integer',
        ]);

        try {
            $userId = Auth::id();
            $utility = Utilities::where('user_id', $userId)->first();

            if ($utility) {
                $utility->checkout_step = $request->checkout_step;
                $utility->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Checkout step updated successfully'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No utility found for this user'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the checkout step',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function updateOrderStatus(Request $request)
    {

        try {

            $new_status = intval($request->input('status'));
            $order_id = $request->input('order_id');

            $order = Order::find($order_id);

            if ($order) {

                $current_order_status = OrderStatus::where('order_id', $order_id)->first();

                if ($current_order_status) {

                    $order->status = $new_status;
                    $current_order_status->status = $new_status;
                    $order->save();
                    $current_order_status->save();

                    return response()->json([
                        'success' => true,
                        'message' => 'update order status',
                    ], 200);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found, try again',
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadFile(Request $request)
    {
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('public/images/blogs');

            $url = Storage::url($path);

            return response()->json([
                'url' => $url
            ]);
        }
        return response()->json([
            'error' => 'No file uploaded'
        ], 400);
    }
}
