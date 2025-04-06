import { validateRegistration } from "../utils/validtateRegistration";
import React, { useState, FormEvent } from "react";
import { IRegistrationErrors } from "@/interfaces/IAuth";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../api/api";
import LoadingSpinner from "./LoadingSpinner";
import { Eye, EyeOff } from "react-feather";
import toast from "react-hot-toast";

const Registration: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<IRegistrationErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const error: IRegistrationErrors = validateRegistration(formData);
        if (Object.values(error).length) {
            setErrors(error);
            return;
        }

        try {
            setErrors({});
            setIsLoading(true);
            const status = await signUpApi({ email: formData.email, password: formData.password });
            if (status.success) {
                navigate("/login");

                toast.success("Login to Continue");
            } else {
                toast.error(status.message);
            }
            setIsLoading(false);
        } catch (error: any) {
            console.error("Registration failed:", error.message);

            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">Join our community today!</p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 transition-all duration-200 disabled:opacity-50`}
                                placeholder="Email address"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.password ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 transition-all duration-200 disabled:opacity-50`}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 transition-all duration-200 disabled:opacity-50`}
                                    placeholder="Confirm Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5 ${
                                isLoading ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <LoadingSpinner />
                                </span>
                            ) : (
                                "Register Now"
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer Link */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        className={`font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 ${
                            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                        }`}
                        onClick={() => !isLoading && navigate("/login")}
                    >
                        Sign in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Registration;
