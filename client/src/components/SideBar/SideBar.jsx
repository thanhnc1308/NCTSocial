import './sidebar.scss';
import { RssFeed, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material';
import CloseFriend from '../CloseFriend/CloseFriend';
import { useEffect, useState } from 'react';
import UserAPI from '../../api/UserAPI';

export default function SideBar() {
    const userAPI = new UserAPI();
    const [friends, setFriends] = useState([]);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchFriends = async () => {
            const data = await userAPI.getAll();
            setFriends(data);
        }
        fetchFriends();
    }, [])
    const sidebarListItems = [
        {
            id: 1,
            text: 'News Feed',
            icon: <RssFeed className="sidebar-icon" />
        },
        {
            id: 2,
            text: 'Questions',
            icon: <HelpOutline className="sidebar-icon" />
        },
        {
            id: 3,
            text: 'Location',
            icon: <WorkOutline className="sidebar-icon" />
        },
        {
            id: 4,
            text: 'Events',
            icon: <Event className="sidebar-icon" />
        },
        {
            id: 5,
            text: 'Courses',
            icon: <School className="sidebar-icon" />
        },
    ]

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <ul className="sidebar-list reset-ul">
                    {
                        sidebarListItems.map(item => (
                            <li key={item.id} className="sidebar-list-item">
                                {item.icon}
                                <span className="sidebar-list-item-text">{item.text}</span>
                            </li>
                        ))
                    }
                </ul>
                <button className="sidebar-seemore">See More</button>
                <hr className="sidebar-hr" />
                <ul className="sidebar-friendlist reset-ul">
                    {
                        friends.map(user => (
                            <CloseFriend key={user.id} user={user} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
