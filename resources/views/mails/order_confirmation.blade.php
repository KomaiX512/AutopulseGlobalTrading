<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>

<body style="background:#E7E7E7; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E7E7E7">
        <tr>
            <td align="center">
                <table width="600" cellpadding="20" cellspacing="0" border="0" style="background-color: #ffffff;padding:12px">
                    <tr>
                        <td align="center">
                            <h3 style="color: #333333;">Autopulse</h3>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #dddddd; padding: 20px;margin-top:10px">
                            <h3 style="text-align: center; color: #333333;">Thank you for your order!</h3>
                            <div style="padding: 10px 0; color: #555555;">
                                Hi {{ auth()->user()->name }},
                            </div>
                            <p style="color: #555555; line-height: 1.5;">
                                Your order <strong># 189186942449495</strong> has been placed successfully and we will let you know once your package is on its way. Check the status of your order using the tracking link below.
                            </p>
                            <div style="text-align: center; margin-top: 20px;">
                                <a href="/track" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 5px;">Track My Order</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #dddddd;padding:0">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f8f9fa;padding:10px; text-align: center; color: #333333;">
                                        Delivery Details
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="padding: 5px 0;">Name: {{ auth()->user()->name }}</div>
                                        <div style="padding: 5px 0;">Email: {{ auth()->user()->email }}</div>
                                        <div style="padding: 5px 0;">Address: {{ auth()->user()->address_line1 }}</div>
                                        <div style="padding: 5px 0;">Phone: {{ auth()->user()->phone }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #dddddd;padding:0">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 10px; text-align: center; color: #333333;">
                                        Order Details
                                    </td>
                                </tr>
                                @isset($data)
                                <tr>
                                    <td style="padding: 20px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            @foreach ($data->carts as $cart)
                                            @php
                                            $product = \App\Models\Product::find($cart->product_id);
                                            @endphp
                                            <tr>
                                                <td style="padding: 10px 0;">ITEM {{ $loop->iteration }}</td>
                                            </tr>
                                            <tr>
                                                <td style="display: flex; padding: 10px 0;">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <!-- <td style="padding: 10px;">
                                                                <img width="130" src="{{ str_replace('public/', '/storage/', $product->image) }}" alt="{{ $product->name }}">
                                                            </td> -->
                                                            <td style="padding-left: 20px;">
                                                                <div style="font-weight: bold; color: #333333;">
                                                                    {{ $product->name }}
                                                                </div>
                                                                <div style="padding-top: 10px; color: #333333;">$ {{ $product->price }}</div>
                                                                <div style="padding-top: 10px; color: #333333;">X{{ $cart->quantity }}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            @endforeach
                                        </table>
                                    </td>
                                </tr>
                                @else
                                <tr>
                                    <td>Data not available.</td>
                                </tr>
                                @endisset
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #dddddd;padding:0">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 10px; text-align: center; color: #333333;">
                                        Payment Summary
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="padding: 10px 0;">Order Total:</td>
                                                            <td style="padding: 10px 0; text-align: right;">$ {{ $data->transaction->amount }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">Payment Method:</td>
                                                            <td style="padding: 10px 0; text-align: right;">{{ $data->transaction->payment_method }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">Payment Status:</td>
                                                            <td style="padding: 10px 0; text-align: right;">{{ $data->transaction->payment_status }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">Transaction ID:</td>
                                                            <td style="padding: 10px 0; text-align: right;">{{ $data->transaction->transaction_id }}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #dddddd;padding:0">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 10px; text-align: center; color: #333333;">
                                        Transaction Details
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 10px 0;">Cardholder Name:</td>
                                                <td style="padding: 10px 0; text-align: right;">{{ $data->card_details['brand'] }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">Card Type:</td>
                                                <td style="padding: 10px 0; text-align: right;">{{ $data->card_details['brand'] }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">Last 4 Digits:</td>
                                                <td style="padding: 10px 0; text-align: right;">{{ $data->card_details['last4'] }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">Expiration Date:</td>
                                                <td style="padding: 10px 0; text-align: right;">{{ $data->card_details['exp_month'] }}/{{ $data->card_details['exp_year'] }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">Country:</td>
                                                <td style="padding: 10px 0; text-align: right;">{{ $data->card_details['country'] }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
