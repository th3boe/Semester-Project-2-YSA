import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "../../../../index.html";

const action = "/listings";
const method = "GET";

const url = `${API_AUCTION_URL}${action}/${id}?_seller=true&_bids=true`;

const title = document.querySelector("title");

const container = document.querySelector("#singleListing");

(async function getSingleListing() {
  try {
    const response = await authFetch(url, { method });
    const singleListing = await response.json();

    title.innerHTML = `Yard Sale Auctions | ${singleListing.title}`;

    const image = singleListing.media
      ? `<img
      src="${singleListing.media}"
      alt="Image for ${singleListing.title}"
      class="auction-image"
    />`
      : "";

    const avatarImage = singleListing.avatar
      ? `<img
      src="${singleListing.seller.avatar}"
      alt="Avatar for ${singleListing.seller.name}"
      class="seller-image"
    />`
      : "";

    container.innerHTML = `
    <div class="card text-center justify-content-center m-4 p-0">
      <h2 class="card-header">${singleListing.title}</h2>
      <p class="listing-text my-3">${singleListing.description}</p>
      ${image}
      <p>${singleListing.tags}</p>
      <h3>Information about the seller of this item:</h3>
      <p>Name: ${singleListing.seller.name}</p>
      <p>Email: ${singleListing.seller.email}</p>
      ${avatarImage}
      <h4>Bids:</h4>
      <p>Current bids on this item: ${singleListing.bids[10].amount}</p>
      <p>Top bidder: ${singleListing.bids[10].bidderName}</p>
      <p>Highest bid created: ${singleListing.bids[10].created}</p>
      <p class="card-footer text-muted m-0">${singleListing.endsAt}</p>
      </div>


    <div class="center-buttons mb-3">
    <div class="button-move"><a href="/listing/bid/?id=${singleListing.id}"><button class="w-30 bttn btn-lg" type="button">Add a Bid</button></a></div>
      <div class="button-move"><a href="/listing/edit/?id=${singleListing.id}"><button class="w-30 bttn btn-lg" type="button">Edit Listing</button></a></div>
      <div class="button-move"><button class="w-30 bttn btn-lg" type="button" id="delete" singleListing-delete="${singleListing.id}">Delete Listing</button></div>
    </div>`;

    const deleteBtn = document.querySelector("#delete");
    deleteBtn.addEventListener("click", deleteListing);
  } catch (error) {
    console.log(error);
  }
})();
