import { IRegistrationFormData } from "@/interfaces/IAuth";
import { IRegistrationErrors } from "@/interfaces/IAuth";

export const validateRegistration = (formData: IRegistrationFormData): IRegistrationErrors => {
    const errors: IRegistrationErrors = {};

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

    // Confirm Password validation
    if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
