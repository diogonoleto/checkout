<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');
