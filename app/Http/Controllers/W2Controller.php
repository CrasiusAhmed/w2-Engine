<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTemplate; // Import your UserTemplate model
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class W2Controller extends Controller
{
    public function index()
    {
        // Get the authenticated user's ID
        $userId = Auth::id();
        
        // Fetch the user's custom HTML content from the database
        $userHtml = UserTemplate::where('user_id', $userId)->value('html_content');

        // Retrieve all tables from the SQLite database
        $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");

        // Sort tables alphabetically by name
        $tables = collect($tables)->sortBy('name')->values();

        $tableDetails = [];

        // Loop through each table to get column and foreign key details
        foreach ($tables as $table) {
            $tableName = $table->name;
            
            // Get columns for the table
            $columns = DB::select("PRAGMA table_info($tableName)");

            // Get foreign keys for the table
            $foreignKeys = DB::select("PRAGMA foreign_key_list($tableName)");

            // Organize the details for each table
            $tableDetails[$tableName] = [
                'columns' => $columns,
                'foreignKeys' => $foreignKeys,
            ];
        }

        // Pass userId, userHtml, and tableDetails to the 'W2.index' view
        return view('W2.index', compact('userId', 'userHtml', 'tableDetails'));
    }
}
