import React from 'react'

//On click of 'What's Good?', information should be set to middleware.
// needs {ID, Restaurant Name, Address, Coordinates, price}
// middleware will check database for any menu item reviews and send data to Restaurant Page
// Needs to redirect to /Restaurant/{props.props.id}

const RestaurantCard = (props) => {
  return (
    <div class="card bg-white shadow-xl m-3 md:card-side">
    <figure>
      <img src={props.props.image_url} alt="restaurant" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{props.props.name}</h2>
      <p>Yelp Review: {props.props.rating}/5</p>
      <p>Price: {props.props.price}</p>
      <div class="card-actions flex justify-center">
        <button onClick="" class="bg-blue-500 text-white m-2 py-1 px-2 border border-blue-700 rounded">
          What's Good?
        </button>
      </div>
    </div>
  </div>
   )
}

export default RestaurantCard