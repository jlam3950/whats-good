import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/loginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  const [userLogin, setUserLogin] = useState("");
  const [pwLogin, setPwLogin] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveUser = (login) =>{
    console.log(login);
    dispatch(updateUser(login));
  }
  
  const loginUser = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      data: {
        username: userLogin,
        password: pwLogin,
      },
      withCredentials: true,
      url: "http://localhost:5500/login",
    }).then((res) => setData(res.data), setTimeout(() =>{
      saveUser(userLogin);
      navigate('/');
    }, 2000));
    
  };
  
  // console.log(useSelector(SelectUsername));

  // const displayUserLogin = () => {
  //   Axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:5500/user",
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };

  return (

    <div className="bg-gray-100 h-screen">
      <div class="flex justify-center">
        <div class="py-6 px-8 h-80 mt-40 bg-white rounded shadow-xl">
          <h1 class="flex justify-center mb-8 font-bold text-3xl">Sign In</h1>
          <form action="">
            <div class="mb-6">
              <label for="name" class="block text-gray-800 font-bold">
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                onChange={(e) => setUserLogin(e.target.value)}
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <div>
              <label for="email" class="block text-gray-800 font-bold">
                Password:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="password"
                onChange={(e) => setPwLogin(e.target.value)}
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              <NavLink
                to="/"
                class="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
              >
                Forget Password
              </NavLink>
            </div>
            <button
              onClick={loginUser}
              class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            >
              Login
            </button>
            <NavLink to="/register">
              <button class="cursor-pointer py-2 px-4 block mt-3 bg-red-500 text-white font-bold w-full text-center rounded">
                New User?
              </button>
            </NavLink>
            <div class="text-center pt-3"> {data} </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
