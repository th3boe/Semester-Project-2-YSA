import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const action = "/listings/";
const method = "DELETE";

export async function deleteListing() {
  const id = this.dataset.delete;
  const url = API_AUCTION_URL + action + id;

  if (id) {
    console.log("URL:", url);

    try {
      const response = await authFetch(url, { method });
      const singleListing = await response.json();

      location.href = "../../../index.html";
    } catch (error) {
      console.log(error);
    }
  }
}
