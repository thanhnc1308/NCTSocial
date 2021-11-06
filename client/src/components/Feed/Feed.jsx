import Share from '../Share/Share';
import Post from "../Post/Post";
import './feed.scss';
import { useEffect, useState } from 'react';
import PostAPI from '../../api/PostAPI.js';

export default function Feed() {
    const postAPI = new PostAPI()
    const [posts, setPost] = useState([]);

    // Fetch posts when finishing rendering Feed component
    useEffect(() => {
        const fetchPosts = async () => {
            const data = await postAPI.getAll();
            setPost(data);
        }
        fetchPosts();
    }, [])
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
