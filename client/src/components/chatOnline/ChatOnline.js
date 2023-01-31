import React, { useEffect, useState } from "react";
import axios from "axios";

import "./chatOnline.css";

function ChatOnline({ onlineUser, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriend, setOnlineFriend] = useState([]);
  useEffect(() => {
    const getFriend = async () => {
      const res = await axios.get("/users/friend/" + currentId);
      setFriends(res.data);
      console.log(res.status);
    };
    getFriend();
  }, [currentId]);
  useEffect(() => {
    setOnlineFriend(
      friends.filter((friend) => onlineUser.includes(friend._id))
    );
  }, [friends, onlineUser]);
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {}
  };
  return (
    <div className="chatOnline">
      {onlineFriend.map((online) => (
        <div
          key={online._id}
          className="chatOnlineFriend"
          onClick={() => {
            handleClick(online);
          }}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/download-anh-dai-dien-avt-anime.jpg"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{online.username}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
