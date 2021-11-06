import "./post.scss";
import { MoreVert } from '@mui/icons-material';
import { useState } from "react";

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        <img
                            className="post-profile-img"
                            src={`${PUBLIC_FOLDER}/${'noAvatar.png'}`}
                            alt=""
                        />
                        <span className="post-username">
                            {'username'}
                        </span>
                        <span className="post-date">{post.date}</span>
                        </div>
                    <div className="post-top-right">
                    <MoreVert />
                    </div>
                </div>
                <div className="post-center">
                    <span className="post-text">{post?.desc}</span>
                    <img className="post-img" src={`${PUBLIC_FOLDER}${post.photo}`} alt="" />
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <img className="like-icon" src={`${PUBLIC_FOLDER}/like.png`} onClick={likeHandler} alt="" />
                        <img className="like-icon" src={`${PUBLIC_FOLDER}/heart.png`} onClick={likeHandler} alt="" />
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