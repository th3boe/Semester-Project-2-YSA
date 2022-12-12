import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../listings/authFetch.mjs";
import { load } from "../../storage/index.mjs";

const action = "/profiles";
const method = "PUT";

/**
 * Function to update the user profile avatar!
 * @param {string} profileData
 * @returns
 */

export async function updateAvatar(profileData) {
  const user = load("yourProfile");
  const userName = user.name;
  const updateAvatarURL = `${API_AUCTION_URL}${action}/${userName}/media`;

  console.log(updateAvatarURL);

  if (!user) {
    throw new Error("Requires a User!");
  }

  const response = await authFetch(updateAvatarURL, {
    method,
    body: JSON.stringify(profileData),
  });

  location.href = `../../../../profile/profile/`;
  return await response.json();
}
