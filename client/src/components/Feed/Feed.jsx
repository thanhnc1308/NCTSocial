import Share from '../Share/Share';
import Post from "../Post/Post";
import './feed.scss';
import { Posts } from "../../fakeData";

export default function Feed() {
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share/>
                {
                    Posts.map((p) => (
                        <Post key={p.id} post={p} />
                    ))
                }
            </div>
        </div>
    )
}
