import { useEffect, useState } from 'react';
import './conversation.scss';

export default function Conversation({ conversation, userId }) {
    const [receiver, setReceiver] = useState({});
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        setReceiver(conversation.members.find(member => member._id !== userId));
    }, [conversation.members, userId])
    return (
        <div className="conversation pointer">
            <img src={`${PUBLIC_FOLDER}/${receiver.profilePicture || 'person/noAvatar.png'}`} alt="" className="conversation-img rounded" />
            <span className="converation-name">{receiver.username}</span>
        </div>
    )
}
