import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Row from "./Row";
import { chunk } from "../lib/utils";
import "./index.css";

/**
 * Callback `onSelectedPicsChange` to change selected pictures list when selections changes.
 *
 * @callback onSelectedPicsChange
 * @param {Object} selectedPics - Array of object of new selected pictures.
 */

/**
 * Renders a Drag and dropable picture grid. Number of pictures and pictures per row in the grid is customizable.
 * @param {Object} selectedPics - Array of object of selected pictures. 
 * @param {onSelectedPicsChange} onChange - Callback that handles the change of selectedPics when checked/unchecked.
 */
function PictureGrid({
  selectedPics = [],
  onChange,
  columnCount = 3
}) {
  const pictureChunks = chunk(selectedPics, columnCount);
  const move = (from, to) => {
    const indexTo = selectedPics.findIndex(
      (item) => item.id === to
    );
    const indexFrom = selectedPics.findIndex(
      (item) => item.id === from
    );
    const fromInfo = selectedPics[indexFrom];

    const selectedPictures = update(selectedPics, {
        $splice: [
          [indexFrom, 1],
          [indexTo, 0, fromInfo],
        ],
    });
    onChange(selectedPictures);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="picture-grid">
        {pictureChunks.map((pictureChunk, i) => {
          return <Row pictureChunk={pictureChunk} move={move} key={i}/>;
        })}
      </div>
    </DndProvider>
  );
}

export default PictureGrid;
