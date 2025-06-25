<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
// use Stripe\Stripe;
// use Stripe\Charge;

class PaymentController extends Controller
{

    // public function processPayment(Request $request)
    // {
    //     try {

    //         Stripe::setApiKey(config('stripe.sk'));

    //         $total_amount = $request->input('amount');
    //         $currency = 'usd';
    //         $source = $request->input('token');
    //         $cartItemsIds = explode(',', $request->input('cart_items_ids'), true);

    //         $charge = Charge::create([
    //             'amount' => intval($total_amount),
    //             'currency' => $currency,
    //             'source' => $source,
    //         ]);

    //         if ($charge->status == 'succeeded') {

    //             Transaction::create([

    //                 'user_id' => auth()->id(),
    //                 'amount' => $total_amount,
    //                 'payment_method' => 'Stripe',
    //                 'payment_status' => 'completed',
    //                 'transaction_id' => $charge->id,
    //                 'description' => json_encode($charge->payment_method_details->card),
    //             ]);


    //             //save  

    //             $user = Auth::user();

    //             $new_order = new Order;
    //             $new_order->user_id = $user->id;
    //             $new_order->status = 0;
    //             $new_order->total_amount = $total_amount;
    //             $new_order->save();

    //             //save order status

    //             $order_status = new OrderStatus();
    //             $order_status->user_id = $user->id;
    //             $order_status->description = 'You order is pending';
    //             $order_status->order_id = $new_order->id;
    //             $order_status->save();

    //             $cartItemsIdsFlat = array_filter(array_merge(...array_map('explode', [','], $cartItemsIds)));
    //             $cartItems = Cart::whereIn('id', $cartItemsIdsFlat)->get();

    //             foreach ($cartItems as $cart) {

    //                 $product = Product::find($cart->product_id);

    //                 $order_details = new OrderDetail();
    //                 $order_details->order_id = $new_order->id;
    //                 $order_details->product_id = $cart->product_id;
    //                 $order_details->quantity = $cart->quantity;
    //                 $order_details->price = $product->price;
    //                 $order_details->save();

    //                 $product->stock -= $cart->quantity;
    //                 $product->save();

    //                 $cart->delete();
    //             }

    //             return response()->json(['success' => true, 'message' => 'You order has been confirmed.']);
    //         }

    //         return response()->json(['success' => false, 'message' => 'Payment failed.']);

    //     } catch (\Exception $e) {

    //         return response()->json(['success' => false, 'message' => $e->getMessage()]);

    //     }
    // }



    // public function processPayment(Request $request)
    // {
    //     // try {
    //         \Stripe\Stripe::setApiKey(config('stripe.sk'));

    //         $currency = 'usd';
    //         $cartItemsIds = explode(',', $request->input('cart_items_ids'), true);

    //         // Create Checkout Session
    //         $lineItems = [];
    //         $cartItemsIdsFlat = array_filter(array_merge(...array_map('explode', [','], $cartItemsIds)));
    //         $cartItems = Cart::whereIn('id', $cartItemsIdsFlat)->get();

    //         foreach ($cartItems as $cart) {
    //             $product = Product::find($cart->product_id);

    //             $lineItems[] = [
    //                 'price_data' => [
    //                     'currency' => $currency,
    //                     'product_data' => [
    //                         'name' => $product->name,
    //                     ],
    //                     'unit_amount' => $product->price * 100, // Convert to cents
    //                 ],
    //                 'quantity' => $cart->quantity,
    //             ];
    //         }

    //         $session = \Stripe\Checkout\Session::create([
    //             'line_items' => $lineItems,
    //             'mode' => 'payment',
    //             'success_url' => route('payment.success', ['session_id' => '{CHECKOUT_SESSION_ID}', 'cart_items_ids' => $request->input('cart_items_ids')]),
    //             'cancel_url' => route('payment.cancel'),
    //         ]);

    //         return redirect()->away($session->url);


    //     // } catch (\Exception $e) {
    //     //     return response()->json(['success' => false, 'message' => $e->getMessage()]);
    //     // }
    // }
    public function processPayment(Request $request)
{
    try {
        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $currency = 'usd';
        $cartItemsIds = explode(',', $request->input('cart_items_ids'));

        // Create Checkout Session
        $lineItems = [];
        $cartItems = Cart::whereIn('id', $cartItemsIds)->get();

        foreach ($cartItems as $cart) {
            $product = Product::find($cart->product_id);

            $lineItems[] = [
                'price_data' => [
                    'currency' => $currency,
                    'product_data' => [
                        'name' => $product->name,
                    ],
                    'unit_amount' => $product->price * 100, // Convert to cents
                ],
                'quantity' => $cart->quantity,
            ];
        }

        $session = \Stripe\Checkout\Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('payment.success', ['session_id' => '{CHECKOUT_SESSION_ID}', 'cart_items_ids' => $request->input('cart_items_ids')]),
            'cancel_url' => route('payment.cancel'),
        ]);

        // Redirect to Stripe Checkout URL
        return redirect()->away($session->url);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => $e->getMessage()]);
    }
}


    public function paymentSuccess(Request $request)
    {
        try {

            \Stripe\Stripe::setApiKey(config('stripe.sk'));

            $session_id = $request->get('session_id');
            $session = \Stripe\Checkout\Session::retrieve($session_id);
            $payment_intent = \Stripe\PaymentIntent::retrieve($session->payment_intent);

            if ($payment_intent->status == 'succeeded') {
                $total_amount = $session->amount_total / 100; // Convert cents to dollars
                $cartItemsIds = explode(',', $request->input('cart_items_ids'), true);

                Transaction::create([
                    'user_id' => auth()->id(),
                    'amount' => $total_amount,
                    'payment_method' => 'Stripe',
                    'payment_status' => 'completed',
                    'transaction_id' => $session->payment_intent,
                    'description' => json_encode($payment_intent->charges->data[0]->payment_method_details->card),
                ]);

                // Save order
                $user = Auth::user();
                $new_order = new Order;
                $new_order->user_id = $user->id;
                $new_order->status = 0;
                $new_order->total_amount = $total_amount;
                $new_order->save();

                // Save order status
                $order_status = new OrderStatus();
                $order_status->user_id = $user->id;
                $order_status->description = 'Your order is pending';
                $order_status->order_id = $new_order->id;
                $order_status->save();

                $cartItemsIdsFlat = array_filter(array_merge(...array_map('explode', [','], $cartItemsIds)));
                $cartItems = Cart::whereIn('id', $cartItemsIdsFlat)->get();

                foreach ($cartItems as $cart) {
                    $product = Product::find($cart->product_id);

                    $order_details = new OrderDetail();
                    $order_details->order_id = $new_order->id;
                    $order_details->product_id = $cart->product_id;
                    $order_details->quantity = $cart->quantity;
                    $order_details->price = $product->price;
                    $order_details->save();

                    $product->stock -= $cart->quantity;
                    $product->save();

                    $cart->delete();
                }

                return response()->json(['success' => true, 'message' => 'Your order has been confirmed.']);
            }

            return response()->json(['success' => false, 'message' => 'Payment failed.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function paymentCancel()
    {
        return response()->json(['success' => false, 'message' => 'Payment was canceled.']);
    }
}
