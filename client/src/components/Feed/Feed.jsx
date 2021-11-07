import Share from '../Share/Share';
import Post from "../Post/Post";
import './feed.scss';
import { useContext, useEffect, useState } from 'react';
import PostAPI from '../../api/PostAPI.js';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

export default function Feed({ userId }) {
    const [posts, setPost] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchPosts = async () => {
            const postAPI = new PostAPI()
            const id = userId || currentUser._id;
            const data = await postAPI.getTimelinePosts(id);
            setPost(data);
        }
        fetchPosts();
    }, [userId, currentUser._id])
    return (
        <div className="feed">
            <div className="feed-wrapper">
                { (!userId || userId === currentUser._id) && <Share/> }
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
            </div>
        </div>
    )
}
