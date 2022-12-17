import { load } from "../../storage/index.mjs";
import { removeAddButton } from "./removeAddButton.mjs";

function menu() {
  const logoutBtn = document.querySelector(".logout-btn-container");
  const signinBtn = document.querySelector(".signin-btn");
  const registerBtn = document.querySelector(".register-btn");
  const profileBtn = document.querySelector(".profile-btn");
  const notSignedIn = document.querySelector(".center-buttons");
  const footerRemoveReg = document.querySelector(".register-remove-footer");
  const footerRemoveSignIn = document.querySelector(".signin-remove-footer");
  const footerRemoveProfile = document.querySelector(".profile-remove-footer");

  const token = load("token");

  if (token) {
    logoutBtn.style.display = "block";
    signinBtn.style.display = "none";
    registerBtn.style.display = "none";
    notSignedIn.style.display = "block";
    profileBtn.style.display = "block";
    footerRemoveReg.style.display = "none";
    footerRemoveSignIn.style.display = "none";
    footerRemoveProfile.style.display = "block";
  } else {
    logoutBtn.style.display = "none";
    signinBtn.style.display = "block";
    registerBtn.style.display = "block";
    notSignedIn.style.display = "none";
    profileBtn.style.display = "none";
    footerRemoveReg.style.display = "block";
    footerRemoveSignIn.style.display = "block";
    footerRemoveProfile.style.display = "none";
  }

  removeAddButton();
}
menu();
