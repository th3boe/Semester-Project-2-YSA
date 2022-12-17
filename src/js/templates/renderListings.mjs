import { load } from "../storage/index.mjs";

const token = load("token");

export function renderListings(listings) {
  const container = document.querySelector("#listings");

  container.innerHTML = "";

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];

    const image = listing.media.length
      ? `<img 
      src="${listing.media[0]}"
      onerror="this.src='/images/404errorimage.jpg';"
      alt="Image for ${listing.title}"
      class="auction-image img-fluid"
      />`
      : `<img src="/images/404errorimage.jpg" 
      class="auction-image img-fluid" 
      alt="404! No Image Found"`;

    const viewListing = token
      ? `<div class="center-buttons mb-3">
      <div class="button-move"><a href="listing/?id=${listing.id}"><button class="w-30 bttn btn-lg" type="button" alt="View Listing Button">View Listing</button></a></div>
      </div> `
      : "";

    container.innerHTML += `
        <div class="card text-center justify-content-center m-4 p-0">
        <h2 class="card-header m-0">${listing.title}</h2>
        <p class="listing-text my-3">${listing.description}</p>
        ${image}
        <p>${listing.tags}</p>

        ${viewListing}

        <p class="card-footer text-muted m-0">Closes at: 
        </br> ${new Date(listing.endsAt).toDateString()} 
        at ${new Date(listing.endsAt).toLocaleTimeString()}</p>

        </div>`;
  }
}
