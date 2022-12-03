import { register } from "../api/auth/register.mjs";

export function setRegistrationFormListener() {
  const form = document.querySelector("#registrationForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const yourProfile = Object.fromEntries(formData.entries());

      register(yourProfile);
    });
  }
}
