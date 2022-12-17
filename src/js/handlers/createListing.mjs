import { createListing } from "../api/listings/index.mjs";

export function setCreateListingListener() {
  const form = document.querySelector("#addListing");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const title = formData.get("title");
      const description = formData.get("description");
      const tags = formData.get("tags").split(", ");
      const media = formData.get("media").split(", ");
      const endsAt = new Date(formData.get("endsAt"));

      const post = { title, description, tags, media, endsAt };

      if (!media.value || media.value === [] || media.value === "") {
        delete post.media;
      }

      createListing(post);
    });
  }
}
