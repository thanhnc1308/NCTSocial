import './side-bar.scss';
import { RssFeed, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material';

export default function SideBar() {
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
                <button className="sidebar-showmore">Show More</button>
                <hr className="sidebar-hr" />
                <ul className="sidebar-friendlist reset-ul">
                    {
                        [1,2,3,4,5,6,7,8,9].map(i => (
                            <li key={i} className="sidebar-friend">
                                <img src="/assets/person/2.jpeg" alt="" className="sidebar-friend-img img-32 rounded" />
                                <span className="sidebar-friendname">Jack Ng</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
