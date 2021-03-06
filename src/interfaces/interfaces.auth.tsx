// Generated by https://quicktype.io

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string,
    email: string,
    password: string,
    company?: string
}

export interface LoginResponse {
    ok: boolean;
    user: User;
    token: string;
}

export interface User {
    name: string;
    email: string;
    rol: string;
    uid: string;
    profile: string;
    company?: string;
}
