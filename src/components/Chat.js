import React from "react";
import "./Chat.css";
import useRoom from "../hooks/useRoom";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import MediaPreview from "./MediaPreview";
import { useHistory, useParams } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AddPhotoAlternate, ArrowBack, MoreVert } from "@material-ui/icons";

export default function Chat({ user, page }) {
  const [image, setImage] = React.useState(null);
  const [src, setSrc] = React.useState("");

  const { roomId } = useParams();
  const room = useRoom(roomId, user.uid);
  const history = useHistory();

  function showPreview(event) {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSrc(reader.result);
      };
    }
  }

  return (
    <div className="chat">
      <div style={{ height: page.height }} className="chat__background" />
      <div className="chat__header">
        {page.isMobile && (
          <IconButton onClick={history.goBack}>
            <ArrowBack />
          </IconButton>
        )}
        <div className="avatar__container">
          <Avatar src={room?.photoURL} />
        </div>
        <div className="chat__header--info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>
        <div className="chat__header--right">
          <input
            id="image"
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            onChange={showPreview}
          />
          <IconButton>
            <label style={{ cursor: "pointer", height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <Menu id="menu" keepMounted open={false}>
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="chat__body--container">
        <div className="chat__body" style={{ height: page.height - 68 }}>
          <ChatMessages />
        </div>
      </div>
      <MediaPreview src={src} />
      <ChatFooter />
    </div>
  );
}
