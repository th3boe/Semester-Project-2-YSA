import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";
import { deleteListing } from "./deleteListing.mjs";
import { load } from "../../storage/index.mjs";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "../../../../index.html";

const action = "/listings";
const method = "GET";

const url = `${API_AUCTION_URL}${action}/${id}?_seller=true&_bids=true`;
const title = document.querySelector("title");
const container = document.querySelector("#singleListing");
const addButtonContainer = document.querySelector("#listingButtons");

(async function getSingleListing() {
  try {
    const response = await authFetch(url, { method });
    const singleListing = await response.json();

    const seller = singleListing.seller.name;
    const { name } = load("yourProfile");

    title.innerHTML = `Yard Sale Auctions | ${singleListing.title}`;

    const image = singleListing.media
      ? `<img
      src="${singleListing.media}"
      alt="Image for ${singleListing.title}"
      class="auction-image"
    />`
      : "";

    const avatarImage = singleListing.seller.avatar
      ? `<img
      src="${singleListing.seller.avatar}"
      alt="Avatar for ${singleListing.seller.name}"
      class="seller-image"
    />`
      : "";

    const bidHistory = singleListing;
    for (var i = 0; i < singleListing.bids.length; i++) {
      console.log(singleListing.bids[i]);
    }

    const sortedBids = bidHistory.bids.sort((a, b) => b.amount - a.amount);
    const bids = sortedBids[0]
      ? `<p class="bids-info">Currently the latest bid made is: </p><p>${
          singleListing.bids[0].amount
        } Credits by ${
          singleListing.bids[0].bidderName
        } </p> <p class="bids-info"> Created at: </p> <p>${new Date(
          singleListing.bids[0].created
        ).toDateString()} at ${new Date(
          singleListing.bids[0].created
        ).toLocaleTimeString()}</p>`
      : "";

    container.innerHTML = `
    <div class="card text-center justify-content-center m-4 p-0">
      <h2 class="card-header">${singleListing.title}</h2>
      <p class="listing-text my-3">${singleListing.description}</p>
      ${image}
      <p>${singleListing.tags}</p>
      <p>Closes at: </br> ${new Date(
        singleListing.endsAt
      ).toDateString()} at ${new Date(
      singleListing.endsAt
    ).toLocaleTimeString()}</p>
      <div class="card text-center justify-content-center m-2 p-3">
        ${bids}
        <p class="bids-info">Amount of bids on this item is: </br> ${
          singleListing._count.bids
        }</h4>
      </div>
      <div class="card-footer text-muted m-0">
        <h3>Information about the seller:</h3>
        ${avatarImage}
        <p>The seller is ${singleListing.seller.name}</p>
        <p>Contact the seller by email: ${singleListing.seller.email}</p>
      </div>
    </div>`;

    if (seller === name) {
      console.log("This was created by you!");
      addButtonContainer.innerHTML = `
        <div class="center-buttons m-3">
        <button class="w-30 bttn btn-lg" id="delete" type="button" data-delete="${singleListing.id}">Delete Listing</button>
        <a href="/listing/edit/?id=${singleListing.id}"><button class="w-30 bttn btn-lg" type="button">Edit Listing</button></a>
      </div>`;
      addButtonContainer.classList = "visual-btn";

      const deleteBtn = document.querySelector("#delete");
      deleteBtn.addEventListener("click", deleteListing);
    } else {
      console.log("This was not your genious creation!");
      addButtonContainer.innerHTML = `
          <div class="center-buttons m-3">
          <a href="/listing/bid/?id=${singleListing.id}"><button class="w-30 bttn btn-lg" type="button">Add a Bid</button></a>
        </div>`;
      addButtonContainer.classList = "visual-btn";
    }
  } catch (error) {
    console.log(error);
  }
})();
