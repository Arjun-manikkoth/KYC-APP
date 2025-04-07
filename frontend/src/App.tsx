import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UserProtected from "./components/ProtectedUser";
import { AuthProtected } from "./components/AuthProtected";
import VideoKYCPage from "./pages/VideoKYC";
import ImageKYCPage from "./pages/ImageKYC";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route Component={AuthProtected}>
                        <Route path="/registration" Component={RegistrationPage} />
                        <Route path="/login" Component={LoginPage} />
                    </Route>

                    <Route Component={UserProtected}>
                        <Route path="/dashboard" Component={DashboardPage} />
                        <Route path="/video-kyc" Component={VideoKYCPage} />
                        <Route path="/image-kyc" Component={ImageKYCPage} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
