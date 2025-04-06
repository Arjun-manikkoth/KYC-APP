import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "react-feather";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { logoutApi } from "@/api/api";
import toast from "react-hot-toast";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const status = await logoutApi();
            if (status.success) {
                dispatch(clearUser());
                navigate("/login");
            } else {
                toast.error(status.message);
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer">
                            KYC-APP
                        </h1>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {user.id && (
                                <button
                                    className="flex items-center space-x-2 text-gray-900 hover:text-indigo-600 transition-colors duration-200"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    <User size={20} />
                                    <span className="hidden sm:inline font-medium">User</span>
                                </button>
                            )}
                        </div>
                        {user.id && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                            >
                                <LogOut size={20} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
