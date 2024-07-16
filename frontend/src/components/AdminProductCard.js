import React from "react";
import { MdEdit } from "react-icons/md";
import displayInrCurrency from "../helpers/displayInrCurrency";

const AdminProductCard = ({
  product,
  setUpdateProduct,
  setOpenUploadProduct,
}) => {
  return (
    <li className="bg-white rounded-lg p-3 max-w-48 min-w-40 border shadow-sm">
      <div className="h-32 w-32 flex justify-center items-center">
        <img
          src={product?.productImages[0]}
          alt="product"
          className="object-fill h-full"
        />
      </div>
      <span className="text-ellipsis line-clamp-2">{product?.productName}</span>
      <div className="flex items-start">
        <span className="font-bold">
          {displayInrCurrency(product?.sellingPrice)}
        </span>
      </div>
      <div className="w-full text-right">
        <button
          type="button"
          className="bg-green-100 p-1 rounded-full hover:bg-green-500 hover:text-white mt-1"
          onClick={() => {
            setUpdateProduct(product);
            setOpenUploadProduct(true);
          }}
        >
          <MdEdit />
        </button>
      </div>
    </li>
  );
};

export default AdminProductCard;
