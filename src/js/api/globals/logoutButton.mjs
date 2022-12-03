import { remove } from "../../storage/index.mjs";

export function logoutButton() {
  const theButton = document.querySelector("#logout");

  if (theButton) {
    theButton.onclick = function () {
      remove("token");
      remove("yourProfile");
      location.href = "../../../../profile/signin";
    };
  }
}
