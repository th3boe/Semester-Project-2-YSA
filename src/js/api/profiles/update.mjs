import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../listings/authFetch.mjs";
import { load } from "../../storage/index.mjs";

const user = load("yourProfile");
const userName = user.name;

console.log(user);

const action = "/profiles";
const method = "PUT";

export async function updateAvatar(avatarData) {
  if (!avatarData.userName) {
    throw new Error("No update available");
  }

  const updateAvatarURL = `${API_AUCTION_URL}${action}/${userName}/media`;

  const response = await authFetch(updateAvatarURL, {
    method: method,
    body: JSON.stringify(avatarData),
  });

  location.href = `../../../../profile/profile/`;
  return await response.json();
}
