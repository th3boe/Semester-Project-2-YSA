import { createListing } from "../api/listings/index.mjs";

export function setCreateListingListener() {
  const form = document.querySelector("#createListing");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const theListing = Object.fromEntries(formData.entries());

      if (!theListing.tags.length) {
        delete theListing.tags;
      }

      if (!theListing.media.length) {
        delete theListing.media;
      }

      createListing(theListing);
    });
  }
}
