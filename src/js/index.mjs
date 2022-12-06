import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

console.log("current path", path);

if (path === "/profile/signin/") {
  listeners.setSigninFormListener();
} else if (path === "/profile/register/") {
  listeners.setRegistrationFormListener();
} else if (path === "/listings/create/") {
  listeners.setCreateListingListener();
}
