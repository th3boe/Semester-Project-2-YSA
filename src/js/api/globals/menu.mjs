import { load } from "../../storage/index.mjs";
import { logoutButton } from "./logoutButton.mjs";

function menu() {
  const logoutBtn = document.querySelector(".logout-btn-container");
  const signinBtn = document.querySelector(".signin-btn");
  const registerBtn = document.querySelector(".register-btn");
  const profileBtn = document.querySelector(".profile-btn");
  const notSignedIn = document.querySelector(".center-buttons");

  const token = load("token");

  if (token) {
    logoutBtn.style.display = "block";
    signinBtn.style.display = "none";
    registerBtn.style.display = "none";
    notSignedIn.style.display = "block";
    profileBtn.style.display = "block";
  } else {
    logoutBtn.style.display = "none";
    signinBtn.style.display = "block";
    registerBtn.style.display = "block";
    notSignedIn.style.display = "none";
    profileBtn.style.display = "none";
  }

  logoutButton();
}
menu();
