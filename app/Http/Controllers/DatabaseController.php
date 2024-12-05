<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DatabaseController extends Controller
{
    public function showDatabase()
    {
        // Retrieve all tables from the SQLite database
        $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
        $tables = collect($tables)->sortBy('name')->values();

        $tableDetails = [];

        // Loop through each table to get column, foreign key, and row details
        foreach ($tables as $table) {
            $tableName = $table->name;
            
            // Get columns for the table
            $columns = DB::select("PRAGMA table_info($tableName)");

            // Get foreign keys for the table
            $foreignKeys = DB::select("PRAGMA foreign_key_list($tableName)");

            // Get rows for the table
            $rows = DB::table($tableName)->get();

            // Organize the details for each table
            $tableDetails[$tableName] = [
                'columns' => $columns,
                'foreignKeys' => $foreignKeys,
                'rows' => $rows,
            ];
        }

        // Pass the table details to the view
        return view('database.show', compact('tableDetails'));
    }
}