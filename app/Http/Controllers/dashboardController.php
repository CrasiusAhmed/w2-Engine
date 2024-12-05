<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\UserTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class dashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        // Fetch all templates for the user
        $userTemplates = UserTemplate::where('user_id', $user->id)->get();

        $images = Image::all(); // Fetch all uploaded images

        return view('dashboard', compact('userTemplates', 'images'));
    }
}
