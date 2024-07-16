import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ENDPOINT from "../common";

const ChangeUserRole = ({
  userId,
  name,
  role,
  email,
  setShowChangeRole,
  refreshAllUsers,
}) => {
  const [changeRole, setChangeRole] = useState(role);

  const updateUserRole = async () => {
    try {
      const payload = { userId, role: changeRole };
      const res = await fetch(ENDPOINT.updateUserRole, {
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message, { position: "top-center" });
        setShowChangeRole(false);
        refreshAllUsers(userId, changeRole);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 bottom-0 right-0 left-0 flex justify-center items-center z-10 bg-white bg-opacity-50">
      <div className="bg-slate-100 rounded-lg px-4 py-4 shadow-lg w-[25vw]">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Change User Role </h3>
          <button type="button" onClick={() => setShowChangeRole(false)}>
            <IoCloseCircleOutline className="h-5 w-5" />
          </button>
        </div>
        <div className="px-2 pt-2">
          <p className="text-md font-medium pb-1">
            Name : <span className="text-base font-normal">{name}</span>
          </p>
          <p className="text-md font-medium pb-1">
            Email : <span className="text-base font-normal">{email}</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium">Role : </span>
            <select
              value={changeRole}
              className="py-0.5 px-4 rounded-b-md border outline-none"
              onChange={(e) => setChangeRole(e.target.value)}
            >
              <option value="GENERAL">General</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
        <div className="text-center pt-4">
          <button
            className="px-5 pb-0.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 outline-none"
            onClick={updateUserRole}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
