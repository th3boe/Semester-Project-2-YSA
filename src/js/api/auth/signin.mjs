import { API_AUCTION_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const theAction = "/auth/signin";
const method = "POST";

export async function signIn(yourProfile) {
  const signinURL = API_AUCTION_URL + theAction;
  const body = JSON.stringify(yourProfile);

  try {
    const response = await fetch(signinURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    const { accessToken, ...user } = await response.json();

    console.log(response);

    if (response.status === 200) {
      storage.save("token", accessToken);
      storage.save("yourProfile", user);
      location.href = "../../../../index.html";
    }

    if (response.status !== 200) {
      alert("Your try failed, username and/or password is incorrect");
    }
  } catch (error) {
    console.log(error);
  }
}
