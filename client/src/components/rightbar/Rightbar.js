import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import "./rightbar.css";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispath } = useContext(AuthContext);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(
      currentUser.followings.includes(user?._id)
    );
    // get friend
    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friend/" + user._id);
          setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }, [user]);

    // get followed
    // useEffect(() => {
    //   setFollowed(currentUser.followings.includes(user?._id));
    // }, [currentUser, user?._id]);

    //
    const handleFollow = async () => {
      try {
        if (followed) {
          await axios.put("/users/" + user._id + "/unfollow", {
            userId: currentUser._id,
          });
          dispath({ type: "UNFOLLOW", payload: currentUser._id });
        } else {
          await axios.put("/users/" + user._id + "/follow", {
            userId: currentUser._id,
          });
          dispath({ type: "FOLLOW", payload: currentUser._id });
        }
      } catch (error) {}
      setFollowed(!followed);
      console.log(currentUser);
    };
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="reightbarFollowButton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing">
              <img
                src={
                  friend.profilePicture
                    ? PUBLIC_FOLDER + friend.profilePicture
                    : `${PUBLIC_FOLDER}/person/2.jpeg`
                }
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
