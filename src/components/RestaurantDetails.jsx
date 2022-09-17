import React from 'react'
import { useParams } from 'react-router-dom';

const RestaurantDetails = () => {
  const { id } = useParams();

  return (
    <div class = 'restaurant_info'>
        <h1>Restaurant Info</h1>
        <h2> { id }</h2>
    </div>
    
  )
}

export default RestaurantDetails