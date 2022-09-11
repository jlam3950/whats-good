import React from "react";
import { useSelector } from "react-redux";
import { SelectUsername } from "../redux/loginSlice";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const username = useSelector(SelectUsername);

  return (
    <nav>
      <div class="">
        <div class="flex justify-between h-16 px-10 shadow items-center">
          <div class="flex items-center space-x-8">
            {/* <div class="p-3 -mb-10 -mt-5 bg-red-600 text-white text-xl lg:text-2xl font-extrabold cursor-pointer border border-black">What's Good?</div> */}

            <NavLink to="/">
              <h1 class="text-xl -m-4 md:mr-2 lg:text-3xl font-bold cursor-pointer">
                What's Good?
              </h1>
            </NavLink>
            <div class="hidden md:flex justify-around space-x-4">
              <NavLink class="hover:text-indigo-600 text-gray-700" to="/">
                Home
              </NavLink>
              <NavLink class="hover:text-indigo-600 text-gray-700" to="/about">
                About
              </NavLink>
              <NavLink
                class="hover:text-indigo-600 text-gray-700"
                to="/contact"
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div class="flex space-x-2 -m-4  md:space-x-6 items-center">
            <NavLink className="text-gray-800 text-md" to="/login">
              {username != null ? `hi, ${username}` : "LOGIN"}
            </NavLink>
            <NavLink
              className="bg-red-500 p-2 sm:px-4 sm:py-2 rounded text-white hover:bg-red-400 text-sm"
              to="/register"
            >
              {username != null ? `SIGN OUT` : "SIGN UP"}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
