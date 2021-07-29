import {
  CancelRounded,
  CheckCircleRounded,
  MicRounded,
  ReceiptRounded,
  Send,
} from "@material-ui/icons";
import React from "react";
import "./ChatFooter.css";
import recordAudio from "./recordAudio";

export default function ChatFooter({
  input,
  onChange,
  sendMessage,
  image,
  user,
  room,
  roomId,
  setAudioId,
}) {
  const [isRecording, setRecording] = React.useState(false);

  const recordingEl = React.useRef();
  const record = React.useRef();
  const inputRef = React.useRef();

  async function startRecording(event) {
    event.preventDefault();
    record.current = await recordAudio();
    inputRef.current.focus();
    inputRef.current.style.width = "calc(100% - 56px)";
    setRecording(true);
    setAudioId("");
  }

  React.useEffect(() => {
    if (isRecording) {
      recordingEl.current.style.opacity = "1";
      record.current.start();
    }
  }, [isRecording]);

  const btnIcons = (
    <>
      <Send style={{ width: 20, height: 20, color: "white" }} />
      <MicRounded style={{ width: 24, height: 24, color: "white" }} />
    </>
  );

  const canRecord = navigator.mediaDevices.getUserMedia && window.MediaRecorder;

  return (
    <div className="chat__footer">
      <form>
        <input
          ref={inputRef}
          value={input}
          onChange={!isRecording ? onChange : null}
          placeholder="Type a message"
        />
        {canRecord ? (
          <button
            onClick={
              input.trim() || (input === "" && image)
                ? sendMessage
                : startRecording
            }
            type="submit"
            className="send__btn"
          >
            {btnIcons}
          </button>
        ) : (
          <>
            <label htmlFor="capture" className="send__btn">
              {btnIcons}
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="capture"
              accept="audio/*"
              capture
            />
          </>
        )}
      </form>
      {isRecording && (
        <div ref={recordingEl} className="record">
          <CancelRounded style={{ width: 30, height: 30, color: "#f20519" }} />
          <div>
            <div className="record__redcircle" />
            <div className="record__duration" />
          </div>
          <CheckCircleRounded
            style={{ width: 30, height: 30, color: "#41bf49" }}
          />
        </div>
      )}
    </div>
  );
}
