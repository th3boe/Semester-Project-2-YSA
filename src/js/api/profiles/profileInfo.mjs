import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../listings/authFetch.mjs";
import { load } from "../../storage/index.mjs";

const user = load("yourProfile");
const userName = user.name;

console.log(user);

const action = "/profiles";
const method = "GET";

const url = `${API_AUCTION_URL}${action}/${userName}`;
const title = document.querySelector("title");
const container = document.querySelector("#myProfile");

console.log(userName);
console.log(url);

export async function getProfile() {
  try {
    const response = await authFetch(url, { method });
    const profileInfo = await response.json();

    container.innerHTML = "";
    title.innerHTML = `Yard Sale Auctions | ${profileInfo.name}'s profile`;

    const avatarImage = profileInfo.avatar
      ? `<img
        src="${profileInfo.avatar}"
        onerror="this.src='/images/error-404-profile.webp';"
        alt="Avatar for ${profileInfo.name}"
        class="avatar-image"
      />`
      : "";

    container.innerHTML = `
      <div class="card text-center justify-content-center m-4 p-0">
        ${avatarImage}
        <h2>${profileInfo.name}</h2>
        <p class="listing-text my-3">${profileInfo.email}</p>

        <p class="text-muted mb-4">Wins: ${profileInfo.wins.length} <span class="mx-2">|</span> Listings: ${profileInfo._count.listings} </p>

        <div class="center-buttons">
            <div class="button-move"><a href="/profile/avatarEdit/"><button class="w-30 bttn btn-lg" type="button">Update Avatar</button></a></div>
            <div class="button-move"><a href="/"><button class="w-30 bttn btn-lg" type="button">My Listings</button></a></div>
            <div class="button-move"><a href="/"><button class="w-30 bttn btn-lg" type="button">All Listings</button></a></div>
        </div>

        <div class="card-footer d-flex justify-content-evenly text-center mt-5">
            <div class="px-3">
                <p class="mb-2 h5">${profileInfo.credits}</p>
                <p class="text-muted mb-0">Credits</p>
            </div>
        </div>

        </div>`;

    console.log(profileInfo);
  } catch (error) {
    console.log(error);
  }
}
getProfile();
