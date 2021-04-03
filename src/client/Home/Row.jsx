import Image from "./Image";
import React from "react";

function Row({ pictureChunk, move }) {
  return (
    <div className="row">
      {
        pictureChunk.map(({ picture, id }) => {
          return <Image pictureUrl={picture} imageId={id} move={move}></Image>;
        })
      }
    </div>
  );
}

export default Row;
