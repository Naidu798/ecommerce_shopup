import { createContext, useEffect, useLayoutEffect, useState } from "react";
import ENDPOINT from "../common";
import { toast } from "react-toastify";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const fetchCartProducts = async () => {
    try {
      const res = await fetch(`${ENDPOINT.cartProducts}/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCartProducts(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await fetch(ENDPOINT.getUser, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
      }
      //else {
      //   toast.error(data.message);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchCartProducts();
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        cartProducts,
        fetchCartProducts,
        setCartProducts,
        getUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
