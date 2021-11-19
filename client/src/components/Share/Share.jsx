import './share.scss';
import {PermMedia, Label,Room, EmojiEmotions, Cancel } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { Log } from '../../utils/Log';
import PostAPI from '../../api/PostAPI';
import FileAPI from '../../api/FileAPI';
import { selectUser } from '../../redux/authSlice';
import { useSelector } from 'react-redux';

export default function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const refDesc = useRef();
    const user = useSelector(selectUser);
    const [file, setFile] = useState(null);
    const postAPI = new PostAPI();
    const fileAPI = new FileAPI();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let photo = '';
        if (file) {
            const data = new FormData();
            data.append('file', file);
            try {
                const res = await fileAPI.upload(data);
                if (res && res.filename) {
                    photo = res.filename;
                }
            } catch (e) {
                Log.exception(e);
                return;
            }
        }
        try {
            const newPost = {
                userId: user._id,
                desc: refDesc.current.value,
                photo
            }
            const res = await postAPI.post(newPost);
            if (res) {
                console.log(res);
            }
        } catch (e) {
            Log.exception(e);
        }
    }

    return (
        <div className="share">
            <div className="share-wrapper">
                <div className="share-top">
                    <img src={`${PUBLIC_FOLDER}/${user.userProfile || 'person/noAvatar.png'}`} alt="" className="share-profile-img rounded img-32" />
                    <input ref={refDesc} type="text" placeholder={`What's in your mind, ${user.username}?`} className="share-input" />
                </div>
                <hr className="share-hr" />
                {
                    file && (
                        <div className="share-img-container">
                            <img className="share-img" src={URL.createObjectURL(file)} alt="" />
                            <Cancel className="share-cancel-img" onClick={() => setFile(null)} />
                        </div>
                    )
                }
                <form onSubmit={handleSubmit} className="share-bottom">
                    <div className="share-options">
                        {/* NCThanh click to the label will trigger click to file */}
                        <label htmlFor="file" className="share-option">
                            <PermMedia className="share-icon" />
                            <span className="share-option-text">Photo or Video</span>
                            <input onChange={e => {setFile(e.target.files[0])}} type="file" id="file" accept=".jpg,.jpeg,.png" className="d-none" />
                        </label>
                        <div className="share-option">
                            <Label className="share-icon" />
                            <span className="share-option-text">Tag</span>
                        </div>
                        <div className="share-option">
                            <Room className="share-icon" />
                            <span className="share-option-text">Location</span>
                        </div>
                        <div className="share-option">
                            <EmojiEmotions className="share-icon" />
                            <span className="share-option-text">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className="share-button">Share</button>
                </form>
            </div>
        </div>
    )
}
