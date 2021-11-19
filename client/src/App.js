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
import Messenger from "./pages/Messenger/Messenger";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/authSlice";

export default function App() {
    const { token } = useSelector(selectAuth);
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={token ? <Home /> : <Navigate to="/login" /> } />
                <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
                <Route path="/messenger" element={token ? <Messenger/> : <Navigate to="login" />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </Router>
    )
}
