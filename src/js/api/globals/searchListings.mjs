import { renderListings } from "../../templates/renderListings.mjs";

export function searchListings(listings) {
  const searchFunction = document.querySelector(".search");

  searchFunction.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredListings = listings.filter((listings) => {
      if (listings.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });
    renderListings(filteredListings);
  };
}
