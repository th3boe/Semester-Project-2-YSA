import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

if (path === "/profile/signin/") {
  listeners.setSigninFormListener();
} else if (path === "/profile/register/") {
  listeners.setRegistrationFormListener();
}
