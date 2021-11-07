import Share from '../Share/Share';
import Post from "../Post/Post";
import './feed.scss';
import { useContext, useEffect, useState } from 'react';
import PostAPI from '../../api/PostAPI.js';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

export default function Feed() {
    const [posts, setPost] = useState([]);
    const { user } = useContext(AuthContext);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchPosts = async () => {
            const postAPI = new PostAPI()
            const data = await postAPI.getTimelinePosts(user._id);
            setPost(data);
        }
        fetchPosts();
    }, [user._id])
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share/>
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
            </div>
        </div>
    )
}
