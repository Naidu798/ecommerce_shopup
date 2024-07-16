import React, { useEffect, useState } from "react";
import ENDPIONT from "../common";
import { toast } from "react-toastify";
import UploadProduct from "../pages/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const [updateProduct, setUpdateProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      const res = await fetch(ENDPIONT.allProducts);
      const data = await res.json();
      if (data.success) {
        setAllProducts(data.data);
        console.log(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between bg-white px-3 py-3 rounded-md border">
        <h2 className="text-xl text-gray-800 font-semibold">All Products</h2>
        <button
          type="button"
          className="px-4 pb-0.5 text-blue-500 rounded-xl bg-transparent border-2 border-blue-500"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      <ul className="flex items-start flex-wrap gap-4 w-full h-[78vh] overflow-y-scroll pt-3 custom-scrollbar">
        {allProducts.map((product, i) => {
          return (
            <AdminProductCard
              key={product._id + i}
              product={product}
              setOpenUploadProduct={setOpenUploadProduct}
              setUpdateProduct={setUpdateProduct}
            />
          );
        })}
      </ul>
      {openUploadProduct && (
        <div className="absolute top-16 bottom-0 right-0 left-0 flex bg-white bg-opacity-30">
          <UploadProduct
            onClose={setOpenUploadProduct}
            updateProduct={updateProduct}
            setUpdateProduct={setUpdateProduct}
            refreshAllProducts={getAllProducts}
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
