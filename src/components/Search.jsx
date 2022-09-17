
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRestaurantList } from "../redux/nearbyRestaurantsSlice";
import RestaurantCard from "./RestaurantCard";
import { GoogleMap, useLoadScript, InfoWindow, Marker } from "@react-google-maps/api"
// import { FaPhone }from 'react-icons/fa'


const Search = () => {

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [restList, setRestList] = useState([]);
  const dispatch = useDispatch();

  const saveRestaurantList = (list) => {
    dispatch(updateRestaurantList(list));
  };

  const getLocation = async (e) => {
    try {
      e.preventDefault();
      console.log("clicked")
      fetchAPI();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAPI = () =>{
    
    if(lat==="" && long===""){
      alert('geolocation data loading, click search once map has loaded');
    }

    if(lat !== ""){
    console.log("fetching")
    fetch("/getLocation", {
      method: "POST",
      body: JSON.stringify({ lat: lat, long: long }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((response) => {
        setRestList(response);
        saveRestaurantList(response);
      });
  }}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });

  //googleMapAPI

  let googleKey = process.env.REACT_APP_GOOGLE_KEY; 

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey,
  });
  
  const MapLoad = () => {
    if (!isLoaded) return <div>Loading...</div>;
    else if (isLoaded){
      return <Map />
    };
  }

  function Map(){
    const [activeMarker, setActiveMarker] = useState('');
    const handleActiveMarker = (marker) => {
      if (marker === activeMarker){
        return; 
      }
      setActiveMarker(marker);
    }

    return (
      <GoogleMap
        zoom={14}
        center={{lat: lat, lng: long}}
        onClick={() => setActiveMarker(null)}
        mapContainerClassName = "map-container"
        >
          {restList.map((restaurants, index) => {
          return <Marker 
          key={index}
          animation={2}
          onClick={() => handleActiveMarker(index)}
          position= {{lat:restaurants.coordinates.latitude, lng:restaurants.coordinates.longitude}}>
          {activeMarker === index ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
              {restaurants.name}<br></br>
              {restaurants.phone}<br></br>
              {`Rating: ${restaurants.rating}`}
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
    })}   
        </GoogleMap>
    )
  }

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
          <div class="container h-1/12 rounded sm:max-w-xl md:ml-0 md:w-2/4 md:h-screen md:flex md:flex-col md:items-center">
            {restList.map((restData) => {
              return <RestaurantCard props={restData} />;
            })}
          </div>
          <div class="container h-1/2 rounded md:w-1/2 mr-2 md:h-screen">
            {lat !== '' ? <MapLoad /> : 'Geolocation data is loading...' }
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
