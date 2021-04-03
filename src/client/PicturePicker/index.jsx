import SelectableImage from "./SelectableImage";
import { usePicLibrary } from "../lib/hooks";
import "./picker.css";

function ImagePicker({ galleryId, onChange, selectedPictures=[] }) {
  const { data, error, isLoading } = usePicLibrary(galleryId);
  if (isLoading) {
    return "loading";
  }
  if (error) {
    return "error";
  }
  return (
    <div className="selector-wrapper">
      {
        data.entries.map((pictureInfo) => {
          const isSelected = selectedPictures.some((selected)=> pictureInfo.id === selected.id);
          return (
            <SelectableImage
              isSelected={isSelected}
              pictureInfo={pictureInfo}
              key={pictureInfo.id}
              onChange={onChange}
            />
          );
        })
      }
    </div>
  );
}

export default ImagePicker;
