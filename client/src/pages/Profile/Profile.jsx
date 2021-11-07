import "./profile.scss";
import Topbar from "../../components/TopBar/TopBar";
import Sidebar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/RightBar/RightBar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import UserAPI from '../../api/UserAPI';

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      const userAPI = new UserAPI();
      const res = await userAPI.getById(id);
      setUser(res);
    };
    fetchUser();
  }, [id]);
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
                src={`${PUBLIC_FOLDER}/${user.coverPicture || 'person/noCover.png'}`}
                alt=""
              />
              <img
                className="profile-user-img"
                src={`${PUBLIC_FOLDER}/${user.profilePicture || 'person/noAvatar.png'}`}
                alt=""
              />
            </div>
            <div className="profile-info">
                <h4 className="profile-info-name">{user.username}</h4>
                <span className="profile-info-desc">{user.desc}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed userId={user._id} />
            <Rightbar userId={user._id}/>
          </div>
        </div>
      </div>
    </>
  );
}
