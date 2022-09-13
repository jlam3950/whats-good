import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRestaurantList } from "../redux/nearbyRestaurantsSlice";
import RestaurantCard from "./RestaurantCard"

// import { NavLink } from 'react-router-dom';

const Search = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [restList, setRestList] = useState([]);
  const dispatch = useDispatch();

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
                className="block w-full px-5 py-1 text-purple-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <button className="px-4 text-white bg-green-500 hover:bg-green-700 borderborder-blue-700 rounded-lg">
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
          <div class="bg-blue-200 container h-1/12 rounded md:w-1/2 ml-2 md:h-screen">
            {restList.map((restData)=>{
              return (
                <RestaurantCard props={restData} />
              )
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
