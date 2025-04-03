import { validateLogin } from "../utils/validateLogin";
import React, { useState, FormEvent } from "react";
import { ILoginErrors } from "@/interfaces/IAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<ILoginErrors>({}); //

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const error: ILoginErrors = validateLogin(formData);

        if (Object.values(error).length) {
            setErrors(error);
        } else {
            setErrors({});
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
                        Login
                    </h2>
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
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 transition-all duration-200`}
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
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 transition-all duration-200`}
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            Register Now
                        </button>
                    </div>
                </form>

                {/* Footer Link */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Create an account?{" "}
                    <p
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        onClick={() => navigate("/registration")}
                    >
                        Sign up here
                    </p>
                </p>
            </div>
        </div>
    );
};

export default Login;
