import { updateAvatar } from "../api/profiles/index.mjs";
import { getProfile } from "../api/profiles/profileInfo.mjs";
import { load } from "../storage/index.mjs";

const user = load("yourProfile");
const userAvatar = user.avatar;

export async function setEditAvatarListener() {
  const form = document.querySelector("#editAvatar");

  if (form) {
    const avatarUpdateButton = form.querySelector("button");
    avatarUpdateButton.disabled = true;

    const profileAvatar = await getProfile(userAvatar);

    form.avatar.value = profileAvatar.avatar;

    avatarUpdateButton.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const theAvatar = Object.fromEntries(formData.entries());

      updateAvatar(theAvatar);
    });
  }
}
