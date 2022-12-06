import { createListing } from "../api/listings/index.mjs";

export function setCreateListingListener() {
  const form = document.querySelector("#addListing");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      createListing();
    });
  }
}
