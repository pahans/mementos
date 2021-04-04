import SelectableImage from "./SelectableImage";
import { usePicLibrary } from "../lib/hooks";
import { toast } from 'react-toastify';
import "./index.css";

/**
 * Callback `onSelectedPicsChange` to change selected pictures list when selections changes.
 *
 * @callback onSelectedPicsChange
 * @param {Object} selectedPics - Array of object of new selected pictures.
 */

/**
 * 
 * @param {String} galleryId - gallery Id
 * @param {Object} selectedPictures - Array of selected pictures information.
 * @param {number} maxSelection - Maximum number of images can be picked, must be an integer. 
 * @param {onSelectedPicsChange} onChange - Callback for onChange picture selection.
 */
function ImagePicker({ galleryId, onChange, selectedPictures = [], maxSelection }) {
  const { data, error, isLoading } = usePicLibrary(galleryId);
  if (isLoading) {
    return "loading";
  }
  if (error) {
    return "error";
  }
  /**
   * 
   * @param {boolean} isSelected - Is currently this picture is selected.
   * @param {Object} selectedPictureInfo - Object with picture information.
   */
  const toggleState = (isSelected, selectedPictureInfo) => {
    let newSelectedPictures = [];
    if (isSelected) {
      newSelectedPictures = selectedPictures.filter((pictureInfo) => {
        return pictureInfo.id !== selectedPictureInfo.id;
      });
      onChange(newSelectedPictures);
    } else {
      if(selectedPictures.length < maxSelection) {
        newSelectedPictures = [...selectedPictures, selectedPictureInfo];
        onChange(newSelectedPictures);
      }
      if(selectedPictures.length >= maxSelection) {
        toast.warn('Sorry, You can only select 9 pictures', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } 
    }
  };
  return (
    <div className="picture-picker">
      {data.entries.map((pictureInfo) => {
        const isSelected = selectedPictures.some(
          (selected) => pictureInfo.id === selected.id
        );
        return (
          <SelectableImage
            isSelected={isSelected}
            pictureInfo={pictureInfo}
            key={pictureInfo.id}
            onChange={() => {
              toggleState(isSelected, pictureInfo);
            }}
          />
        );
      })}
    </div>
  );
}

export default ImagePicker;
