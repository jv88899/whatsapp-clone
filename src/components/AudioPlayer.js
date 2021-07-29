import { CircularProgress } from "@material-ui/core";
import { PauseRounded, PlayArrowRounded } from "@material-ui/icons";
import React from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({
  sender,
  audioUrl,
  id,
  setAudioId,
  audioId,
}) {
  const [isPlaying, setPlaying] = React.useState(false);
  const [isMediaLoaded, setMediaLoaded] = React.useState(false);
  const [isLoaded, setLoaded] = React.useState(false);
  const [isMetadataLoaded, setMetadataLoaded] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [duration, setDuration] = React.useState("");

  return (
    <>
      <div className={`audioplayer ${sender ? "" : "audioplayer__alt"}`}>
        {!isMediaLoaded ? (
          <CircularProgress />
        ) : isPlaying ? (
          <PauseRounded className="pause" />
        ) : !isPlaying ? (
          <PlayArrowRounded />
        ) : null}
        <div>
          <span
            style={{ width: `${sliderValue}%` }}
            className="audioplayer__slider--played"
          />
          <input
            type="range"
            min="1"
            max="100"
            value={sliderValue}
            className="audioplayer__slider"
          />
        </div>
      </div>
      <span className="chat__timestamp audioplayer__time">{duration}</span>
    </>
  );
}
