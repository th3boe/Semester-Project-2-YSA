import { load } from "../../storage/index.mjs";
import { logoutButton } from "./logoutButton.mjs";

function menu() {
  const logoutBtn = document.querySelector(".logout-btn-container");
  const signinBtn = document.querySelector(".signin-btn");

  const token = load("token");

  if (token) {
    logoutBtn.style.display = "block";
    signinBtn.style.display = "none";
  } else {
    logoutBtn.style.display = "none";
    signinBtn.style.display = "block";
  }

  logoutButton();
}
menu();
