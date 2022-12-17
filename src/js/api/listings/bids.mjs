import { load } from "../../storage/index.mjs";
import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const action = "/listings";
const method = "POST";

export async function addBid(id, amount) {
  const addBidURL = `${API_AUCTION_URL}${action}/${id}/bids`;

  const response = await authFetch(addBidURL, {
    method,
    body: JSON.stringify({ amount: amount }),
  });

  const { userName } = await response.json();

  if (response.ok) {
    load("yourProfile", userName);
    location.href = `../../../../listing/index.html?id=${id}`;
    return await response.json();
  }

  throw new Error(response);
}
