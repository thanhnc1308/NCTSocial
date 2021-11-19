import './messenger.scss';
import TopBar from '../../components/TopBar/TopBar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useEffect, useRef, useState } from 'react';
import ConversationAPI from '../../api/ConversationAPI';
import { Log } from '../../utils/Log';
import MessageAPI from '../../api/MessageAPI';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const currentUser = useSelector(selectUser);
    const refScroll = useRef();
    const socket = useRef();

    useEffect(() => {
        // connect socket when first rendered
        socket.current = io('ws://localhost:8900') // socket server url
        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        if (arrivalMessage && currentConversation.members.map(member => member._id).includes(arrivalMessage.sender)) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage, currentConversation])

    useEffect(() => {
        socket.current.emit('addUser', currentUser._id);
        socket.current.on('getUsers', (users) => {
            if (users) {
                setOnlineUsers(
                    currentUser.followings.filter((f) => users.some((u) => u.userId === f))
                );
            }
        })
    }, [currentUser])

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conversationsAPI = new ConversationAPI();
                const res = await conversationsAPI.getByUserId(currentUser._id)
                setConversations(res);
                if (res.length > 0) {
                    setCurrentConversation(res[0]);
                }
            } catch (e) {
                Log.exception(e);
            }
        }
        fetchConversations();
    }, [currentUser._id])

    useEffect(() => {
        try {
            const fetchMessage = async () => {
                const messageAPI = new MessageAPI();
                const res = await messageAPI.getByConversationId(currentConversation._id);
                setMessages(res);
            }
            if (currentConversation._id) {
                fetchMessage();
            }
        } catch (e) {
            Log.exception(e);
        }
    }, [currentConversation._id])

    useEffect(() => {
        // NCThanh: scroll to last message after clicking the send button
        refScroll.current?.scrollIntoView({ behavior: 'smooth'} );
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser._id,
            conversationId: currentConversation._id,
            text: currentMessage
        }
        const receiverId = currentConversation.members.find(member => member._id !== currentUser._id)
        socket.current.emit('sendMessage', {
            senderId: currentUser._id,
            receiverId: receiverId._id,
            text: currentMessage
        })

        try {
            const messageAPI = new MessageAPI();
            await messageAPI.post(message);
            setMessages([...messages, message])
            setCurrentMessage('');
        } catch (e) {
            Log.exception(e);
        }
    }

    return (
        <>
            <TopBar/>
            <div className="messenger">
                <div className="chat-menu">
                    <div className="chat-menu-wrapper">
                        <input type="text" placeholder="Search for friends" className="chat-menu-input" />
                        {
                            conversations.map(conversation => (
                                <div key={conversation._id} onClick={e => setCurrentConversation(conversation)}>
                                    <Conversation
                                        conversation={conversation}
                                        userId={currentUser._id}
                                        key={conversation._id}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chat-box">
                    <div className="chat-box-wrapper">
                        <div className="chat-box-top">
                            {
                                messages.map(message => (
                                    <div key={message._id} ref={refScroll}>
                                        <Message message={message} own={message.sender === currentUser._id} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="chat-box-bottom">
                            <textarea
                                onChange={e => setCurrentMessage(e.target.value)}
                                value={currentMessage}
                                className="chat-input"
                            />
                            <button onClick={handleSendMessage} className="chat-submit-button">Send</button>
                        </div>
                    </div>
                </div>
                <div className="chat-online">
                    <div className="chat-online-wrapper">
                        <ChatOnline
                            currentUserId={currentUser._id}
                            onlineUsers={onlineUsers}
                            setCurrentConversation={setCurrentConversation}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
