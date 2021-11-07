import "./rightbar.scss";
import Online from "../Online/Online";
import { useEffect, useState } from "react";
import UserAPI from '../../api/UserAPI';

export default function Rightbar({ profile }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchFriends = async () => {
            const userAPI = new UserAPI();
            const data = await userAPI.getAll();
            setFriends(data);
        }
        fetchFriends();
    }, [])

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
                    <div className="rightbar-following">
                        <img
                            src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-following-name">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={`${PUBLIC_FOLDER}/person/2.jpeg`}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-following-name">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={`${PUBLIC_FOLDER}/person/3.jpeg`}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-following-name">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={`${PUBLIC_FOLDER}/person/4.jpeg`}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-following-name">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={`${PUBLIC_FOLDER}/person/5.jpeg`}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-following-name">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={`${PUBLIC_FOLDER}/person/6.jpeg`}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-following-name">John Carter</span>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbar-wrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}