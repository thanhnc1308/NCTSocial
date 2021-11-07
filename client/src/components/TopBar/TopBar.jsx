import './top-bar.scss';
import { Search, Chat, Notifications, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

export default function TopBar() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    return (
        <div className="topbar-container">
            <div className="topbar-left">
                <Link to="/" className="text-decoration-none">
                    <span className="logo pointer">NCT</span>
                </Link>
            </div>
            <div className="topbar-center">
                <div className="searchbar d-flex align-items-center">
                    <Search className="search-icon" />
                    <input type="text" placeholder="Enter some text" className="search-input border-none" />
                </div>
            </div>
            <div className="topbar-right d-flex align-items-center">
                <div className="topbar-links">
                    <span className="topbar-link pointer">Homepage</span>
                    <span className="topbar-link pointer">Timeline</span>
                </div>
                <div className="topbar-icons d-flex">
                    <div className="topbar-icon-item pointer">
                        <Person />
                        <span className="topbar-icon-badge">
                            1
                        </span>
                    </div>
                    <div className="topbar-icon-item pointer">
                        <Chat />
                        <span className="topbar-icon-badge">
                            1
                        </span>
                    </div>
                    <div className="topbar-icon-item pointer">
                        <Notifications />
                        <span className="topbar-icon-badge">
                            1
                        </span>
                    </div>
                </div>
                <Link to={`/profile/${user._id}`} className="text-decoration-none">
                    <img src={`${PUBLIC_FOLDER}/${user.profilePicture || 'noAvatar.png'}`} alt="" className="topbar-image" />
                </Link>
            </div>
        </div>
    )
}
