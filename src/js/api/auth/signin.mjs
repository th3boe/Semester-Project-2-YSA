import { API_AUCTION_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "POST";

export async function signIn(yourProfile) {
  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(yourProfile);

  try {
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    const { accessToken, ...user } = await response.json();

    console.log(response);

    if (response.status === 200) {
      storage.storageSave("token", accessToken);
      storage.storageSave("yourProfile", user);
      location.href = "../../../../index.html";
    }

    if (response.status !== 200) {
      alert("FAILURE ALERT! Your username and/or password is incorrect");
    }
  } catch (error) {
    console.log(error);
  }
}
