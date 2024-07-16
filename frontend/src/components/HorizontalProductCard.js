import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryProducts from "../helpers/fetchCategoryProducts";
import displayInrCurrency from "../helpers/displayInrCurrency";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import { AppContext } from "../context/AppContext";

const HorizontalProductCart = ({ category, heading }) => {
  const [data, setData] = useState(null);

  const { currentUser, fetchCartProducts } = useContext(AppContext);

  const scrollElement = useRef(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const products = await fetchCategoryProducts(category);
    if (products) {
      setData(products);
    }
  };

  const rightScroll = () => {
    scrollElement.current.scrollLeft -= 100;
  };

  const leftScroll = () => {
    scrollElement.current.scrollLeft += 100;
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    e.preventDefault();

    if (!currentUser) {
      return navigate("/login");
    }

    const isProductAdded = await addToCart(e, productId, currentUser._id);
    if (isProductAdded) {
      fetchCartProducts();
    }
  };

  const renderLoader = () => {
    return (
      <div className="relative px-3 md:px-6 py-1 md:py-3 animate-pulse">
        <div className="p-3 w-48 bg-slate-200 rounded-md"></div>
        <div className=" w-full bg-slate-200 md:flex justify-between items-center px-2 hidden">
          <div className="bg-gray-300 bg-opacity-60 rounded-full p-2 absolute z-10 top-[100px] left-2"></div>
          <div className="bg-gray-300 bg-opacity-60 rounded-full p-2 absolute z-10 top-[100px] right-2"></div>
        </div>
        <ul className="flex items-center rounded-lg gap-6 my-3 overflow-x-scroll scrollbar-none relative transition-all">
          {new Array(10).fill(null).map((ele, i) => {
            return (
              <li
                className="bg-white min-w-64 h-32 md:w-72 md:h-36 flex  shadow-md rounded-lg border"
                key={"horizontal-produycts" + i}
              >
                <div className="bg-slate-200 min-w-[40%] md:min-w-28 h-full md:p-3 rounded-lg"></div>
                <div className="p-2 flex flex-col gap-4 min-w-[60%] pr-4">
                  <div className="bg-slate-200 rounded-md p-2"></div>
                  <div className="p-2 bg-slate-200 rounded-md w-24"></div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-200 rounded-md w-full"></div>
                    <div className="p-2 bg-slate-200 rounded-md w-full"></div>
                  </div>
                  <div className="p-3 bg-slate-200 rounded-md w-full"></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    setData(null);
    fetchProducts();
  }, []);

  return (
    <>
      {!data && renderLoader()}

      {data && (
        <div className="relative px-3 md:px-6 py-1 md:py-3">
          <h1 className="font-semibold text-lg">{heading}</h1>
          <div className=" w-full text-gray-700 md:flex justify-between items-center px-2 hidden">
            <button
              className="bg-gray-300 bg-opacity-60 rounded-full p-2 absolute z-10 top-[100px] left-2"
              onClick={leftScroll}
            >
              <FaChevronLeft className="text-md" />
            </button>
            <button
              className="bg-gray-300 bg-opacity-60 rounded-full p-2 absolute z-10 top-[100px] right-2"
              onClick={rightScroll}
            >
              <FaChevronRight className="text-md" />
            </button>
          </div>
          <ul
            className="flex items-center rounded-lg gap-6 my-3 overflow-x-scroll scrollbar-none relative transition-all"
            ref={scrollElement}
          >
            {data.map((product, i) => {
              return (
                <Link to={"/product/" + product?._id} key={product?._id + i}>
                  <li className="bg-white min-w-64 h-32 md:w-72 md:h-36 flex shadow-md rounded-lg border">
                    <div className="bg-slate-200 min-w-[40%] md:min-w-28 h-full md:p-3 rounded-lg">
                      <img
                        src={product?.productImages[0]}
                        alt={product?.category}
                        className="h-full w-full mix-blend-multiply object-scale-down transition-all hover:scale-110"
                      />
                    </div>
                    <div className="p-2 flex flex-col gap-1 min-w-[60%]">
                      <span className="font-semibold md:text-ellipsis line-clamp-1 text-sm md:text-md">
                        {product?.productName}
                      </span>
                      <span className="capitalize text-sm md:text-md">
                        {product?.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-red-500 font-bold text-sm md:text-md">
                          {displayInrCurrency(product?.sellingPrice)}
                        </span>
                        <span className="text-slate-500 line-through text-sm md:text-md">
                          {displayInrCurrency(product?.price)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product?._id)}
                        className="bg-red-500 mt-2 mx-2 outline-none text-white pb-0.5 px-3 rounded-full hover:bg-red-600 hover:scale-105"
                      >
                        Add to cart
                      </button>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default HorizontalProductCart;
