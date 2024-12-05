<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\UserTemplate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class websiteBuilderController extends Controller
{
    // Method to save the custom HTML layout for a user
    // ++++++ last updated saveLayout
    public function saveLayout(Request $request) {
        $user = Auth::user();
    
        // Validate the incoming request
        $request->validate([
            'html_content' => 'required|string',
            'css_content' => 'nullable|string',
            'project_id' => 'required|integer', // Ensure project_id is provided
        ]);
    
        $projectId = $request->input('project_id');
    
        // Save or update the user's custom layout for the specific project
        $userTemplate = UserTemplate::updateOrCreate(
            [
                'user_id' => $user->id,
                'id' => $projectId, // Ensure we're targeting the correct project
            ],
            [
                'html_content' => $request->input('html_content'), // Save the custom HTML
                'css_content' => $request->input('css_content'),   // Save the CSS content
            ]
        );
    
        return response()->json(['success' => true, 'message' => 'Layout saved successfully']);
    }
    // Method to retrieve and display the custom layout for the logged-in user
    /* public function getLayout() {
        $user = Auth::user();
        $userTemplate = UserTemplate::where('user_id', $user->id)->first();

        // Load the user's custom HTML if it exists, or provide a default blank HTML structure
        $userHtml = $userTemplate ? $userTemplate->html_content : '<div></div>';

        return view('layout', compact('userHtml')); // Render the layout.blade.php and pass the user's custom HTML
    } */
    public function getLayout()
    {
        $user = Auth::user();
        $userTemplate = UserTemplate::where('user_id', $user->id)->first();

        // Load the user's custom HTML and CSS if they exist, or provide defaults
        $userHtml = $userTemplate ? $userTemplate->html_content : '<div></div>';
        $userCss = $userTemplate ? $userTemplate->css_content : '';

        return view('layout', compact('userHtml', 'userCss')); // Pass both HTML and CSS to the view
    }

    /* public function showLayout()
    {
        $userId = auth()->id(); // Get the authenticated user's ID
        $userHtml = UserTemplate::where('user_id', $userId)->value('html_content');

        return view('layouts.layout', compact('userHtml'));
    } */

    public function showLayout()
    {
        $userId = auth()->id(); // Get the authenticated user's ID
        $userTemplate = UserTemplate::where('user_id', $userId)->first();

        $userHtml = $userTemplate ? $userTemplate->html_content : '<div></div>';
        $userCss = $userTemplate ? $userTemplate->css_content : '';

        return view('layouts.layout', compact('userHtml', 'userCss')); // Pass both HTML and CSS to the view
    }

    // Create a new template
    /* public function createTemplate(Request $request)
    {
        $user = Auth::user();
        
        // Validate the request
        $request->validate([
            'projectName' => 'required|string|max:255',
        ]);

        // Create a new user template
        $userTemplate = UserTemplate::create([
            'user_id' => $user->id,
            // 'html_content' => "<div><h1>{$request->projectName}</h1></div>", // Default content
            'html_content' => "", // Default content
            'project_name' => $request->projectName, // Save project name
        ]);

        return response()->json([
            'success' => true,
            'templateId' => $userTemplate->id,
            'projectName' => $userTemplate->project_name, // Include project name in response
        ]);
    } */

    public function createTemplate(Request $request)
    {
        $user = Auth::user();

        // Validate the request
        $request->validate([
            'projectName' => 'required|string|max:255',
        ]);

        // Create a new user template
        $userTemplate = UserTemplate::create([
            'user_id' => $user->id,
            'html_content' => '', // Default content
            'css_content' => '',  // Default CSS
            'project_name' => $request->projectName, // Save project name
        ]);

        return response()->json([
            'success' => true,
            'templateId' => $userTemplate->id,
            'projectName' => $userTemplate->project_name, // Include project name in response
        ]);
    }

    // ++++++ last updated showProject
    /* public function showProject($id)
    {
        $user = Auth::user();

        // Ensure the template belongs to the user
        $userTemplate = UserTemplate::where('id', $id)->where('user_id', $user->id)->first();

        if (!$userTemplate) {
            abort(404, 'Template not found.');
        }

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
        // Retrieve uploaded files from the database
        $uploadedFiles = Image::all(); // Adjust query to fetch files for specific projects if needed

        // Return the view with the required variables
        return view('W2.index', [
            'userHtml' => $userTemplate->html_content,
            'templateId' => $id,
            'tableDetails' => $tableDetails,
            'project' => $userTemplate, // Pass the project as the template itself
            'uploadedFiles' => $uploadedFiles,
        ]);
    } */


    public function showProject($id)
    {
        $user = Auth::user();

        // Ensure the template belongs to the user
        $userTemplate = UserTemplate::where('id', $id)->where('user_id', $user->id)->first();

        if (!$userTemplate) {
            abort(404, 'Template not found.');
        }

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

        // Retrieve uploaded files from the database
        $uploadedFiles = Image::all(); // Adjust query to fetch files for specific projects if needed

        // Return the view with the required variables
        return view('W2.index', [
            'userHtml' => $userTemplate->html_content,
            'userCss' => $userTemplate->css_content,
            'templateId' => $id,
            'tableDetails' => $tableDetails,
            'project' => $userTemplate, // Pass the project as the template itself
            'uploadedFiles' => $uploadedFiles,
        ]);
    }
    // Delete a template
    public function deleteTemplate($id)
    {
        $user = Auth::user();

        // Ensure the template belongs to the user
        $userTemplate = UserTemplate::where('id', $id)->where('user_id', $user->id)->first();

        if (!$userTemplate) {
            return response()->json(['success' => false, 'message' => 'Template not found.'], 404);
        }

        $userTemplate->delete();

        return response()->json(['success' => true, 'message' => 'Template deleted successfully.']);
    }
}