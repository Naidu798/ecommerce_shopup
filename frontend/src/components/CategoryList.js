import React, { useEffect, useState } from "react";
import ENDPOINT from "../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState(null);

  const getCategoryList = async () => {
    try {
      const res = await fetch(ENDPOINT.categoryList);
      const data = await res.json();
      if (data.success) {
        setCategoryList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderLoader = () => {
    return (
      <ul className="flex items-center gap-4 justify-between w-full overflow-x-scroll scrollbar-none p-3 md:px-6">
        {new Array(13).fill(null).map((ele, i) => {
          return (
            <li
              className="flex flex-col items-center animate-pulse"
              key={"category-list-loading" + i}
            >
              <div className="md:h-20 md:w-20 h-14 w-14 rounded-full bg-slate-200 p-2 md:p-4 flex items-center justify-center"></div>
              <div className="bg-slate-200 p-2 w-20 rounded-md mt-2"></div>
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    setCategoryList(null);
    getCategoryList();
  }, []);

  return (
    <div>
      {!categoryList && renderLoader()}
      {categoryList && (
        <ul className="flex items-center gap-4 justify-between w-full overflow-x-scroll scrollbar-none p-3 md:px-6">
          {categoryList?.map((item, i) => {
            return (
              <Link
                to={"/product-category?category=" + item?.category}
                key={item._id + i * i}
              >
                <li className="flex flex-col items-center">
                  <div className="md:h-20 md:w-20 h-14 w-14 rounded-full bg-slate-200 p-2 md:p-4 flex items-center justify-center">
                    <img
                      src={item?.productImages[0]}
                      alt={item.category}
                      className="h-full mix-blend-multiply object-scale-down hover:scale-125 transition-all"
                    />
                  </div>
                  <span className="text-sm md:text-base capitalize font-semibold">
                    {item?.category}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
