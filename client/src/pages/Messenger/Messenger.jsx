import './messenger.scss';
import TopBar from '../../components/TopBar/TopBar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import ConversationAPI from '../../api/ConversationAPI';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Log } from '../../utils/Log';
import MessageAPI from '../../api/MessageAPI';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const { user: currentUser } = useContext(AuthContext);
    const refScroll = useRef();

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
                                <div onClick={e => setCurrentConversation(conversation)}>
                                    <Conversation
                                        conversation={conversation}
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
                                    <div ref={refScroll}>
                                        <Message key={message._id} message={message} own={message.sender === currentUser._id} />
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
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div>
        </>
    )
}
