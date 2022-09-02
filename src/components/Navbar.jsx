import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
    <div class="">
      <div class="flex justify-between h-16 px-10 shadow items-center">
        <div class="flex items-center space-x-8">
          <h1 class="text-xl lg:text-2xl font-bold cursor-pointer">What's Good?</h1>
          <div class="hidden md:flex justify-around space-x-4">
            <NavLink class="hover:text-indigo-600 text-gray-700"to ='/'>Home</NavLink>
            <NavLink class="hover:text-indigo-600 text-gray-700" to ='/about'>About</NavLink>
            <NavLink class="hover:text-indigo-600 text-gray-700" to ='/contact'>Contact</NavLink>
          </div>
        </div>
        <div class="flex space-x-4 items-center">
          <NavLink class="text-gray-800 text-sm" to='/login'>LOGIN</NavLink>
          <NavLink class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" to='/login'>SIGNUP</NavLink>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar