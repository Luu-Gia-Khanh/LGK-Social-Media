import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const param = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${param.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [param.username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || `${PUBLIC_FOLDER}nocover.jpg`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || `${PUBLIC_FOLDER}noavatar.png`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={param.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
