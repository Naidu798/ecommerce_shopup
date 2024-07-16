import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalProducts from "../components/VerticalProducts";
import ENDPOINT from "../common";
import { toast } from "react-toastify";

const CategoryProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchArray = new URLSearchParams(location.search).getAll(
    "category"
  );
  const urlCategoryObject = {};
  urlSearchArray.forEach((ele) => {
    urlCategoryObject[ele] = true;
  });

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(urlCategoryObject);
  const [sortBy, setSortBy] = useState("");

  const handleCategoryCheckbox = (e) => {
    const { value, checked } = e.target;
    setSelectedCategory((prev) => ({ ...prev, [value]: checked }));
  };

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  const fetchFilterProducts = async (arrayOfCategory) => {
    try {
      const res = await fetch(ENDPOINT.filterProducts, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ categoryList: arrayOfCategory }),
      });
      const data = await res.json();
      if (data.success) {
        setData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const categoryArray = Object.keys(selectedCategory).filter(
      (categoryKeyName) => selectedCategory[categoryKeyName]
    );

    const urlFormat = categoryArray.map((ele, index) => {
      if (categoryArray.length - 1 === index) {
        return `category=${ele}`;
      } else {
        return `category=${ele}&&`;
      }
    });

    fetchFilterProducts(categoryArray);

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectedCategory]);

  return (
    <div className="w-screen h-[90vh] flex flex-col md:flex-row">
      <div className="border md:w-64 w-[302px] h-[30%] md:h-[94%] bg-white rounded-lg p-2 md:p-4 flex flex-row md:flex-col gap-7 md:gap-3 m-3 md:m-5">
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-1">Sort By</h3>
          <hr />
          <form className="grid gap-1 mt-1">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="lowToHigh"
                value="asc"
                name="sortBY"
                onChange={handleSortBy}
                checked={sortBy === "asc"}
              />
              <label htmlFor="lowToHigh" className="">
                Low to High
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="highToLow"
                value="dsc"
                name="sortBy"
                onChange={handleSortBy}
                checked={sortBy === "dsc"}
              />
              <label htmlFor="highToLow">High to Low</label>
            </div>
          </form>
        </div>

        <div className="w-full">
          <h3 className="text-lg font-semibold mb-1">Category</h3>
          <hr />
          <ul className="h-32 md:h-full w-full overflow-y-scroll scrollbar-none">
            {productCategory.map((category) => {
              return (
                <li
                  key={category.label + category.id}
                  className="mt-1 md:mt-2 flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id={category.value}
                    className="h-4 w-4"
                    name="category"
                    value={category.value}
                    onChange={handleCategoryCheckbox}
                    checked={selectedCategory[category.value]}
                  />
                  <label className="font-normal">{category.label}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full h-[87vh] overflow-y-scroll custom-scrollbar">
        <VerticalProducts
          data={data || []}
          heading={`Search Results : ${data.length}`}
        />
      </div>
    </div>
  );
};

export default CategoryProducts;
