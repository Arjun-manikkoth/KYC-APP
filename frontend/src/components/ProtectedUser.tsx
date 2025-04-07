import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserProtected: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return user.id ? <Outlet /> : <Navigate to={"/login"} />;
};
export default UserProtected;
