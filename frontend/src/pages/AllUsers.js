import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ENDPOINT from "../common";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const commonThClass = "text-base font-medium border py-1";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
  });

  const getAllUsers = async () => {
    try {
      const res = await fetch(ENDPOINT.allusers, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setAllUsers(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const updateUser = (user) => {
    const { _id, name, email, role } = user;
    setUserDetails({ userId: _id, name, email, role });
    setShowChangeRole(true);
  };

  const refreshAllUsers = (id, role) => {
    setAllUsers((prev) =>
      prev.map((user) => (user._id === id ? { ...user, role } : user))
    );
  };

  return (
    <div>
      <h2 className="text-gray-800 font-semibold text-xl pb-4">All Users :</h2>
      <table className="w-full bg-white pb-2 rounded-sm">
        <thead>
          <tr>
            <th className={`${commonThClass}`}>Sr.</th>
            <th className={`${commonThClass}`}>Name</th>
            <th className={`${commonThClass}`}>Email</th>
            <th className={`${commonThClass}`}>Role</th>
            <th className={`${commonThClass}`}>Created Date</th>
            <th className={`${commonThClass}`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => {
            return (
              <tr key={i + user._id}>
                <td className="text-base text-center border py-2">{i + 1}</td>
                <td className="text-base text-center border py-2">
                  {user.name}
                </td>
                <td className="text-base text-center border py-2">
                  {user.email}
                </td>
                <td className="text-base text-center border py-2">
                  {user.role}
                </td>
                <td className="text-base text-center border py-2">
                  {moment(user.createdAt).format("LL")}
                </td>
                <td className="text-center border">
                  <button
                    type="button"
                    className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white"
                    onClick={() => updateUser(user)}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showChangeRole && (
        <ChangeUserRole
          setShowChangeRole={setShowChangeRole}
          name={userDetails.name}
          email={userDetails.email}
          role={userDetails.role}
          userId={userDetails.userId}
          refreshAllUsers={refreshAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
