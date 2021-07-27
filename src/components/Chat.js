import React from "react";
import "./Chat.css";
import useRoom from "../hooks/useRoom";
import { useParams } from "react-router-dom";

export default function Chat({ user, page }) {
  const { roomId } = useParams();
  const room = useRoom(roomId, user.uid);

  return <div className="chat">Chat</div>;
}
