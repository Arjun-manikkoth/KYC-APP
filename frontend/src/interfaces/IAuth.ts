export interface IRegistrationFormData {
    email: string;
    password: string;
    confirmPassword: string;
}
export interface ILoginFormData {
    email: string;
    password: string;
}

export interface IRegistrationErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface ILoginErrors {
    email?: string;
    password?: string;
}

export interface ILogin {
    email?: string;
    password?: string;
}

export interface IRegistration {
    email?: string;
    password?: string;
}
