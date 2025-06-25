<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Models\Utilities;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($user) {

            event(new Registered($user));

            Auth::login($user);


            return redirect(route('home', absolute: false));
        }
    }


    public function update(Request $request)
    {
        $rules = [
            'phone' => 'nullable|string',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
            'profile_image' => 'string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $user = auth()->user();

        DB::beginTransaction();

        try {
            
            $user->phone = Arr::get($validated, 'phone');
            $user->address_line1 = $validated['address_line1'];
            $user->address_line2 = Arr::get($validated, 'address_line2');
            $user->city = $validated['city'];
            $user->state = $validated['state'];
            $user->postal_code = $validated['postal_code'];
            $user->country = $validated['country'];
            $user->profile_image = Arr::get($validated, 'profile_image');
            $user->first_name = $validated['first_name'];
            $user->last_name = $validated['last_name'];
            $user->save();

            $utility = Utilities::where('user_id', $user->id)->first();

            if ($utility) {
                return response()->json([
                    'success' => true,
                    'message' => 'Checkout step updated successfully',
                    'user' => $user,
                ]);
            } else {
                DB::rollBack();

                return response()->json([
                    'success' => false,
                    'message' => 'No utility found for this user',
                ], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the user details',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json(['message' => 'User updated successfully!', 'user' => $user], 200);
    }
}
