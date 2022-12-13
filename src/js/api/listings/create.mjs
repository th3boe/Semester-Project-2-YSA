import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const action = "/listings";
const method = "POST";

export async function createListing(postData) {
  const createListingURL = API_AUCTION_URL + action;

  try {
    const response = await authFetch(createListingURL, {
      method,
      body: JSON.stringify(postData),
    });

    location.href = "../../../../index.html";
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
