import { useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { AuthContext } from "./contexts/AuthContext/AuthContext";

export default function App() {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" /> } />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/profile/:userId" element={<Profile />} />
            </Routes>
        </Router>
    )
}
