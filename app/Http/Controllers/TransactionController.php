<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Exception;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        try {

            $query = Transaction::with('user');

            if ($request->has('search')) {
                $searchTerm = $request->get('search');
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('card_holder', 'like', "%$searchTerm%")
                      ->orWhereHas('user', function ($q) use ($searchTerm) {
                          $q->where('first_name', 'like', "%$searchTerm%")
                            ->orWhere('last_name', 'like', "%$searchTerm%");
                      });
                });
            }

            // Apply card type filter if present
            if ($request->has('card_type')) {
                $cardType = $request->get('card_type');
                $query->where('brand', $cardType);
            }

            // Apply date range filter if present
            if ($request->has('from_date')) {
                $fromDate = Carbon::parse($request->get('from_date'));
                $query->whereDate('created_at', '>=', $fromDate);
            }
            if ($request->has('to_date')) {
                $toDate = Carbon::parse($request->get('to_date'));
                $query->whereDate('created_at', '<=', $toDate);
            }

            // Apply price filter if present
            if ($request->has('price')) {
                $price = $request->get('price');
                if ($price === 'lowToHigh') {
                    $query->orderBy('amount', 'asc');
                } elseif ($price === 'highToLow') {
                    $query->orderBy('amount', 'desc');
                }
            }

            // Apply sort order filter if present
            if ($request->has('sort_order')) {
                $sortOrder = $request->get('sort_order');
                $query->orderBy('created_at', $sortOrder);
            } else {
                $query->orderBy('created_at', 'desc'); // Default sort order
            }

            $perPage = $request->get('per_page', 15);
            $transactions = $query->paginate($perPage);

            if ($transactions->isEmpty()) {
                return response()->json(['success' => false, 'message' => 'No transactions found.'], 404);
            }

            return response()->json(['success' => true, 'data' => $transactions]);

        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}

