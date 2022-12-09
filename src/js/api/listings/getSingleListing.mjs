import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";
import { deleteListing } from "./deleteListing.mjs";

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

    const bids = singleListing.bids[1]
      ? `<p>Current bids on this item: ${singleListing.bids[1].amount}</p>
      <p>Top bidder: ${singleListing.bids[1].bidderName}</p>
      <p>Highest bid created: ${singleListing.bids[1].created}</p>`
      : "<p> no bids yet! </p>";

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
      ${bids}
      <p class="card-footer text-muted m-0">${singleListing.endsAt}</p>
      </div>


    <div class="center-buttons mb-3">
      <button class="w-30 bttn btn-lg" id="delete" type="button" data-delete="${singleListing.id}">Delete Listing</button>
      <a href="/listing/bid/?id=${singleListing.id}"><button class="w-30 bttn btn-lg" type="button">Add a Bid</button></a>
      <a href="/listing/edit/?id=${singleListing.id}"><button class="w-30 bttn btn-lg" type="button">Edit Listing</button></a>
    </div>`;

    const deleteBtn = document.querySelector("#delete");
    deleteBtn.addEventListener("click", deleteListing);
  } catch (error) {
    console.log(error);
  }
})();
