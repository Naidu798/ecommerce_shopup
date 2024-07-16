import { toast } from "react-toastify";
import ENDPOINT from "../common";

const fetchCategoryProducts = async (category) => {
  try {
    const res = await fetch(
      `${ENDPOINT.categoryProducts}?category=${category}`
    );
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchCategoryProducts;
