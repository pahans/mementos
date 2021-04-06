import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const IMAGE_DRAG_TYPE = "image";
/**
 * Callback `move` to move images after drag and drop.
 *
 * @callback move
 * @param {string} from - Image Id of the dragging image.
 * @param {string} to - Image Id of the dropped on to image.
 */

/**
 *
 * Placeholder component for image lazy loading.
 * @param { string } pictureUrl - Url of the image
 * @param { string } imageId - Image Id (unique)
 * @param {move} move - Callback that handles the drag and drop.
 */
function Image({ pictureUrl, imageId, move }) {
  const [, drag] = useDrag(
    () => ({
      type: IMAGE_DRAG_TYPE,
      item: { imageId },
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
    [imageId, move]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: IMAGE_DRAG_TYPE,
      drop: () => ({ imageId }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [imageId, move]
  );

  const opacity = isOver ? 0.4 : 1;
  const imageWrapRef = useRef(null);
  drop(drag(imageWrapRef));
  const onDrop = (e)=>{e.preventDefault()};
  return (
    <div className="image-wrap" ref={imageWrapRef} style={{ opacity }}>
      <img src={`${pictureUrl}`} alt={imageId} onDrop={onDrop} />
    </div>
  );
}

export default Image;
