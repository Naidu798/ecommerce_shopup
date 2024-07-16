import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import ENDPOINT from "../common";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const searchUrl = useLocation();
  const queryValue = new URLSearchParams(searchUrl?.search).getAll("q");

  const [showAdminOption, setShowAdminOption] = useState(false);
  const [search, setSearch] = useState(queryValue);

  const { currentUser, setCurrentUser, cartProducts } = useContext(AppContext);

  const userLogout = async () => {
    try {
      const res = await fetch(ENDPOINT.logout, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message, { position: "top-center" });
        setCurrentUser(null);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    userLogout();
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.trim() !== "") {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-[10vh] flex justify-between px-3 md:px-7 shadow">
      <div className="relative mt-3">
        <Link to="/">
          <span className="text-yellow-400 text-3xl md:text-4xl font-bold">
            Sho<span className="text-orange-400">pup</span>
          </span>
        </Link>
      </div>

      <div className="hidden items-center md:flex">
        <input
          type="search"
          className="h-9 pb-0.5 w-[25vw] outline-none px-3 bg-transparent border-gray-300 border-2 border-r-0 rounded-l-full"
          placeholder="Search product here ..."
          onChange={handleSearch}
          value={search}
        />
        <div className="bg-blue-500 h-9 w-12 flex justify-center items-center rounded-r-full">
          <IoSearchSharp className="text-white h-5 w-5" />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* <div className="bg-blue-500 h-9 w-9 rounded-full flex justify-center items-center cursor-pointer">
          <span className="text-white text-md">R</span>
        </div> */}
        {currentUser?.role === "ADMIN" && showAdminOption && (
          <div className="bg-white min-h-5 hidden md:flex flex-col absolute top-14 right-[160px] rounded-lg px-4 py-2 shadow-md z-30">
            <Link to="/admin-panel">
              <button
                onClick={() => setShowAdminOption(false)}
                className="text-gray-900 font-semibold hover:bg-gray-100 px-2 pb-0.5 rounded-md"
              >
                Admin panel
              </button>
            </Link>
          </div>
        )}

        {!currentUser ? (
          <button type="button">
            <FaUserCircle className="md:h-7 md:w-7 h-6 w-6" />
          </button>
        ) : (
          <button
            onClick={() => setShowAdminOption((prev) => !prev)}
            type="button"
            className="bg-blue-500 md:h-9 md:w-9 h-7 w-7 rounded-full flex justify-center items-center cursor-pointer"
          >
            <span className="text-white text-md md:text-lg">
              {currentUser?.name.slice(0, 1).toUpperCase()}
            </span>
          </button>
        )}

        {currentUser && (
          <Link to={"cart"}>
            <button className="relative flex items-center justify-center h-9 w-9">
              <IoCartOutline className="h-6 w-6 md:h-7 md:w-7" />
              {cartProducts?.length > 0 && (
                <span className="absolute top-0.5 md:top-0 right-0 bg-red-500 h-4 w-4 rounded-full flex justify-center items-center text-white text-[11px] font-semibold">
                  {cartProducts.length}
                </span>
              )}
            </button>
          </Link>
        )}
        {currentUser ? (
          <button
            type="button"
            className="bg-red-400 hover:bg-red-500 trasition-all text-white px-3 pb-1 rounded-full hidden md:block"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hidden md:flex">
            <button
              type="button"
              className="bg-blue-400 text-white px-3 pb-1 rounded-full"
            >
              Login
            </button>
          </Link>
        )}
        {currentUser ? (
          <button
            type="button"
            className="bg-red-400 text-white px-1 pr-1.5 py-1 rounded-md md:hidden"
            onClick={handleLogout}
          >
            <FiLogOut />
          </button>
        ) : (
          <Link to="/login" className="flex md:hidden">
            <button
              type="button"
              className="bg-blue-500 text-white px-1 pr-1.5 py-1 rounded-md"
            >
              <FiLogIn />
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
