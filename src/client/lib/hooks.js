import useSWR from "swr";
import fetch from "unfetch";

const GALLERY_ENDPOINT = "/api/v1/gallery";
const SELECTED_PICS_ENDPOINT = "/api/v1/past-book";

/**
 * Fetch Gallery from galleryId.
 * @param {String} url - URL of the rest API
 * @param {String} galleryId - gallery Id
 * @returns {Promise} Promise which return json of gallery object from API.
 */
const fetchWithGallery = (url, galleryId) => {
  return fetch(`${url}/${galleryId}`).then((r) => r.json());
};

/**
 * Fetch Pastbook from bookId.
 * @param {String} url - URL of the rest API
 * @param {String} bookId - Book ID
 * @returns {Promise} Promise which return json of past book object from API.
 */
const fetchWithPastBook = (url, bookId) => {
  return fetch(`${url}/${bookId}`).then((r) => r.json());
};

/**
 * @typedef {Object} FetchResult
 * @property {Object|undefined} data - Json data from the API. Undefined if data is pending.
 * @property {Object|undefined} error - Error message if error occurred.
 * @property {boolean} isValidating - True if SWR is validating cached data with the API.
 * @property {boolean} isLoading - True if API call has not returned yet
 */

/**
 * React hoook for data fetch from gallery API
 * @param {String} galleryId - Gallery ID
 * @returns {FetchResult} Information about fetch status/data
 */
export function usePicLibrary(galleryId) {
  const { data, error } = useSWR(
    [GALLERY_ENDPOINT, galleryId],
    fetchWithGallery
  );
  return {
    data,
    error,
    isLoading: !data && !error,
  };
}

/**
 * React hoook for data fetch from book API
 * @param {String} bookId - book ID
 * @returns {FetchResult} Information about fetch status/data
 */
export function useSelectedPics(bookId) {
  const { data, error, mutate, isValidating } = useSWR(
    [SELECTED_PICS_ENDPOINT, bookId],
    fetchWithPastBook
  );
  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
    revalidate: (newData) => {
      mutate(newData, true);
    },
  };
}

/**
 * Save Selected data in to API
 * @param {Object} selectedPictures - Array of selected pictures information.
 * @param {String} galleryId - gallery Id
 * @param {String} bookId - Book ID
 * @returns {Promise} Promise which returns a json object.
 */
export function saveSelection(selectedPictures, galleryId, bookId) {
  return fetch(`${SELECTED_PICS_ENDPOINT}/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedPictures, galleryId: galleryId }),
  });
}
