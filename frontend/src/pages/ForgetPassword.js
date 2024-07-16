import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ENDPOINT from "../common";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const updatePassword = async (userDetails) => {
    try {
      const res = await fetch(ENDPOINT.updatePassword, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message, { position: "top-center" });
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      toast.error("Please provide valid email");
    } else if (!(password === conformPassword)) {
      toast.error("Both password and confirm password must be same");
    } else {
      if (password.length < 6) {
        return toast.error("Password must be atleast 6 characters");
      }
      const userDetails = {
        email,
        password,
      };
      updatePassword(userDetails);
    }
  };

  return (
    <section
      id="forgetPassowrd"
      className="w-full flex justify-center items-center py-12 md:py-16"
    >
      <div className="bg-white px-4 md:px-8 py-8 md:py-10 rounded-2xl w-[90vw] md:w-[32vw] shadow-lg">
        <div className="w-full flex justify-center">
          <FaRegUserCircle className="h-32 w-40 text-blue-700" />
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block text-gray-900 font-semibold text-md">
            Email :
          </label>
          <input
            type="text"
            className="h-9 w-full mt-1 outline-none border border-gray-300 rounded-lg px-3 pb-0.5"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-gray-900 font-semibold text-md mt-4">
            Password :
          </label>
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              className="h-9 w-full mt-1 outline-none border border-gray-300 rounded-lg pl-3 pr-14 pb-0.5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {showPassword ? (
              <BsFillEyeSlashFill
                className="h-5 w-5 absolute right-5 mt-1"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BsFillEyeFill
                className="h-5 w-5 absolute right-5 mt-1"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <label className="block text-gray-900 font-semibold text-md mt-4">
            Confirm Password :
          </label>
          <div className="flex items-center relative mb-5">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="h-9 w-full mt-1 outline-none border border-gray-300 rounded-lg pl-3 pr-14 pb-0.5"
              placeholder="Confirm password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
            />

            {showConfirmPassword ? (
              <BsFillEyeSlashFill
                className="h-5 w-5 absolute right-5 mt-1"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <BsFillEyeFill
                className="h-5 w-5 absolute right-5 mt-1"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-full px-8 pb-1.5 pt-1 text-white mx-auto block mt-4 md:mt-2 hover:bg-blue-700 hover:scale-110 transition-all"
          >
            Change Password
          </button>
          <div className="text-center md:text-left">
            <p className="text-gray-900 font-semibold text-md mt-4">
              You want to go to ?{" "}
              <Link to="/login" className="hover:text-red-500 hover:underline">
                Login{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
