import { toast } from "react-toastify";

async function requestAccount() {
  try {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return true;
  } catch (error) {
    console.error(error);

    toast.warn("You need a metamask account to mint token");

    return false;
  }
}

export default requestAccount;
