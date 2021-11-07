import "./post.scss";
import { MoreVert, ThumbUp } from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";
import { format } from 'timeago.js';
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Log } from '../../utils/Log';
import PostAPI from "../../api/PostAPI";

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useContext(AuthContext);
    const postAPI = new PostAPI();

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
    }, [user._id, post.likes])

    const handleClickLike = async () => {
        try {
            postAPI.toggleLike(post._id, user._id);
            setLike(isLiked ? like-1 : like+1)
            setIsLiked(!isLiked)
        } catch (e) {
            Log.exception(e);
        }
    }

    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        <img
                            className="post-profile-img"
                            src={`${PUBLIC_FOLDER}/${user.profilePicture || 'person/noAvatar.png'}`}
                            alt=""
                        />
                        <span className="post-username">
                            {user.username || 'username'}
                        </span>
                        <span className="post-date">{format(post.createdAt)}</span>
                        </div>
                    <div className="post-top-right">
                    <MoreVert />
                    </div>
                </div>
                <div className="post-center">
                    <span className="post-text">{post?.desc}</span>
                    { post.photo && <img className="post-img" src={`${PUBLIC_FOLDER}/${post.photo}`} alt="" /> }
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <ThumbUp className={`like-icon ${isLiked ? 'liked' : ''}`} onClick={handleClickLike} />
                        <span className="post-like-counter">{like} people liked it</span>
                    </div>
                    <div className="post-bottom-right">
                        <span className="post-comment-text">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}