import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    login_status?: number;
    is_logged_in?: string;
}

export interface Menu {
    id: number,
    name: string,
    route: string,
    type: string
}

export interface Setting {
    id: number,
    setting_name: string,
    setting_type: string,
    setting_value: string
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    menus: Menu[]
    main_logo: string
    ziggy: Config & { location: string };
};
