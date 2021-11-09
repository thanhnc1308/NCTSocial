import './chat-online.scss';

export default function ChatOnline() {
    return (
        <div className="chat-online">
            <div className="chat-online-friend">
                <div className="chat-online-img-container">
                    <img src="http://localhost:8888/images/person/4.jpeg" alt="" className="chat-online-img" />
                    <div className="chat-online-badge"></div>
                </div>
                <span className="chat-online-name">NC Thanh</span>
            </div>
        </div>
    )
}
