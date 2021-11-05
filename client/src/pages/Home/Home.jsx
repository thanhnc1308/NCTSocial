import Feed from '../../components/Feed/Feed';
import RightBar from '../../components/RightBar/RightBar';
import SideBar from '../../components/SideBar/SideBar';
import TopBar from '../../components/TopBar/TopBar';
import './home.scss';

export default function Home() {
    return (
        <>
            <TopBar/>
            <div className="home-container d-flex">
                <SideBar/>
                <Feed/>
                <RightBar/>
            </div>
        </>
    )
}
