<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $logo = 'https://logospng.org/download/laravel/logo-laravel-icon-1024.png';
        $settingLogo = Setting::where(['setting_name' => 'main-logo'])->first();
        if (isset($settingLogo)) {
            $logo = $settingLogo->setting_value;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'menus' => Menu::all(),
            'main_logo' => $logo,
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
