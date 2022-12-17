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
const containerTop = document.querySelector("#singleListingTop");
const containerCarousel = document.querySelector(".carousel-inner");
const containerBottom = document.querySelector("#singleListingBottom");
const addButtonContainer = document.querySelector("#listingButtons");

(async function getSingleListing() {
  try {
    const response = await authFetch(url, { method });
    const singleListing = await response.json();

    const seller = singleListing.seller.name;
    const { name } = load("yourProfile");

    title.innerHTML = `Yard Sale Auctions | ${singleListing.title}`;

    const avatarImage = singleListing.seller.avatar
      ? `<img
      src="${singleListing.seller.avatar}"
      onerror="this.src='/images/error-404-profile.webp';"
      alt="Avatar for ${singleListing.seller.name}"
      class="seller-image"
    />`
      : `<p class="m-3">The seller seems to have forgotten their manners and didn't add an avatar image, we decided to give them a random one: </p>
      <img src="https://picsum.photos/200"
      class="seller-image m-auto mb-3"
      alt="404! No Image Found" </br>`;

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

    containerTop.innerHTML = `
      <h2 class="card-header">${singleListing.title}</h2>
      <p class="listing-text my-3">${singleListing.description}</p>`;

    singleListing.media.forEach((images, i) => {
      let active = "";
      if (i === 0) {
        active = "active";
      }
      console.log(images, active);
      const sliderNumber = i + 1;
      console.log(sliderNumber);

      containerCarousel.innerHTML += `<div class="carousel-item ${active}">
        <img src="${images}"
        alt="Image number ${sliderNumber} for listing ${singleListing.title}"
        class="auction-image d-block"/>
      </div>`;
    });

    containerBottom.innerHTML = `
      <p>${singleListing.tags}</p>
      <p>Closes at: </br> ${new Date(
        singleListing.endsAt
      ).toDateString()} at ${new Date(
      singleListing.endsAt
    ).toLocaleTimeString()}</p>
      <div class="card text-center justify-content-center m-2 p-3">
        ${bids}
        <p class="bids-info">Amount of bids on this item is: </br> 
        ${singleListing._count.bids}</p>
      </div>
      <div class="card-footer text-muted m-0 text-center justify-content-center">
        <h3>Information about the seller:</h3>
        ${avatarImage}
        <p>The seller is ${singleListing.seller.name}</p>
        <p>Contact the seller by email: ${singleListing.seller.email}</p>
      </div>`;

    if (seller === name) {
      console.log("This work of art was created by you!");
      addButtonContainer.innerHTML = `
      <div class="center-buttons m-3">
        <button class="w-30 bttn btn-lg" id="delete" type="button" data-delete="${singleListing.id}">Delete Listing</button>
      </div>`;
      addButtonContainer.classList = "visual-btn";

      const deleteBtn = document.querySelector("#delete");
      deleteBtn.addEventListener("click", deleteListing);
    } else {
      console.log("This is not one of your genious creations!");
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
