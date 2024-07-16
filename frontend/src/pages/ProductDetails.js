import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ENDPOINT from "../common";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayInrCurrency from "../helpers/displayInrCurrency";
import RecommendedProducts from "../components/RecommendedProducts";
import { AppContext } from "../context/AppContext";
import addToCart from "../helpers/addToCart";

const ProductDetails = () => {
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    price: "",
    sellingPrice: "",
    description: "",
  });
  const [currentImage, setCurrentImage] = useState("");

  const navigate = useNavigate();
  const productId = useParams().productId;

  const { currentUser, fetchCartProducts } = useContext(AppContext);

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`${ENDPOINT.productDetails}/${productId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setProductData(data.data);
        setCurrentImage(data.data?.productImages[0]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onHoverChangeImage = (image) => {
    setCurrentImage(image);
  };

  const handleBuyProduct = async (e, productId, userId) => {
    const isProductAdded = await addToCart(e, productId, userId);
    if (isProductAdded) {
      fetchCartProducts();
      navigate("/cart");
    }
  };

  const renderLoader = () => {
    return (
      <div className="w-screen h-[90vh] overflow-y-scroll scrollbar-none">
        <div className="flex flex-col md:flex-row gap-6 px-3 py-4 md:py-8 md:px-10">
          <div className="flex md:flex-col md:gap-5 gap-2 flex-wrap order-2 md:order-1">
            {new Array(4).fill(null).map((ele, i) => {
              return (
                <div
                  className="md:h-24 md:w-24 h-[70px] w-[70px] bg-slate-200 rounded-lg animate-pulse"
                  key={"product-deatils" + i * 100}
                ></div>
              );
            })}
          </div>
          <div className="animate-pulse md:w-[650px] w-full h-[300px] md:h-[445px] bg-slate-200 rounded-lg p-4 order-1 md:order-2"></div>
          <div className="flex flex-col gap-6 w-full order-3 md:order-3">
            <div className="animate-pulse bg-slate-200 rounded-full w-48 py-4"></div>
            <div>
              <div className="animate-pulse bg-slate-200 rounded-full md:w-96 p-4 mb-3"></div>
              <div className="animate-pulse bg-slate-200 rounded-full w-36 p-3"></div>
            </div>
            <div className="animate-pulse bg-slate-200 rounded-full w-44 p-3"></div>
            <div className=" flex items-center gap-4 mt-3 md:w-96 w-60">
              <div className="animate-pulse bg-slate-200 rounded-full w-full p-4"></div>
              <div className="animate-pulse bg-slate-200 rounded-full w-full p-4"></div>
            </div>
            <div className="flex flex-col w-[50%] md:flex-row items-center gap-3 md:gap-5 md:mt-1 mt-3">
              <div className="animate-pulse bg-slate-200 rounded-full w-full p-5"></div>
              <div className="animate-pulse bg-slate-200 rounded-full w-full p-5"></div>
            </div>

            <div className="mt-4">
              <div className="animate-pulse bg-slate-200 rounded-full w-60 p-4 mb-4"></div>
              <div className="animate-pulse bg-slate-200 rounded-xl w-full md:w-[85%] md:h-[20vh] h-[25vh] "></div>
            </div>
          </div>
        </div>
        <div className="relative px-3 md:px-6 py-1 md:py-3 animate-pulse">
          <div className="p-3 w-48 bg-slate-200 rounded-md"></div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center md:justify-between gap-8 rounded-lg my-3 w-full h-full">
            {new Array(10).fill(null).map((ele, i) => {
              return (
                <li
                  className="bg-white w-56 min-w-56 h-64 md:w-40 md:h-72 shadow-md rounded-lg border"
                  key={"product-details-vertical-card" + i}
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
      </div>
    );
  };

  useEffect(() => {
    setProductData(null);
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {!productData && renderLoader()}
      {productData && (
        <div className="w-screen h-[90vh] overflow-y-scroll scrollbar-none">
          <div className="flex flex-col md:flex-row gap-6 px-3 py-4 md:py-8 md:px-10">
            <div className="flex md:flex-col md:gap-5 gap-2 flex-wrap order-2 md:order-1">
              {productData?.productImages.map((img, i) => {
                return (
                  <div
                    className="md:h-24 md:w-24 h-[70px] w-[70px] bg-slate-200 rounded-lg cursor-pointer"
                    key={img + i}
                    onMouseEnter={() => onHoverChangeImage(img)}
                    onClick={() => onHoverChangeImage(img)}
                  >
                    <img
                      src={img}
                      alt={productData?.category}
                      className="rounded-lg object-scale-down mix-blend-multiply h-full w-full"
                    />
                  </div>
                );
              })}
            </div>
            <div className="md:w-[650px] w-full h-[300px] md:h-[445px] bg-slate-200 rounded-lg p-4 order-1 md:order-2">
              <img
                src={currentImage}
                alt={productData?.category}
                className="object-scale-down rounded-lg mix-blend-multiply h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full order-3 md:order-3">
              <span className="bg-red-200 w-fit inline-block rounded-full text-red-500 text-md md:text-lg px-5 pb-0.5">
                {productData?.brandName}
              </span>
              <div>
                <p className="text-gray-900 text-xl md:text-2xl font-bold mb-1">
                  {productData?.productName}
                </p>
                <span className="block text-gray-900 text-md capitalize">
                  {productData?.category}
                </span>
              </div>
              <div className="flex items-center gap-1 text-lg text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className="md:text-2xl text-xl text-red-500 font-bold">
                  {displayInrCurrency(productData?.sellingPrice)}
                </span>
                <span className="md:text-lg text-md text-slate-400 line-through">
                  {displayInrCurrency(productData?.price)}
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 md:mt-1 mt-3">
                <button
                  onClick={(e) =>
                    handleBuyProduct(e, productData?._id, currentUser?._id)
                  }
                  className="border-2 border-red-500 text-red-500 rounded-md py-0.5 md:py-1 px-20 md:px-20 text-md md:text-lg font-semibold hover:bg-red-500 hover:text-white transition-all"
                >
                  Buy
                </button>
                <button
                  onClick={async (e) => {
                    const isProductAdded = await addToCart(
                      e,
                      productData?._id,
                      currentUser._id
                    );
                    if (isProductAdded) {
                      fetchCartProducts();
                    }
                  }}
                  className="text-white bg-red-500 border-2 border-red-500 rounded-md py-0.5 md:py-1 px-14 md:px-20 text-md md:text-lg font-semibold hover:bg-red-600 transition-all"
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-lg text-red-400 font-semibold mb-1">
                  Description
                </h3>
                <p className="text-md font-normal">
                  {productData?.description}
                </p>
              </div>
            </div>
          </div>
          {productData?.category && (
            <RecommendedProducts
              category={productData?.category}
              heading={"Recommended Products"}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
