import useSWR from "swr";
import fetch from "unfetch";

const GALLERY_ENDPOINT = "/api/v1/gallery";
const SELECTED_PICS_ENDPOINT = "/api/v1/past-book/demo-book-id";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function usePicLibrary(galleryId) {
  const { data, error } = useSWR(GALLERY_ENDPOINT, fetcher);
  return {
    data,
    error,
    isLoading: !data && !error,
  };
}

export function useSelectedPics() {
  const { data, error, mutate } = useSWR(SELECTED_PICS_ENDPOINT, fetcher);
  return {
    data,
    error,
    isLoading: !data && !error,
    revalidate: (newData) => {
      mutate(newData, true);
    },
  };
}

export function saveSelection(selectedPictures) {
  return fetch(SELECTED_PICS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedPictures }),
  });
}
