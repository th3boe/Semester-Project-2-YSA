import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../../api/listings/authFetch.mjs";
import { load } from "../../storage/index.mjs";

const user = load("yourProfile");
const userName = user.name;

const action = "/profiles";
const method = "GET";

const url = `${API_AUCTION_URL}${action}/${userName}/bids?_listings=true`;
const title = document.querySelector("title");
const container = document.querySelector("#currentBids");

console.log(url);

async function getMyBids() {
  try {
    const response = await authFetch(url, { method });
    const yourBids = await response.json();

    if (yourBids !== 0) {
      container.innerHTML = `<p class="bids-info m-3"> No current bids!</p>`;
      title.innerHTML = `Yard Sale Auctions | No current bids`;
    }

    title.innerHTML = `Yard Sale Auctions | ${yourBids[0].bidderName}'s bids`;
    container.innerHTML = "";

    console.log(yourBids);
    console.log(yourBids[0].bidderName);

    for (let i = 0; i < yourBids.length; i++) {
      const currentBids = yourBids[i];

      const image = currentBids.listing.media.length
        ? `<img 
      src="${currentBids.listing.media[0]}"
      onerror="this.src='/images/404-image.jpg';"
      alt="Image for ${currentBids.listing.title}"
      class="auction-image img-fluid"
      />`
        : `<img src="/images/404-image.jpg" 
      class="auction-image img-fluid" 
      alt="404! No Image Found"`;

      container.innerHTML += `
        <div class="card text-center justify-content-center m-4 p-0">
        <h2 class="card-header m-0">${currentBids.listing.title}</h2>
        <p class="listing-text my-3">${currentBids.listing.description}</p>
        ${image}
        <p>${currentBids.listing.tags}</p>

        <div class="card text-center justify-content-center m-2 p-3">
        <p class="bids-info">${
          currentBids.bidderName
        }'s current bid on this listing is: </br> 
        ${currentBids.amount}</p>
        </div>

        <p class="card-footer text-muted m-0">Closes at: 
        </br> ${new Date(currentBids.listing.endsAt).toDateString()} 
        at ${new Date(currentBids.listing.endsAt).toLocaleTimeString()}</p>
        </div>`;
    }

    console.log(yourBids);
  } catch (error) {
    console.log(error);
  }
}
getMyBids();
