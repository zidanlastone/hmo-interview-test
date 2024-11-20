<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Setting/List', ['settings' => Setting::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Setting/Form', ['mode' => 'create']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'setting_name' => 'string|unique:settings|required',
            'setting_type' => 'string|required',
            'setting_value' => 'string|required'
        ]);

        Setting::create([
            'setting_name' => $request->setting_name,
            'setting_type' => $request->setting_type,
            'setting_value' => $request->setting_value,
        ]);

        return to_route('settings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        return Inertia::render('Setting/Form', ['mode' => 'edit', 'setting' => $setting]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Setting $setting)
    {
        //
        $val = $request->validate([
            'setting_name' => 'string|unique:settings|required',
            'setting_type' => 'string|required',
            'setting_value' => 'string|required'
        ]);

        $setting->fill($val);
        $setting->save();


        return to_route('settings.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
        $setting->delete();
        return to_route('settings.index');
    }
}
