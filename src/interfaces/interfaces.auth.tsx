// Generated by https://quicktype.io

export type Rol = "ADMIN_ROLE"
| "USER_ROLE"
| "QC_ROLE"
| "CLIENT_ROLE"
| "SUPPLIER_ROLE"

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name:       string,
    lastname:   string,
    email:      string,
    password:   string,
    phone:      string,
    company?:   string
}

export interface LoginResponse {
    ok:         boolean;
    token:      string;

    uid:        string;
    name:       string;
    email:      string;
    lastname:   string;
    profile:    string;
    company:    string;
    phone:      string;
    contacts:   Contact[];
    rol:        string;
    teamsOwner: TeamsResponse[];
    teamsAdmin: TeamsResponse[];
    teamsUser:  TeamsResponse[];
}

export interface User {
    uid:        string;
    name:       string;
    lastname:   string;
    email:      string;
    phone:      string;
    rol:        string;
    profile:    string;
    company:    string;
    contacts:   Contact[];

    teams:      TeamsName[];
    teamsOwner: Teams[];
    teamsAdmin: Teams[];
    teamsUser:  Teams[];
}

export interface Contact {
    id:             string;
    supplier:       string;
    ref:            string;
    contactName:    string;
    email:          string;
}

// User API Response ------------------------------

export interface TeamsResponse {
    _id:        string;
    active:     boolean;
    updatedAt:  string;
    createdBy:  string;
    members:    MemberResponse[];
    name:       string;
    createdAt:  string;
}

export interface MemberResponse {
    active:     boolean;
    email:      string;
    rol:        TeamRol;
    _id:        UserResponse;
}

export interface UserResponse {
    contacts?:  Contact[] | [];
    name:       string;
    lastname:   string;
    email:      string;
    uid:        string;
}

//----------------------------------------------

export interface Teams {
    _id:       string;
    active:    boolean;
    contacts: Contact[];
    createdAt: string;
    createdBy: string;
    members:   Member[];
    name:      string;
    updatedAt: string;
}

export interface Member {
    uid:        string;
    active:     boolean;
    contacts?:  Contact[];
    rol:        TeamRol;
    email:      string;
    name:       string;
    lastname:   string;
}

export interface TeamsName {
    _id:        string;
    name:       string;
    createdBy?: string;
}

export enum TeamRol {
    Admin = "ADMIN",
    User =  "USER",
}

