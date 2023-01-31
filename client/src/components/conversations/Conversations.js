import React, { useEffect, useState } from "react";
import axios from "axios";
import "./conversations.css";

function Conversations({ conversation, currentUser }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  useEffect(() => {
    const friendId = conversation.members.find(
      (uId) => uId !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PUBLIC_FOLDER + user.profilePicture
            : `${PUBLIC_FOLDER}noavatar.png`
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversations;
