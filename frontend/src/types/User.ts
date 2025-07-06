

export interface User{
    uuid: string;
    name: string;
    surname: string;
    email: string;
    company: string;
    jobTitle: string;
}

export interface UserCreate {
    name: string;
    surname: string;
    email: string;
    company: string;
    jobTitle: string;
}

export interface UserUpdate extends UserCreate{
    uuid: string;
}