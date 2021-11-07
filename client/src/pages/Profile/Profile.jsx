import "./profile.scss";
import Topbar from "../../components/TopBar/TopBar";
import Sidebar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/RightBar/RightBar";
import { useParams } from "react-router";

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { userId } = useParams();
  console.log(userId);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-cover-img"
                src={`${PUBLIC_FOLDER}/post/3.jpeg`}
                alt=""
              />
              <img
                className="profile-user-img"
                src={`${PUBLIC_FOLDER}/person/7.jpeg`}
                alt=""
              />
            </div>
            <div className="profile-info">
                <h4 className="profile-info-name">Safak Kocaoglu</h4>
                <span className="profile-info-desc">Hello my friends!</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
