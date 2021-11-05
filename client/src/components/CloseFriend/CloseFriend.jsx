import './close-friend.scss';

export default function CloseFriend({ user }) {
    return (
        <li key={user.id} className="sidebar-friend">
            <img src={user.profilePicture} alt="" className="sidebar-friend-img img-32 rounded" />
            <span className="sidebar-friendname">{user.username}</span>
        </li>
    )
}
