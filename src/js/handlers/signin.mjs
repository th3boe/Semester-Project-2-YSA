import { signIn } from "../api/auth/signin.mjs";

export function setSigninFormListener() {
  const form = document.querySelector("#signinForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const yourProfile = Object.fromEntries(formData.entries());

      signIn(yourProfile);
    });
  }
}
