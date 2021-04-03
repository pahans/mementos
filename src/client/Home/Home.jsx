import { useEffect, useReducer } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PicturePicker from "../PicturePicker";
import Row from "./Row";
import { chunk } from "../lib/utils";

const GALLERY_ID = "1662ba2b-605f-4c63-84ce-59b2eb9c5679"

const PICTURE_COUNT_FOR_ROW = 3;

function reducer(state, action) {
  switch (action.type) {
    case "toggle-check":
      const index = state.selectedPictures.findIndex(
        (item) => item.id === action.payload.pictureInfo.id
      );
      if (index > -1) {
        const selectedPictures = update(state, {
          selectedPictures: {
            $splice: [[index, 1]],
          },
        }).selectedPictures;
        
        return {
          ...state,
          selectedPictures,
        };
      }
      return {
        ...state,
        selectedPictures: [...state.selectedPictures, action.payload.pictureInfo],
      };
    case "move":
      const indexTo = state.selectedPictures.findIndex(
        (item) => item.id === action.payload.to
      );
      const indexFrom = state.selectedPictures.findIndex(
        (item) => item.id === action.payload.from
      );
      const fromInfo = state.selectedPictures[indexFrom];

      const selectedPictures = update(state, {
        selectedPictures: {
          $splice: [
            [indexFrom, 1],
            [indexTo, 0, fromInfo],
          ],
        },
      }).selectedPictures;
      return {
        ...state,
        selectedPictures: [...selectedPictures],
      };
    default:
      return state;
  }
}

function Home({
  pictures,
  error,
  isLoading,
  selectedPics = [],
  onSelectionChange,
}) {
  const initialState = { selectedPictures: selectedPics };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onSelectionChange(state.selectedPictures);
  }, [state.selectedPictures, onSelectionChange]);

  const onSelect = (pictureInfo) => {
    dispatch({
      type: "toggle-check",
      payload: {
        pictureInfo,
      },
    });
  };

  if (isLoading) {
    return "loading";
  }
  if (error) {
    return "error";
  }

  const pictureChunks = chunk(state.selectedPictures, PICTURE_COUNT_FOR_ROW);
  const move = (from, to) => {
    dispatch({
      type: "move",
      payload: {
        from,
        to,
      },
    });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="picture-selector">
        <PicturePicker
          galleryId={GALLERY_ID}
          onChange={onSelect}
          selectedPictures={state.selectedPictures}
        ></PicturePicker>
      </div>
      <div className="photo-grid">
        <div className="wrapper">
          {pictureChunks.map((pictureChunk) => {
            return <Row pictureChunk={pictureChunk} move={move} />;
          })}
        </div>
      </div>
    </DndProvider>
  );
}

export default Home;
