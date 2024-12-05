<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\W2Controller;
use App\Http\Controllers\websiteBuilderController;
use Illuminate\Support\Facades\Route;

Route::get('/', action: function () {
    return view('w2-Home');
});
Route::get('/dashboard', [dashboardController::class, 'dashboard'])->name('dashboard')->middleware(['auth']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/save-html-content', [websiteBuilderController::class, 'saveLayout'])->middleware(['auth']);



Route::post('/create-template', [WebsiteBuilderController::class, 'createTemplate'])->middleware('auth');
Route::get('/project/{id}', [WebsiteBuilderController::class, 'showProject'])->middleware('auth');
Route::delete('/delete-template/{id}', [WebsiteBuilderController::class, 'deleteTemplate'])->middleware('auth');


Route::post('/upload-image', [ImageController::class, 'uploadFile'])->name('upload.file');
Route::delete('/delete-image/{id}', [ImageController::class, 'deleteFile']);


require __DIR__.'/auth.php';
