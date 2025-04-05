import { ILoginFormData } from "@/interfaces/IAuth";
import { ILoginErrors } from "@/interfaces/IAuth";

export const validateLogin = (formData: ILoginFormData): ILoginErrors => {
    const errors: ILoginErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    return errors;
};
