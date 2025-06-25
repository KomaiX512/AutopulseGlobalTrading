<?php

namespace App\Http\Controllers;

use App\Mail\OrderConfirmationMail;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\Shipping;
use App\Models\Transaction;
use App\Models\UserDetail;
use App\Models\Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class StripeController extends Controller
{
    public function sendMail()
    {
        try {

            $cartItems  = Cart::where('id', 44)->get();

            $data = (object) [
                'carts' => $cartItems
            ];

            return view('mails.order_confirmation', compact('data'));
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function checkout(Request $request)
    {

        try {

            $user = Auth::user();

            if (!$user) {
                return 'no user found';
            }

            \Stripe\Stripe::setApiKey(config('stripe.sk'));

            $currency = 'usd';
            $cartItemsIds = explode(',', $request->input('cart_items_ids'));
            $total_amount = $request->input('total_amount');


            // request billing address

            $billing_address_line1 = $request->input('billing_address_line1');
            $billing_address_line2 = $request->input('billing_address_line2');
            $billing_city = $request->input('billing_city');
            $billing_country = $request->input('billing_country');
            $billing_first_name = $request->input('billing_first_name');
            $billing_last_name = $request->input('billing_last_name');
            $billing_phone = $request->input('billing_phone');
            $billing_postal_code = $request->input('billing_postal_code');
            $billing_state = $request->input('billing_state');

            // save user details

            $user_detail = UserDetail::where('user_id', $user->id)->first() ?? new UserDetail();

            $user_detail->user_id = $user->id;
            $user_detail->first_name = $billing_first_name;
            $user_detail->last_name = $billing_last_name;
            $user_detail->phone = $billing_phone;
            $user_detail->address_line1 = $billing_address_line1;
            $user_detail->address_line2 = $billing_address_line2;
            $user_detail->country = $billing_country;
            $user_detail->city = $billing_city;
            $user_detail->zipcode = $billing_postal_code;
            $user_detail->state = $billing_state;

            // check if the order and shipping is the same address

            $is_shipping_same =  $request->input('is_shipping_same') === 'true';

            //creating new order

            $new_order = new Order;
            $new_order->user_id = $user->id;
            $new_order->status = 0;
            $new_order->total_amount = $total_amount;
            $new_order->save();

            $shiping_address = new Shipping();


            if ($is_shipping_same) {

                //saving shipping adddress as same as billing address

                $shiping_address->order_id = $new_order->id;
                $shiping_address->first_name = $billing_first_name;
                $shiping_address->last_name = $billing_last_name;
                $shiping_address->phone = $billing_phone;
                $shiping_address->address_line1 = $billing_address_line1;
                $shiping_address->address_line2 = $billing_address_line2;
                $shiping_address->country = $billing_country;
                $shiping_address->city = $billing_city;
                $shiping_address->zipcode = $billing_postal_code;
                $shiping_address->state = $billing_state;
            } else {

                //saving new shipping address provided by the customer

                $shipping_address_line1 = $request->input('shipping_address_line1');
                $shipping_address_line2 = $request->input('shipping_address_line2');
                $shipping_city = $request->input('shipping_city');
                $shipping_first_name = $request->input('shipping_first_name');
                $shipping_last_name = $request->input('shipping_last_name');
                $shipping_phone = $request->input('shipping_phone');
                $shipping_postal_code = $request->input('shipping_postal_code');
                $shipping_postal_code = $request->input('shipping_postal_code');


                $shiping_address->first_name = $shipping_first_name;
                $shiping_address->last_name = $shipping_last_name;
                $shiping_address->phone = $shipping_phone;
                $shiping_address->address_line1 = $shipping_address_line1;
                $shiping_address->address_line2 = $shipping_address_line2;
                $shiping_address->country = $billing_country;
                $shiping_address->city = $shipping_city;
                $shiping_address->zipcode = $shipping_postal_code;
                $shiping_address->state = $billing_state;
                $shiping_address->order_id = $new_order->id;
            }

            //save billing and shipping address

            $user_detail->save();
            $shiping_address->save();


            //get items from the cart

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
                        'unit_amount' => $product->price * 100,
                    ],
                    'quantity' => $cart->quantity,
                ];
            }

            $session = \Stripe\Checkout\Session::create([
                'line_items'  => $lineItems,
                'mode'        => 'payment',
                'success_url' =>
                route('payment.success') .
                    '?session_id={CHECKOUT_SESSION_ID}&cart_items_ids=' .
                    $request->input('cart_items_ids') .
                    '&order_id=' . $new_order->id,

                'cancel_url' => route('payment.cancel'),
            ]);

            return response()->json(['success' => true, 'url' => $session->url]);
        } catch (\Exception $e) {

            return ['succcess' => false, 'message' => $e->getMessage()];
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

                $total_amount = $session->amount_total / 100;
                $cartItemsIds = explode(',', $request->input('cart_items_ids'));
                $new_order_id = $request->input('order_id');
                // $new_order_id = $request->input('order_tracking_id');

                $latest_charge_id = $payment_intent->latest_charge;
                $charge = \Stripe\Charge::retrieve($latest_charge_id);

                $card_details = [

                    'last4' => $charge->payment_method_details->card->last4,
                    'exp_month' => $charge->payment_method_details->card->exp_month,
                    'exp_year' => $charge->payment_method_details->card->exp_year,
                    'brand' => $charge->payment_method_details->card->brand,
                    'card_holder' => $charge->billing_details->name,
                    'country' =>  $charge->billing_details->address->country,
                ];


                $transaction = new Transaction();

                $transaction->user_id = auth()->id();
                $transaction->order_id = $new_order_id;
                $transaction->amount = $total_amount;
                $transaction->payment_method = 'Stripe';
                $transaction->payment_status = 'completed';
                $transaction->transaction_id = $session->payment_intent;
                $transaction->last4 = $charge->payment_method_details->card->last4;
                $transaction->exp_month = $charge->payment_method_details->card->exp_month;
                $transaction->exp_year = $charge->payment_method_details->card->exp_year;
                $transaction->brand = $charge->payment_method_details->card->brand;
                $transaction->card_holder = $charge->billing_details->name;
                $transaction->country = $charge->billing_details->address->country;
                $transaction->description = json_encode($card_details);

                $transaction->save();

                $user = Auth::user();

                $order_status = new OrderStatus();
                $order_status->user_id = $user->id;
                $order_status->description = 'Your order is pending';
                $order_status->order_id = $new_order_id;
                $order_status->save();


                $cartItems = Cart::whereIn('id', $cartItemsIds)->get();

                foreach ($cartItems as $cart) {

                    $product = Product::find($cart->product_id);

                    $order_details = new OrderDetail();
                    $order_details->order_id = $new_order_id;
                    $order_details->product_id = $cart->product_id;
                    $order_details->quantity = $cart->quantity;
                    $order_details->price = $product->price;
                    $order_details->save();

                    $product->stock -= $cart->quantity;
                    $product->save();
                    $cart->delete();
                }


                $utility = Utilities::where('user_id', $user->id)->first();
                $utility->checkout_step = 0;
                $utility->save();

                $data = (object) [
                    'carts' => $cartItems,
                    'card_details' => $card_details,
                    'transaction' => $transaction,
                ];

                $order_confirmation_mail = new OrderConfirmationMail($data);
                Mail::to(Auth::user()->email)->send($order_confirmation_mail);

                return redirect()->route('payment_success');
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
