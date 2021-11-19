import './sidebar.scss';
import { RssFeed, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material';
import CloseFriend from '../CloseFriend/CloseFriend';
import { useEffect, useState } from 'react';
import UserAPI from '../../api/UserAPI';
import { Log } from '../../utils/Log';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice';

export default function SideBar() {
    const [friends, setFriends] = useState([]);
    const user = useSelector(selectUser);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userAPI = new UserAPI();
                const data = await userAPI.getAll();
                setFriends(data);
            } catch (e) {
                Log.exception(e);
            }
        }
        fetchUsers();
    }, [user._id])
    const sidebarListItems = [
        {
            _id: 1,
            text: 'News Feed',
            icon: <RssFeed className="sidebar-icon" />
        },
        {
            _id: 2,
            text: 'Questions',
            icon: <HelpOutline className="sidebar-icon" />
        },
        {
            _id: 3,
            text: 'Location',
            icon: <WorkOutline className="sidebar-icon" />
        },
        {
            _id: 4,
            text: 'Events',
            icon: <Event className="sidebar-icon" />
        },
        {
            _id: 5,
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
                            <li key={item._id} className="sidebar-list-item">
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
                            <Link to={`/profile/${user._id}`} key={user._id} className="text-decoration-none" >
                                <CloseFriend user={user} />
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
