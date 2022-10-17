import { FormInputs } from '../components/SignUpFrom';

export type Gender = 'male' | 'female';

export interface RegisterUserRequest {
    name: string;
    email: string;
    gender: Gender;
    status: 'active';
}

export interface RegisterUserResponse extends RegisterUserRequest {
    id: number;
}

export interface RegisterUserError {
    field: string;
    message: string;
}

// this interface is a mix of real responce and mock data
export type UiUser = RegisterUserResponse & FormInputs;
