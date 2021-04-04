import Image from "react-shimmer";
import Placeholder from "../lib/Placeholder";
import { useCallback } from "react";

/**
 * Ignore check change event because we are handling it in the wrapped div/image.
 */
const ignoreCheckboxChange = () => {};

/**
 * Callback `onSelectedPicsChange` to change selected pictures list when selections changes.
 *
 * @callback onSelectedPicsChange
 * @param {Object} selectedPics - object with information of new selected picture.
 */

/**
 *
 * @param {Object} pictureInfo - Object with picture information.
 * @param {onSelectedPicsChange} onCheckChange - Callback for onChange picture selection.
 */
function SelectableImage({ pictureInfo, onChange: onCheckChange, isSelected }) {
  /**
   * onClick on div/image
   */
  const onChange = useCallback(() => {
    onCheckChange(pictureInfo);
  }, [pictureInfo, onCheckChange]);

  return (
    <div className="img-wrap" onClick={onChange}>
      <div className="check">
        <input
          type="checkbox"
          onChange={ignoreCheckboxChange}
          checked={isSelected}
        />
      </div>
      <Image
        src={pictureInfo.pictureSmall}
        fallback={<Placeholder width={400} height={400}></Placeholder>}
      />
    </div>
  );
}

export default SelectableImage;
