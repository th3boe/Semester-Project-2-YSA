import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

console.log("current path", path);

if (path === "/profile/signin/") {
  listeners.setSigninFormListener();
} else if (path === "/profile/register/") {
  listeners.setRegistrationFormListener();
} else if (path === "/listing/create/") {
  listeners.setCreateListingListener();
} else if (path === "/profile/avataredit/") {
  listeners.setEditAvatarListener();
} else if (path === "/listing/bid/") {
  listeners.setAddBidListener();
}
