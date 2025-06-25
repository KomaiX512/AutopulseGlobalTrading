<?php

namespace App\Http\Controllers;

use App\Models\Order;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function orders(Request $request, $id = null)
    {
        $perPage = $request->input('per_page', 10); // Default per page limit
        $page = $request->input('page', 1); // Default page number
        $search = $request->input('search'); // Search keyword
        $status = $request->input('status'); // Order status
        $price = $request->input('price'); // Price order (highToLow or lowToHigh)
        $sortOrder = $request->input('sort_order', 'asc'); // Sort order (asc or desc)



        if ($id) {

            $user_with_order = Order::with('user.userDetails')->with('status')->with('orderDetails.product')->with('shippingAddress')->with('transaction')->where('id', $id)->first();
            return ['success' => true, 'data' => $user_with_order];
        }

        // Query orders with filters
        $query = Order::query();

        // Include user details in the query
        $query->with('user.userDetails');

        // Include count of order details
        $query->withCount('orderDetails');

        // Apply filters
        if ($search) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%$search%");
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        if ($price && in_array($price, ['highToLow', 'lowToHigh'])) {
            $query->orderBy('total_amount', $price == 'highToLow' ? 'desc' : 'asc');
        }

        // Apply sort order
        $query->orderBy('id', $sortOrder);

        // Paginate results
        $orders = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json($orders);
    }
}
