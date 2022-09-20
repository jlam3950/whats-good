import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/loginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const [userReg, setUserReg] = useState("");
  const [pwReg, setPwReg] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PWconfirmation = useRef();

  const saveUser = (login) =>{
    console.log(login);
    dispatch(updateUser(login));
  }

  const registerUser = (e) => {
    e.preventDefault();
    console.log(userReg, pwReg);
    if(pwReg !== PWconfirmation.current.value){
      alert('Sorry, passwords do not match')
    }
    Axios({
      method: "post",
      data: {
        username: userReg,
        password: pwReg,
      },
      withCredentials: true,
      url: "http://localhost:5500/register",
    }).then(
      (res) => setData(res.data),
      setTimeout(() => {
        saveUser(userReg);
        navigate('/');
        // window.location.replace("http://localhost:3000");
      }, 2000)
    );
  };

  let saveReg = (e) => {
    return setUserReg(e.target.value);
  };

  let savePw = (e) => {
    return setPwReg(e.target.value);
  };

  return (
    <div className=" h-screen">
      <div class="flex justify-center">
        <div class="py-6 px-8 h-80 mt-40 bg-white rounded shadow-xl">
          <h1 class="flex justify-center mb-8 font-bold text-3xl">Sign Up!</h1>
          <form action="">
            {/* <div class = 'mb-5'>
            <label for="email" class="block text-gray-800 font-bold">
                E-mail:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email address"
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div> */}
            <div class="mb-6">
              <label for="name" class="block text-gray-800 font-bold">
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                onChange={saveReg}
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <div>
              <label for="email" class="block text-gray-800 font-bold">
                Password:
              </label>
              <input
                type="text"
                placeholder="password"
                onChange={savePw}
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
             <div
                class="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block invisible hover:text-indigo-600"
              >
                Forget Password
              </div>
            </div>
            <div>
              <label for="email" class="block text-gray-800 font-bold">
                Confirm Password:
              </label>
              <input
                type="text"
                placeholder="password"
                ref = {PWconfirmation}
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

        
                
            <button
              onClick={registerUser}
              class="cursor-pointer py-2 px-4 block mt-3 bg-red-500 text-white font-bold w-full text-center rounded"
            >
              Register
            </button>
            <div class="text-center pt-3"> {data} </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
