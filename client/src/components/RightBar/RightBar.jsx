import "./rightbar.scss";
import Online from "../Online/Online";
import { useContext, useEffect, useState } from "react";
import UserAPI from '../../api/UserAPI';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Log } from '../../utils/Log';
import { Link } from 'react-router-dom';
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ userId }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(false);
    const { user: currentUser, dispatch } = useContext(AuthContext);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const userAPI = new UserAPI();
                const id = userId || currentUser._id;
                const data = await userAPI.getFriends(id);
                setFriends(data);
            } catch (e) {
                Log.exception(e);
            }
        }
        fetchFriends();
    }, [userId, currentUser._id])

    useEffect(() => {
        setFollowed(currentUser.followings.includes(userId));
    }, [currentUser.followings, userId])

    const handleClickFollowButton = async () => {
        try {
            const userAPI = new UserAPI();
            if (followed) {
                userAPI.unfollow(currentUser._id, userId);
                dispatch({
                    type: 'UNFOLLOW',
                    payload: userId
                })
            } else {
                userAPI.follow(currentUser._id, userId);
                dispatch({
                    type: 'FOLLOW',
                    payload: userId
                })
            }
            setFollowed(!followed);
        } catch (e) {
            Log.exception(e);
        }
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday-container">
                    <img className="birthday-img" src={`${PUBLIC_FOLDER}/gift.png`} alt="" />
                    <span className="birthday-text">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <img className="rightbar-ad" src={`${PUBLIC_FOLDER}/ad.png`} alt="" />
                <h4 className="rightbar-title">Online Friends</h4>
                <ul className="rightbar-friendlist">
                    {
                        friends.map((u) => (
                            <Online key={u._id} user={u} />
                        ))
                    }
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {
                    userId !== currentUser._id && (
                        <button className="rightbar-follow-button" onClick={handleClickFollowButton}>
                            {followed ? "Following" : "Follow"}
                            {followed ? <Remove /> : <Add />}
                        </button>
                    )
                }
                <h4 className="rightbar-title">User information</h4>
                <div className="rightbar-info">
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">City:</span>
                        <span className="rightbar-info-value">New York</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">From:</span>
                        <span className="rightbar-info-value">Madrid</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">Relationship:</span>
                        <span className="rightbar-info-value">Single</span>
                    </div>
                </div>
                <h4 className="rightbar-title">User friends</h4>
                <div className="rightbar-followings">
                    {
                        friends.map(friend => (
                            <Link key={friend._id} to={`/profile/${friend._id}`} className="text-decoration-none">
                                <div className="rightbar-following">
                                    <img
                                        src={`${PUBLIC_FOLDER}/${friend.profilePicture}`}
                                        alt=""
                                        className="rightbar-following-img"
                                        />
                                    <span className="rightbar-following-name">{friend.username}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbar-wrapper">
                {userId ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}