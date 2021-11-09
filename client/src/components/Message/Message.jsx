import './message.scss';
import { format } from 'timeago.js';

export default function Message({ own, message }) {
    return (
        <div className={`message ${own ? 'own' : ''}`}>
            <div className="message-top">
                <img src="http://localhost:8888/images/person/4.jpeg" alt="" className="message-img rounded" />
                <p className="message-text">{message.text}</p>
            </div>
            <div className="message-bottom">
                { format(message.createdAt) }
            </div>
        </div>
    )
}
