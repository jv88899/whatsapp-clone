import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AddPhotoAlternate, ArrowBack, MoreVert } from "@material-ui/icons";
import Compressor from "compressorjs";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { createTimestamp, db, storage } from "../firebase";
import useChatMessages from "../hooks/useChatMessages";
import useRoom from "../hooks/useRoom";
import "./Chat.css";
import ChatFooter from "./ChatFooter";
import ChatMessages from "./ChatMessages";
import MediaPreview from "./MediaPreview";

export default function Chat({ user, page }) {
  const [image, setImage] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState(null);
  const [isDeleting, setDeleting] = React.useState(false);
  const [src, setSrc] = React.useState("");
  const [audioId, setAudioId] = React.useState("");

  const { roomId } = useParams();
  const history = useHistory();
  const messages = useChatMessages(roomId);
  const room = useRoom(roomId, user.uid);

  function onChange(event) {
    setInput(event.target.value);
  }

  async function sendMessage(event) {
    event.preventDefault();

    if (input.trim() || (input === "" && image)) {
      setInput("");
      if (image) {
        closePreview();
      }
      const imageName = uuid();
      const newMessage = image
        ? {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
            imageUrl: "uploading",
            imageName,
          }
        : {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
          };

      db.collection("users")
        .doc(user.uid)
        .collection("chats")
        .doc(roomId)
        .set({
          name: room.name,
          photoURL: room.photoURL || null,
          timestamp: createTimestamp(),
        });

      const doc = await db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add(newMessage);

      if (image) {
        new Compressor(image, {
          quality: 0.8,
          maxWidth: 1920,
          async success(result) {
            setSrc("");
            setImage(null);
            await storage.child(imageName).put(result);
            const url = await storage.child(imageName).getDownloadURL();
            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .doc(doc.id)
              .update({
                imageUrl: url,
              });
          },
        });
      }
    }
  }

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

  function closePreview() {
    setSrc("");
    setImage(null);
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
          <IconButton onClick={(event) => setOpenMenu(event.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            id="menu"
            keepMounted
            open={Boolean(openMenu)}
            onClose={() => setOpenMenu(null)}
            anchorEl={openMenu}
          >
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="chat__body--container">
        <div className="chat__body" style={{ height: page.height - 68 }}>
          <ChatMessages
            messages={messages}
            user={user}
            roomId={roomId}
            audioId={audioId}
            setAudioId={setAudioId}
          />
        </div>
      </div>
      <MediaPreview src={src} closePreview={closePreview} />
      <ChatFooter
        input={input}
        onChange={onChange}
        sendMessage={sendMessage}
        image={image}
        user={user}
        room={room}
        roomId={roomId}
        setAudioId={setAudioId}
      />
    </div>
  );
}
