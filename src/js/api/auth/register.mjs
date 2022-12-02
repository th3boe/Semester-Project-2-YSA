import { API_AUCTION_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "POST";

export async function register(yourProfile) {
  const registerURL = API_AUCTION_URL + action;
  const body = JSON.stringify(yourProfile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body: body,
    });

    const result = await response.json();
    console.log(response);

    if (response.status === 201) {
      location.href = "../../../../profile/signin/";
    }

    if (response.status !== 201) {
      alert(
        "Something seems to have gone wrong - user may already exist.. Please feel free to try again."
      );
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}
