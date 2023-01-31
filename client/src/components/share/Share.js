import { useContext, useRef, useState } from "react";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";

export default function Share() {
  const [file, setFile] = useState(null);

  const { user } = useContext(AuthContext);
  const decsRef = useRef();

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSharePost = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: decsRef.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);

      newPost.img = file.name;
      try {
        axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      axios.post("/posts", newPost);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
                : `${PUBLIC_FOLDER}noavatar.png`
            }
            alt=""
          />
          <input
            ref={decsRef}
            placeholder={`What's in your mind ${user.username} ?`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              style={{ width: "100px" }}
            />
            <Cancel onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSharePost}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
