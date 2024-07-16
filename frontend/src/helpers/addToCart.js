import { toast } from "react-toastify";
import ENDPOINT from "../common";

const addToCart = async (e, productId, userId) => {
  // e.stopPropagation();
  // e.preventDefault();

  try {
    const res = await fetch(ENDPOINT.addToCart, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId,
        userId,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message, { position: "top-center" });
      return data.success;
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export default addToCart;
