import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateRestaurantList } from "../redux/nearbyRestaurantsSlice";
import RestaurantCard from "./RestaurantCard";
// import fakeRestaurant from "../images/food.jpg";
// import { NavLink } from 'react-router-dom';

const Search = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [restList, setRestList] = useState([]);
  const dispatch = useDispatch();
  const inputAddress = useRef()

  const handleAddress = () =>{
    console.log("address Clicked")
    const typedAddress = inputAddress.current.value;
    //console.log(typedAddress)
    if (typedAddress === "") return;
    const calledAddress = typedAddress.replaceAll(" ","+").replaceAll("/[.,#!$%^&*;:{}=-_`~()]/","");
    console.log("Called ", calledAddress)
    fetch("/getLocationWithAddress", {
      method: "POST",
      body: JSON.stringify({ address: calledAddress }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setRestList(response);
        saveRestaurantList(response);
      });
  } 
  
  const saveRestaurantList = (list) => {
    dispatch(updateRestaurantList(list));
  };

  const getLocation = (e) => {
    try {
      e.preventDefault();
      //   console.log("Frontend lat: " + lat + "long: " + long);

      fetch("/getLocation", {
        method: "POST",
        body: JSON.stringify({ lat: lat, long: long }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setRestList(response);
          saveRestaurantList(response);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    const keyDownHandler = event => {
      if (event.key==="Enter"){
        event.preventDefault()
        handleAddress();
      }
    }
    document.addEventListener('keydown',keyDownHandler);
    return () => {
      document.removeEventListener('keydown',keyDownHandler);
    };
  },[])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });

  return (
    <>
      <div class="container flex flex-col md:items-center px-4 mx-auto mt-5 md:space-y-0">
        <div class="flex flex-col mx-auto md:flex-row">
          <div className="flex items-center">
            <div className="flex space-x-1">
              <input
                type="text"
                ref={inputAddress}
                className="block w-full px-5 py-1 text-purple-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Zip Code or Address, City, and State"
               
              />
              <button onClick={handleAddress} className="px-4 text-white bg-green-500 hover:bg-green-700 borderborder-blue-700 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={getLocation}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-1 px-4 border border-blue-700 rounded"
          >
            What's good around me?
          </button>
        </div>
      </div>
      <div class="container mx-auto md:mt-2">
        <div class="flex flex-col md:flex-row space-x-2">
          <div class="container h-1/12 rounded md:ml-0 md:w-2/4 md:h-screen">
            {/* <div class="card bg-gray-100 border rounded-md shadow-xl mx-2 md:mx-0 mb-2 mt-2 md:w-full  md:card-side">
             <div class="flex flex-row">
                <div class="flex justify-center py-1 w-2/5">
                <img
                  src={fakeRestaurant}
                    class="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"
                    alt="restaurant"
                  />
                </div>
                <div class="card-body w-3/5 text-xs text-left sm:text-sm lg:text-lg">
                  <h2 class="card-title pt-2 font-bold">Trappe Door</h2>
                  <hr></hr>
                  <p>Yelp Review: 4/5</p>
                  <p>Price: ****</p>
                  <p class="text-xs">
                    "Lorem ipsum color dolor it. Lorem ipsum color dolor it.
                    Lorem ipsum color dolor it."{" "}
                  </p>
                  <div class ='flex justify-end'> <button
                      onClick=""
                      class="bg-blue-500 text-white m-2  px-10 border border-blue-700 rounded"
                    >
                      Reviews
                    </button></div>
                </div>
              </div>
              
            </div> */}
            {restList.map((restData) => {
              return <RestaurantCard props={restData} />;
            })}
          </div>
          <div class="bg-red-200 container h-1/2 rounded md:w-1/2 mr-2 md:h-screen">
            Live map/modal here
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
