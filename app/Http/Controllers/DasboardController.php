<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DasboardController extends Controller
{
    //

    public function index()
    {
        $userCount = User::count();
        $userActive = User::whereNotNull('is_logged_in')->count();
        return Inertia::render('Dashboard', ['userCount' => $userCount, 'userActive' => $userActive]);
    }
}
