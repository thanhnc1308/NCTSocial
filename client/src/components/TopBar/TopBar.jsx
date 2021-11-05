import './top-bar.scss';
import { Search, Chat, Notifications, Person } from '@mui/icons-material';

export default function TopBar() {
    return (
        <div className="topbar-container">
            <div className="topbar-left">
                <span className="logo pointer">NCT</span>
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
                <img src="/assets/person/1.jpeg" alt="" className="topbar-image" />
            </div>
        </div>
    )
}
