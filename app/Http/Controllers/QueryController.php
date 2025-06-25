<?php

namespace App\Http\Controllers;

use App\Mail\QueryReply;
use App\Models\Query;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class QueryController extends Controller
{
    // Store a new query
    public function store(Request $request)
    {

        $request->validate([
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $query = Query::create($request->all());

        return response()->json(['success' => true, 'message' => 'Query submitted successfully', 'query' => $query], 201);
    }

    public function reply(Request $request, $id)
    {
        $request->validate([
            'reply' => 'required|string'
        ]);

        $query = Query::findOrFail($id);

        if ($query) {

            $query->reply = $request->reply;
            $query->status = 2;

            $query->save();

            $query_reply = new QueryReply($query);

            Mail::to($query->user_email)->send($query_reply);

            return response()->json(['message' => 'Reply sent successfully', 'query' => $query]);
        }
    }

    public function changeStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string'
        ]);

        $query = Query::findOrFail($id);
        $query->update(['status' => $request->status]);

        return response()->json(['message' => 'Status updated successfully', 'query' => $query]);
    }

    public function destroy($id)
    {
        $query = Query::findOrFail($id);
        $query->delete();

        return response()->json(['message' => 'Query deleted successfully']);
    }



    public function filterQueries(Request $request)
    {
        try {
            // Retrieve query parameters
            $searchTerm = $request->query('search_term');
            $status = $request->query('status');
            $sortOrder = $request->query('sort_order', 'desc');
            $page = $request->query('page', 1);
            $perPage = $request->query('per_page', 15);
            $sortField = $request->query('sort_field', 'created_at');

            // Initialize the query
            $query = Query::query();

            // Apply search term filter
            if ($searchTerm) {
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('user_name', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('user_email', 'LIKE', "%{$searchTerm}%");
                });
            }

            // Apply status filter
            if ($status) {
                $query->where('status', $status);
            }

            // Apply sorting
            $query->orderBy($sortField, $sortOrder);

            // Paginate results
            $queries = $query->paginate($perPage, ['*'], 'page', $page);

            // Return response
            return response()->json([
                'success' => true,
                'queries' => $queries->items(),
                'total' => $queries->total(),
                'current_page' => $queries->currentPage(),
                'last_page' => $queries->lastPage(),
            ]);
        } catch (Exception $e) {
            // Handle exceptions
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
