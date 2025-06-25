<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;

class CartController extends Controller
{
    /**
     * Add a product to the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addToCart(Request $request)
    {



        try {


            $user = Auth::user();

            if (!$user) {

                return redirect()->route('/login');
            }


            $utility = Utilities::where('user_id', $user->id)->first();

            if (!$utility) {

                $utility = new Utilities();

                $utility->user_id = $user->id;
                $utility->checkout_step = 0;

                $utility->save();
            }

            $product_id = $request->input('product_id');

            $utility->checkout_step = 0;
            $utility->save();


            $cartItem = Cart::where('user_id', $user->id)
                ->where('product_id', $product_id)
                ->first();

            if ($cartItem) {

                $cartItem->quantity += 1;
                $cartItem->save();

            } else {
                // Otherwise, create a new cart item with quantity 1
                Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $product_id,
                    'quantity' => 1,
                ]);
            }

            return response()->json(['success' => true, 'message' => 'Product added to cart successfully.'], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => 'Failed to add product to cart.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Get the cart items for the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCartItems()
    {
        try {
            $user = Auth::user();
            $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

            $utility = Utilities::where('user_id', $user->id)->first();
            $checkoutStep = $utility ? $utility->checkout_step : null;

            return response()->json([
                'success' => true,
                'data' => [
                    'cartItems' => $cartItems,
                    'checkout_step' => $checkoutStep
                ],
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to retrieve cart items.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove an item from the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeFromCart(Request $request)
    {
        try {
            $user = Auth::user();
            $product_id = $request->input('product_id');

            $cartItem = Cart::where('user_id', $user->id)
                ->where('product_id', $product_id)
                ->first();

            if ($cartItem) {
                $cartItem->delete();
                return response()->json(['message' => 'Product removed from cart successfully.'], 200);
            } else {
                return response()->json(['error' => 'Product not found in cart.'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to remove product from cart.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Increase the quantity of an item in the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * Decrease the quantity of an item in the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeQuantity(Request $request)
    {
        try {

            $user = Auth::user();

            if (!$user) {
                return redirect()->route('login');
            }

            $id = $request->input('id');

            $cartItem = Cart::find($id);

            if ($cartItem) {

                $cartItem->quantity = $request->input('quantity');
                $cartItem->save();
                return response()->json(['success' => true, 'message' => 'Product quantity changed.'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Cart not found.'], 200);
            }
        } catch (Exception $e) {

            return response()->json(['error' => 'Failed to decrease product quantity.', 'details' => $e->getMessage()], 500);
        }
    }
}
