import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "../../../../index.html";

const action = "/listings";
const method = "GET";

const url = `${API_AUCTION_URL}${action}/${id}`;

const container = document.querySelector("#singleListing");

(async function getSingleListing() {
  try {
    const response = await authFetch(url, { method });
    const json = await response.json();

    const image = json.media
      ? `<img
      src="${json.media}"
      alt="Image for ${json.title}"
      class="auction-image"
    />`
      : "";

    container.innerHTML = `
      <h1>${json.title}</h1>
      ${image}
      <p>${json.description}</p>
      <p>${json.tags}</p>

<div class="post-btns d-flex">
      <a href="/post/edit/?id=${json.id}">
        <button class="update-btn w-100 bttn btn-lg" type="button">
          Edit Post
        </button>
      </a>

      <button class="ms-1 w-100 bttn btn-lg" id="delete" type="button" data-delete="${json.id}">
        Delete Post
      </button>
    </div>`;

    const deleteBtn = document.querySelector("#delete");
    deleteBtn.addEventListener("click", deletePost);
  } catch (error) {
    console.log(error);
  }
})();
