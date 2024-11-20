<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Menu/List', ['menus' => Menu::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Menu/Form', ['mode' => 'create']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'route' => 'string|unique:menus|required',
            'name' => 'string|unique:menus|required',
            'type' => 'string|required'
        ]);

        Menu::create([
            'name' => $request->name,
            'route' => $request->route,
            'type' => $request->type,
        ]);

        return to_route('menus.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
        return Inertia::render('Menu/Form', ['mode' => 'edit', 'menu' => $menu]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        //

        $request->validate([
            'route' => 'string|unique:menus|required',
            'name' => 'string|unique:menus|required',
            'type' => 'string|required'
        ]);

        $menu->update([
            'name' => $request->name,
            'route' => $request->route,
            'type' => $request->type,
        ]);
        $menu->save();

        return to_route('menus.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
        $menu->delete();
        return to_route('menus.index');
    }
}
