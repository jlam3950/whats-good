import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
    <div class="">
      <div class="flex justify-between h-16 px-10 shadow items-center">
        <div class="flex items-center space-x-8">
          {/* <div class="p-3 -mb-10 -mt-5 bg-red-600 text-white text-xl lg:text-2xl font-extrabold cursor-pointer border border-black">What's Good?</div> */}
          <h1 class="text-2xl lg:text-3xl font-bold cursor-pointer">What's Good?</h1>
          <div class="hidden md:flex justify-around space-x-4">
            <NavLink class="hover:text-indigo-600 text-gray-700" to ='/'>Home</NavLink>
            <NavLink class="hover:text-indigo-600 text-gray-700" to ='/about'>About</NavLink>
            <NavLink class="hover:text-indigo-600 text-gray-700" to ='/contact'>Contact</NavLink>
          </div>
        </div>
        <div class="flex space-x-4 items-center">
          <NavLink class="text-gray-800 text-sm" to='/login'>LOGIN</NavLink>
          <NavLink class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" to='/register'>SIGNUP</NavLink>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar