import './close-friend.scss';

export default function CloseFriend({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li key={user.id} className="sidebar-friend">
            <img src={`${PUBLIC_FOLDER}${user.profilePicture}`} alt="" className="sidebar-friend-img img-32 rounded" />
            <span className="sidebar-friendname">{user.username}</span>
        </li>
    )
}
