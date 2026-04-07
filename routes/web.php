<?php

use App\Http\Controllers\Guest\PortalController;
use App\Http\Controllers\Host\ManualController;
use App\Http\Controllers\Host\PropertyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return redirect()->route('host.properties.index');
})->middleware(['auth', 'verified'])->name('dashboard');

// Public guest portal — no auth required
Route::get('/property/{property}/portal', [PortalController::class, 'show'])->name('guest.portal');

Route::middleware(['auth', 'verified', 'role:host'])->prefix('host')->name('host.')->group(function () {
    Route::resource('properties', PropertyController::class);
    Route::post('properties/{property}/manuals', [ManualController::class, 'store'])->name('properties.manuals.store');
    Route::delete('properties/{property}/manuals/{manual}', [ManualController::class, 'destroy'])->name('properties.manuals.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
