import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

function Image(imageInfo) {
  const { pictureUrl, imageId, move } = imageInfo;
  const [, drag] = useDrag(
    () => ({
      type: "image",
      item: { imageId, pictureUrl },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
          if (item.imageId !== dropResult.imageId) {
            move(item.imageId, dropResult.imageId);
          }
        }
      },
      collect: (monitor, props) => ({
        isDragging: monitor.isDragging(),
        info: props,
      }),
    }),
    [imageId]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "image",
      drop: () => ({ imageId }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [imageId]
  );

  const opacity = isOver ? 0.4 : 1;
  const imageWrapRef = useRef(null);
  drop(drag(imageWrapRef));
  return (
    <div className="image-wrap" ref={imageWrapRef} style={{ opacity }}>
      <img src={`${pictureUrl}`} alt={imageId}/>
    </div>
  );
}

export default Image;
