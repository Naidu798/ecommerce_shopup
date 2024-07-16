import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AdminPanel = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div className="hidden md:flex items-center w-screen h-[90vh]">
      <aside className="flex flex-col py-3 w-[17%] h-full shadow-lg bg-slate-50 border border-gray-200 px-4 rounded-lg gap-3">
        <div className="flex flex-col items-center border border-gray-300 py-3 rounded-lg">
          <div className="bg-green-300 h-24 w-24 rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl font-semibold text-white">
              {currentUser?.name.slice(0, 1).toUpperCase()}
            </span>
          </div>
          <span className="text-2xl font-semibold text-gray-800">
            {currentUser.name}
          </span>
          <span className="text-sm leading-loose">ADMIN</span>
        </div>
        <div className="flex flex-col gap-2 items-center border border-gray-300 py-3 rounded-lg h-full px-3 w-full">
          <Link
            to={"all-users"}
            className="bg-gray-100 w-full flex justify-center rounded-lg py-1 hover:bg-gray-300"
          >
            <span className="text-md font-medium text-gray-900">All users</span>
          </Link>
          <Link
            to="all-products"
            className="bg-gray-100 w-full flex justify-center rounded-lg py-1 hover:bg-gray-300"
          >
            <span className="text-md font-medium text-gray-900">
              All products
            </span>
          </Link>
        </div>
      </aside>
      <main className="h-full w-full p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
