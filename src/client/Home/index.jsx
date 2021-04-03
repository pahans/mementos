import { useSelectedPics, saveSelection } from "../lib/hooks";
import Home from "./Home";

function Container() {
  const {
    data: selectedPics,
    error,
    isLoading,
  } = useSelectedPics();

  const onSelectionChange = (selected) => {
    saveSelection(selected).catch((e) => {
        console.error(e);
    });
  };

  if (isLoading) {
    return "loading";
  }
  if (error) {
    return "error";
  }

  return (
    <Home
      onSelectionChange={onSelectionChange}
      selectedPics={selectedPics.selectedPictures}
    ></Home>
  );
}

export default Container;
