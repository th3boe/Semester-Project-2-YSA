export function renderListings(listings) {
  const container = document.querySelector("#listings");

  container.innerHTML = "";

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];
    if (i === 12) break;

    const image = listing.media
      ? `<img 
      src="${listing.media}"
      alt="Image for ${listing.title}"
      class="auction-image"
      />`
      : "";

    container.innerHTML += `
        <a href="listing/?id=${listing.id}">
        <div class="card m-2 single-listing">
        <h2 class="listing-title m-2">${listing.title}</h2>
        ${image}
        <p class="listing-text m-2">${listing.description}</p>
        <p>${listing.tags}</p>
        <p>${listing.endsAt}</p>
        </div>
        </a>
        `;
  }
}
