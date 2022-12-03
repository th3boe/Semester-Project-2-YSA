import { renderListings } from "../../templates/renderListings.mjs";

export function searchListings(listings) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredListings = listings.filter((listing) => {
      if (listing.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });
    renderListings(filteredListings);
  };
}
