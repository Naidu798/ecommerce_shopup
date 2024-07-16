import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import ENDPOINT from "../common";
import uploadImageToCloudinary from "../helpers/uploadImageToCloudinary";

const UploadProduct = ({
  onClose,
  updateProduct,
  setUpdateProduct,
  refreshAllProducts,
}) => {
  const [productData, setProductData] = useState({
    productName: updateProduct?.productName || "",
    brandName: updateProduct?.brandName || "",
    category: updateProduct?.category || "",
    productImages: updateProduct?.productImages || [],
    price: updateProduct?.price || "",
    sellingPrice: updateProduct?.sellingPrice || "",
    description: updateProduct?.description || "",
  });

  const getUploadedImages = () => {
    if (updateProduct) {
      const upLoadedImages = updateProduct.productImages.map((ele, i) => ({
        image: ele,
        id: updateProduct?._id + i * i,
      }));
      return upLoadedImages;
    }
    return [];
  };

  const [uploadedProductImages, setUploadedProductImages] = useState(
    getUploadedImages()
  );

  const removeImage = (id) => {
    setUploadedProductImages((prev) => prev.filter((img) => img.id !== id));
  };

  const uploadProduct = async (productDetails) => {
    try {
      const res = await fetch(ENDPOINT.uploadProduct, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message, { position: "top-center" });
        setProductData({
          productName: "",
          brandName: "",
          category: "",
          productImages: [],
          price: "",
          sellingPrice: "",
          description: "",
        });
        setUploadedProductImages([]);
        onClose(false);
        refreshAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const cloudinaryImage = await uploadImageToCloudinary(file);
    setUploadedProductImages((prev) => [
      ...prev,
      { image: cloudinaryImage.url, id: cloudinaryImage.asset_id },
    ]);
  };

  const updateProductDetails = async (productDetails) => {
    try {
      const res = await fetch(ENDPOINT.updateProduct, {
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message, { position: "top-center" });
        setProductData({
          productName: "",
          brandName: "",
          category: "",
          productImages: [],
          price: "",
          sellingPrice: "",
          description: "",
        });
        setUploadedProductImages([]);
        onClose(false);
        refreshAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadProduct = (e) => {
    e.preventDefault();

    if (!uploadedProductImages[0]) {
      return toast.error("Please upload atleast one image");
    }

    const productDetails = {
      ...productData,
      productImages: uploadedProductImages.map((img) => img.image),
    };

    if (updateProduct) {
      updateProductDetails({ ...productDetails, _id: updateProduct._id });
    } else {
      uploadProduct(productDetails);
    }
  };

  return (
    <div className="w-screen h-[90vh] flex justify-center items-center">
      <div className="bg-slate-100 h-[95%] w-[45vw] p-4 rounded-md shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-600">
            {updateProduct ? "Edit Product" : "Upload Product"}
          </h2>
          <button
            type="button"
            onClick={() => {
              onClose(false);
              setUpdateProduct(null);
            }}
          >
            <RxCrossCircled className="text-2xl font-bold" />
          </button>
        </div>
        <form
          className="px-3 pt-5 pb-3 flex flex-col gap-3  overflow-y-scroll custom-scrollbar h-[95%]"
          onSubmit={handleUploadProduct}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="productName" className="text-gray-900  font-medium">
              Product Name :{" "}
            </label>
            <input
              required
              type="text"
              id="productName"
              className="h-9 w-full outline-none rounded-md block px-2 pb-0.5 "
              placeholder="Enter product name"
              value={productData.productName}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="brandName" className="text-gray-900  font-medium">
              Brand Name :{" "}
            </label>
            <input
              required
              type="text"
              id="brandName"
              className="h-9 w-full outline-none rounded-md block px-2 pb-0.5 "
              placeholder="Enter brand name"
              value={productData.brandName}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  brandName: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-gray-900  font-medium">
              Category :
            </label>

            <select
              required
              className="p-2 rounded-md outline-none"
              id="category"
              value={productData.category}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value={""} className="text-gray-700 font-medium">
                Select category
              </option>
              {productCategory.map((category, i) => {
                return (
                  <option value={category.value} key={category.id + i}>
                    {category.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-900  font-medium">
                Product Image :
              </span>
              <label
                htmlFor="productImage"
                className="border border-gray-300 rounded-md h-24 bg-white flex flex-col justify-center items-center cursor-pointer"
              >
                <FaCloudUploadAlt className="text-3xl text-gray-800" />
                <span className="text-sm text-gray-900  font-medium">
                  Upload product image
                </span>
                <input
                  type="file"
                  id="productImage"
                  onChange={handleUploadImage}
                  className="hidden"
                />
              </label>
            </div>
            {uploadedProductImages.length < 1 && (
              <p className="text-xs text-red-500">
                *Please upload product images
              </p>
            )}
            <div className="flex items-center flex-wrap gap-2 mt-2">
              {/* <div className="h-20 w-20 border border-gray-300 bg-slate-50 rounded-md">
                image
              </div>
              <div className="h-20 w-20 border border-gray-300 bg-slate-50">
                image
              </div> */}
              {uploadedProductImages.map((image, i) => {
                return (
                  <div className="relative group" key={image?.id}>
                    <img
                      src={image?.image}
                      alt="product"
                      className="h-20 w-20 border border-gray-300 bg-slate-50 rounded-md"
                    />
                    <div
                      onClick={() => removeImage(image.id)}
                      className="absolute bottom-0 right-0 cursor-pointer p-1 rounded-full group-hover:flex justify-center items-center hidden bg-red-600 text-white"
                    >
                      <MdDeleteForever className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-gray-900  font-medium">
              Price :
            </label>
            <input
              required
              type="number"
              id="price"
              className="h-9 w-full outline-none rounded-md block px-2 pb-0.5 "
              placeholder="Enter price"
              value={productData.price}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="sellingPrice"
              className="text-gray-900  font-medium"
            >
              Selling Price :
            </label>
            <input
              required
              type="number"
              id="sellingPrice"
              className="h-9 w-full outline-none rounded-md block px-2 pb-0.5 "
              placeholder="Enter selling price"
              value={productData.sellingPrice}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  sellingPrice: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-gray-900  font-medium">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="outline-none h-28 rounded-md block px-2 pb-0.5 "
              placeholder="Enter description here"
              value={productData.description}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {updateProduct ? (
            <button
              type="submit"
              className="w-full py-2 text-white bg-red-400 hover:bg-red-600 rounded-xl hover:transition-all"
            >
              Update Product
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-xl hover:transition-all"
            >
              Upload Product
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
