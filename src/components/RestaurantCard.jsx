import React from 'react'
import { NavLink } from 'react-router-dom';

//On click of 'What's Good?', information should be set to middleware.
// needs {ID, Restaurant Name, Address, Coordinates, price}
// middleware will check database for any menu item reviews and send data to Restaurant Page
// Needs to redirect to /Restaurant/{props.props.id}

const RestaurantCard = (props) => {
  console.log(props.props)
  return (
    <div class="card bg-gray-100 border rounded-md shadow-xl mx-2 md:mx-0 mb-2 mt-2 md:w-full  md:card-side">

    <div class="flex flex-row">
       <div class="flex justify-center py-1 w-2/5">
       <img
         src={props.props.image_url}
           class="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"        
           alt="restaurant"
         />
       </div>
       <div class="card-body w-3/5 text-xs text-left sm:text-sm lg:text-lg">
         <h2 class="card-title pt-2 font-bold">{props.props.name}</h2>
         <hr></hr>
         <p>Yelp Review: {props.props.rating}/5</p>
         <p>Price: {props.props.price}</p>
         <p class="text-xs">
           "Lorem ipsum color dolor it. Lorem ipsum color dolor it.
           Lorem ipsum color dolor it."{" "}
         </p>
         <div class ='flex justify-end'> 
         <button
             onClick=""
             class="bg-blue-500 text-white m-2  px-10 border border-blue-700 rounded"
             name={props.props.name}
           >
          <NavLink class="hover:text-indigo-600 text-gray-700" to="/restauant/">
           Reviews
         </NavLink>
           </button></div>
       </div>
      </div>
    </div>
   )
}

export default RestaurantCard;
