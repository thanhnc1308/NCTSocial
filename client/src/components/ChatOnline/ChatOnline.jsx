import { useEffect, useState } from 'react';
import { Log } from '../../utils/Log';
import './chat-online.scss';
import UserAPI from '../../api/UserAPI';

export default function ChatOnline({ currentUserId, onlineUsers, setCurrentConversation }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const userAPI = new UserAPI();
                const res = await userAPI.getFriends(currentUserId);
                setFriends(res);
            } catch (e) {
                Log.exception(e);
            }
        }
        getFriends();
    }, [currentUserId])

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers])
    return (
        <div className="chat-online">
            {
                onlineFriends.map(friend => (
                    <div key={friend._id} className="chat-online-friend">
                        <div className="chat-online-img-container">
                            <img src="http://localhost:8888/images/person/4.jpeg" alt="" className="chat-online-img" />
                            <div className="chat-online-badge"></div>
                        </div>
                        <span className="chat-online-name">{friend.username}</span>
                    </div>
                ))
            }
        </div>
    )
}
