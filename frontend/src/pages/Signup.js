import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ENDPOINT from "../common";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const signupUser = async (userDetails) => {
    try {
      const res = await fetch(ENDPOINT.signup, {
        method: "POST",
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
    } else if (password === confirmPassword) {
      const userDetails = {
        name,
        email,
        password,
        profilePic: "",
      };
      signupUser(userDetails);
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="login" className="w-full flex justify-center py-4 md:py-9">
      <div className="bg-white px-4 md:px-8 py-7 md:py-8 rounded-2xl w-[90vw] md:w-[32vw] shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <label>
            <div className="w-full flex justify-center">
              <FaRegUserCircle className="md:h-32 md:w-40 h-24 w-28 text-blue-700" />
            </div>
          </label>
          <label className="block text-gray-900 font-semibold text-md">
            Name :
          </label>
          <input
            type="text"
            className="h-9 w-full mt-1 outline-none border border-gray-300 rounded-lg px-3 pb-0.5"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-gray-900 font-semibold text-md mt-2">
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
            Confirm password :
          </label>
          <div className="flex items-center relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="h-9 w-full mt-1 outline-none border border-gray-300 rounded-lg pl-3 pr-14 pb-0.5"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="bg-blue-500 rounded-full px-8 pb-1.5 pt-1 text-white mx-auto block mt-5 hover:bg-blue-700 hover:scale-110 transition-all"
          >
            Signup
          </button>
          <div className="text-center md:text-left">
            <p className="text-gray-900 font-semibold text-md mt-4">
              Already have an account ?{" "}
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

export default Signup;
