import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo_img.jpg";

const Footer = () => {
  return (
      <footer class="p-4 bg-gray-800 w-full shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div class="sm:flex sm:items-center sm:justify-between">
          <NavLink
            to="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0"
          >
            <img src={logo} class="mr-3 h-8" alt="Flowbite Logo" />
            <span></span>
          </NavLink>
        <span class="block text-sm sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://github.com/jlam3950" class="hover:underline">
            What's Good ™
          </a>
        </span>
          <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <NavLink to="/about" class="mr-4 hover:underline md:mr-6 ">
                About
              </NavLink>
            </li>
            <li class="px-4">
              <NavLink to="/contact" class="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>
  );
};

export default Footer;
