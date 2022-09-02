import React from "react";
// import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
    <div class="">
      <div class="flex justify-between h-16 px-10 shadow items-center">
        <div class="flex items-center space-x-8">
          <h1 class="text-xl lg:text-2xl font-bold cursor-pointer">What's Good?</h1>
          <div class="hidden md:flex justify-around space-x-4">
            <a href="#" class="hover:text-indigo-600 text-gray-700">Home</a>
            <a href="#" class="hover:text-indigo-600 text-gray-700">About</a>
            <a href="#" class="hover:text-indigo-600 text-gray-700">Contact</a>
          </div>
        </div>
        <div class="flex space-x-4 items-center">
          <a href="#" class="text-gray-800 text-sm">LOGIN</a>
          <a href="#" class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</a>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar