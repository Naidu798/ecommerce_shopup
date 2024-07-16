import React, { useContext, useEffect, useState } from "react";
import fetchCategoryProducts from "../helpers/fetchCategoryProducts";
import displayInrCurrency from "../helpers/displayInrCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import suffleArray from "../helpers/suffleArray";
import { AppContext } from "../context/AppContext";

const RecommendedProducts = ({ category, heading }) => {
  const [data, setData] = useState(null);

  const { currentUser, fetchCartProducts } = useContext(AppContext);

  const fetchProducts = async () => {
    const products = await fetchCategoryProducts(category);
    if (products) {
      const suffleProducts = suffleArray(products);
      setData(suffleProducts);
    }
  };

  const renderLoader = () => {
    return (
      <div className="relative px-3 md:px-6 py-1 md:py-3 animate-pulse">
        <div className="p-3 w-48 bg-slate-200 rounded-md"></div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center md:justify-between gap-8 rounded-lg my-3 w-full h-full">
          {new Array(10).fill(null).map((ele, i) => {
            return (
              <li
                className="bg-white w-56 min-w-56 h-64 md:w-40 md:h-72 shadow-md rounded-lg border"
                key={"Recommended-products" + i}
              >
                <div className="bg-slate-200 min-w-[40%] md:min-w-28 h-[50%] md:p-3 rounded-lg"></div>
                <div className="p-2 flex flex-col gap-4 min-w-[60%] pr-4">
                  <div className="bg-slate-200 rounded-md p-2"></div>
                  <div className="p-2 bg-slate-200 rounded-md w-32"></div>
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
    if (category) {
      setData(null);
      fetchProducts();
    }
  }, []);

  return (
    <>
      {!data && renderLoader()}
      {data && (
        <div className="px-3 md:px-10 py-1 md:py-3">
          <h1 className="font-semibold text-xl">{heading}</h1>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center md:justify-between gap-8 rounded-lg my-3 w-full h-full">
            {data.map((product, i) => {
              return (
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to={"/product/" + product?._id}
                  key={product?._id + i}
                >
                  <li className="bg-white w-68 min-w-56 h-72 md:w-40 md:h-72 shadow-md rounded-lg border">
                    <div className="bg-slate-200 min-w-28 md:min-w-28 h-36 md:h-36 p-2 md:p-3 rounded-lg">
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
                        <span className="text-red-500 font-bold text-sm md:text-lg">
                          {displayInrCurrency(product?.sellingPrice)}
                        </span>
                        <span className="text-slate-500 line-through text-sm md:text-md">
                          {displayInrCurrency(product?.price)}
                        </span>
                      </div>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          const isProductAdded = await addToCart(
                            e,
                            product?._id,
                            currentUser._id
                          );
                          if (isProductAdded) {
                            fetchCartProducts();
                          }
                        }}
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

export default RecommendedProducts;
