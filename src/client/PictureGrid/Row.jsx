import Image from "./Image";
import React from "react";

/**
 * Callback `move` to move images after drag and drop.
 *
 * @callback move
 * @param {string} from - Image Id of the dragging image.
 * @param {string} to - Image Id of the dropped on to image.
 */

/**
 *
 * @param {Array[Object]} pictureChunk - Array of with image info objects
 * @param {move} move - Callback that handles the drag and drop.
 *
 */
function Row({ pictureChunk, move }) {
  return (
    <div className="row">
      {pictureChunk.map(({ picture, id }) => {
        return (
          <Image pictureUrl={picture} imageId={id} move={move} key={id}></Image>
        );
      })}
    </div>
  );
}

export default Row;
