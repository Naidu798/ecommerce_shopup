import React, { useEffect, useState } from "react";
import ENDPOINT from "../common";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VerticalProducts from "../components/VerticalProducts";

const Search = () => {
  const query = useLocation();

  const [searchResults, setSearchResults] = useState(null);

  let getSearchProducts = async () => {
    try {
      const res = await fetch(`${ENDPOINT.searchProducts}${query.search}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const debounce = (func, delay) => {
  //   let interval = null;

  //   return function () {
  //     clearTimeout(interval);
  //     const args = arguments;
  //     interval = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  useEffect(() => {
    const queryValue = query.search.split("=")[1];
    if (queryValue) {
      setSearchResults(null);
      getSearchProducts();
    } else {
      setSearchResults([]);
    }
  }, [query.search]);

  return (
    <div className="w-screen h-[90vh] overflow-y-scroll custom-scrollbar">
      <VerticalProducts
        data={searchResults}
        heading={`Search results : ${searchResults && searchResults.length}`}
      />
    </div>
  );
};

export default Search;
