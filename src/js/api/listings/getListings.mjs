import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";
import { renderListings } from "../../templates/renderListings.mjs";
import { searchListings } from "../globals/searchListings.mjs";

const action = "/listings";
const method = "GET";

(async function getListings() {
  const url = `${API_AUCTION_URL}${action}`;

  try {
    const response = await authFetch(url, method);
    const json = await response.json();

    if (response.status === 200) {
      renderListings(json);
      searchListings(json);
    }

    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();
