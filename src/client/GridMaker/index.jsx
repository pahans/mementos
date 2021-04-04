import React from "react";
import "./index.css";
import { useSelectedPics, saveSelection } from "../lib/hooks";
import PicturePicker from "../PicturePicker";
import PictureGrid from "../PictureGrid";

/**
 * book id and gallery are hardcoded because we have not implementated users yet 
 * and we only support saving for one pastbook with fixed gallery only.
 * gallery id, book id should passed to the API in the proper implementation
 */
const GALLERY_ID = "1662ba2b-605f-4c63-84ce-59b2eb9c5679";
const BOOK_ID = "demo-book-id"

const MAX_PICTURE_SELECTION = 9;
const PICTURE_COUNT_PER_ROW = 3;
/**
 * Wrapper component for two main components, PictureGrid and Picture picker.
 */
function GridMaker() {
  const {
    data,
    error,
    isLoading,
    isValidating,
    revalidate,
  } = useSelectedPics(BOOK_ID);

  /**
   *  Revalidate data with the API.
   * @param {Object} newSelectedPictures - Array of object of new selected pictures.
   */
  const onChange = (newSelectedPictures) => {
    saveSelection(newSelectedPictures, GALLERY_ID, BOOK_ID).catch((e) => {
      console.error(e);
    });
    /**
     * We have pushed changes to server with POST request. It's time revalidate data.
     * Until Revalidation completes edit SWR cache
     * SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate).
     * more info here https://swr.vercel.app/
     */
    revalidate({
      ...data,
      selectedPictures: newSelectedPictures,
    });
  };
  // Data is loading from API
  if (isLoading) {
    return "loading";
  }
  // Error fetching data
  if (error) {
    return "error";
  }

  return (
    <div className="grid-maker">
      { isValidating && <div className="notification-bar">Syncing Up Data...</div>}
      <div className="column-left">
        <PicturePicker
          galleryId={GALLERY_ID}
          onChange={onChange}
          selectedPictures={data.selectedPictures}
          maxSelection={MAX_PICTURE_SELECTION}
        />
      </div>
      <div className="column-right">
        <div>
          Select your favourite pictures from left panel. Selected Pictures will
          appear below. <b>Drag and drop to rearrange.</b>
        </div>
        <PictureGrid
          onChange={onChange}
          selectedPics={data.selectedPictures}
          columnCount={PICTURE_COUNT_PER_ROW}
        />
      </div>
    </div>
  );
}

export default GridMaker;
