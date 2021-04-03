import Image from "react-shimmer";
import Placeholder from "../lib/Placeholder";
import { useCallback } from "react";

/**
 * Ignore check change event because we are handling it in the wrapped div/image.
 */
const ignoreCheckboxChange = () => {};

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
        <input type="checkbox" onChange={ignoreCheckboxChange} checked={isSelected}/>
      </div>
      <Image
        src={pictureInfo.pictureSmall}
        fallback={<Placeholder width={150} height={200}></Placeholder>}
      />
    </div>
  );
}

export default SelectableImage;
