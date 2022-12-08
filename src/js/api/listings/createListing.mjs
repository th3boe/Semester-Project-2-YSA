// import { API_AUCTION_URL } from "../constants.mjs";
// import { authFetch } from "./authFetch.mjs";

// const action = "/listings";
// const method = "POST";

// export async function createListing(newListing) {
//   const createListingURL = API_AUCTION_URL + action;
//   const body = JSON.stringify(newListing);

//   console.log("hey");

//   try {
//     const response = await authFetch(createListingURL, {
//       method: method,
//       body: body,
//     });

//     if (response.status === 201) {
//       location.href = "../../../../index.html";
//     }

//     if (response.status !== 201) {
//       alert("No listing for you today it seems!");
//     }

//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// }
