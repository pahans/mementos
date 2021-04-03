import "./placeholder.css";
import { Shimmer } from "react-shimmer";

function Placeholder({ width, height }) {
  return <Shimmer width={width} height={height} />;
}

export default Placeholder;
