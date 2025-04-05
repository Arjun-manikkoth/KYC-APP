import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/registration" Component={RegistrationPage} />
                    <Route path="/login" Component={LoginPage} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
