import './share.scss';
import {PermMedia, Label,Room, EmojiEmotions} from '@mui/icons-material';

export default function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const shareOptions = [
        {
            id: 1,
            text: 'Photo or Video',
            icon: <PermMedia className="share-icon" />
        },
        {
            id: 2,
            text: 'Tag',
            icon: <Label className="share-icon" />
        },
        {
            id: 3,
            text: 'Location',
            icon: <Room className="share-icon" />
        },
        {
            id: 4,
            text: 'Feelings',
            icon: <EmojiEmotions className="share-icon" />
        },
    ]

    return (
        <div className="share">
            <div className="share-wrapper">
                <div className="share-top">
                    <img src={`${PUBLIC_FOLDER}/person/1.jpeg`} alt="" className="share-profile-img rounded img-32" />
                    <input type="text" placeholder="What's in your mind?" className="share-input" />
                </div>
                <hr className="share-hr" />
                <div className="share-bottom">
                    <div className="share-options">
                        {
                            shareOptions.map(option => (
                                <div key={option.id} className="share-option">
                                    {option.icon}
                                    <span className="share-option-text">{option.text}</span>
                                </div>
                            ))
                        }
                    </div>
                    <button className="share-button">Share</button>
                </div>
            </div>
        </div>
    )
}
