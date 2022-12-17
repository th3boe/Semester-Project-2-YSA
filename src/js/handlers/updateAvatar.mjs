import { save } from "../storage/index.mjs";
import { load } from "../storage/index.mjs";
import { updateAvatar } from "../api/profiles/index.mjs";

export async function setEditAvatarListener() {
  const form = document.querySelector("#editAvatar");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const avatar = Object.fromEntries(formData.entries());
      // save("avatar", form.avatar.value);
      load("avatar", form.avatar.value);

      updateAvatar(avatar);
    });
  }
}
