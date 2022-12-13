import { addBid } from "../api/listings/index.mjs";

export function setAddBidListener(id, amount) {
  const form = document.querySelector("#createNewBid");

  const params = new URLSearchParams(document.location.search);
  const bidId = params.get("id");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const theBid = event.target.amount.value;

      addBid(bidId, Number(theBid));
      console.log(bidId, Number(theBid));
    });
  }
}
