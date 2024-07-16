import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import displayInrCurrency from "../helpers/displayInrCurrency";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import ENDPOINT from "../common";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cartProducts, setCartProducts, fetchCartProducts, currentUser } =
    useContext(AppContext);

  const getTotalPriceAndQuantity = () => {
    let totalQty = 0;
    let totalPrice = 0;
    cartProducts.forEach((item) => {
      totalQty += item.quantity;
      totalPrice += item?.productId?.sellingPrice * item.quantity;
    });
    return { totalQty, totalPrice };
  };

  const updateProductQuantity = async (updateData) => {
    try {
      const res = await fetch(ENDPOINT.updateQuantity, {
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (data.success) {
        if (updateData.type === "INCREASE") {
          setCartProducts((prev) =>
            prev.map((item) =>
              item._id === updateData?.cartItemId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          setCartProducts((prev) =>
            prev.map((item) =>
              item._id === updateData?.cartItemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const increaseQuantity = (id, quantity) => {
    const updateData = {
      cartItemId: id,
      quantity: quantity + 1,
      type: "INCREASE",
    };
    updateProductQuantity(updateData);
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity >= 2) {
      const updateData = {
        cartItemId: id,
        quantity: quantity - 1,
        type: "DECREASE",
      };
      updateProductQuantity(updateData);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const res = await fetch(`${ENDPOINT.deleteCartItem}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.info(`Product is removed from cart`, { position: "top-center" });
        setCartProducts((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCartProducts();
    }
  }, []);

  const totalDetails = getTotalPriceAndQuantity();

  return (
    <div className="w-screen h-[85vh] md:py-5 py-2 md:px-10 px-3">
      <h2 className="md:text-2xl text-xl font-semibold text-gray-900 mb-1 md:mb-4">
        My Cart
      </h2>
      <div className="w-full h-full flex flex-col md:flex-row gap-3 md:gap-8">
        {cartProducts.length === 0 ? (
          <div className="h-full md:w-[80%] w-full flex items-center justify-center">
            <span className="text-gray-800 text-xl font-medium">
              No products added
            </span>
          </div>
        ) : (
          <ul className="flex flex-col gap-2 md:gap-3 rounded-lg bg-white h-full md:w-[60%] w-full overflow-y-scroll scrollbar-none py-2 md:py-4 px-3 md:px-6 border">
            {cartProducts.map((cartItem) => {
              return (
                <li
                  className="bg-slate-50 shadow-sm rounded-lg w-full h-24 md:h-[100px] flex"
                  key={cartItem?._id}
                >
                  <Link to={"/product/" + cartItem?.productId?._id}>
                    <div className="md:h-[100px] h-24 w-28 bg-slate-200 rounded-lg p-2">
                      <img
                        src={cartItem?.productId?.productImages[0]}
                        alt={cartItem?.productId?.category}
                        className="h-full w-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                  </Link>
                  <div className="md:py-2 py-1 md:px-4 px-2 w-full">
                    <span className="text-md font-semibold text-ellipsis line-clamp-1">
                      {cartItem?.productId?.productName}
                    </span>
                    {/* <span className="">{cartItem?.productId?.category}</span> */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-red-500 text-md font-semibold">
                        {displayInrCurrency(cartItem?.productId?.sellingPrice)}
                      </span>
                      <span className="text-lg font-semibold text-red-600 hidden md:block">
                        {displayInrCurrency(
                          cartItem?.productId?.sellingPrice * cartItem?.quantity
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(cartItem?._id, cartItem?.quantity)
                          }
                          className="text-white bg-blue-400 hover:bg-blue-500 outline-none text-sm h-5 w-7 rounded-md  flex items-center justify-center"
                        >
                          <FaMinus />
                        </button>
                        <span>{cartItem?.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(cartItem?._id, cartItem?.quantity)
                          }
                          className="text-white bg-blue-400 hover:bg-blue-500 outline-none text-sm h-5 w-7 rounded-md  flex items-center justify-center"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        className="hover:bg-red-500 rounded-full p-1 mt-2 bg-red-400 text-white"
                        onClick={() => deleteCartItem(cartItem?._id)}
                      >
                        <MdDelete className="md:text-lg text-sm" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="md:w-[40%] w-full flex flex-col gap-2 md:gap-4">
          <div className="text-center">
            <h3 className="md:text-xl text-lg font-semibold bg-red-500 text-white rounded-sm pb-0.5 pt-0 md:pb-2 md:pt-1">
              Summary
            </h3>
          </div>
          <div className="bg-white w-full rounded-lg py-2 px-4 md:p-4">
            <div className="flex items-center justify-between md:mb-2 mb-1">
              <span className="text-gray-900 text-md md:text-lg font-medium">
                Total Quantity :
              </span>
              <span className="text-gray-900 text-md md:text-lg font-semibold">
                {totalDetails.totalQty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 text-md md:text-lg font-medium">
                Total Price :
              </span>
              <span className="text-red-500 text-md md:text-lg font-semibold">
                {displayInrCurrency(totalDetails.totalPrice)}
              </span>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 trasition-all rounded-full text-white font-semibold w-full pb-0.5 md:py-1.5">
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
