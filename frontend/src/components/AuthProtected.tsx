import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// For routes that should ONLY be accessible when NOT logged in (login/register)
export const AuthProtected = () => {
    const { id } = useSelector((state: RootState) => state);
    return id ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
