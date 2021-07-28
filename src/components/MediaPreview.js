import { CloseRounded } from "@material-ui/icons";
import "./MediaPreview.css";

export default function MediaPreview({ src }) {
  if (!src) return null;

  return (
    <div className="mediaPreview">
      <CloseRounded />
      <img src={src} alt="Preview" />
    </div>
  );
}
