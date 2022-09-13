import React from 'react'
import MenuItem from './MenuItem'

const Restaurant = () => {


//will probably use Restaurant/{restaurant.id} as the route to make them unique.

  return (
    <div class = 'container mx-auto md:mt-2'>
        <h1>Restaurant Name</h1>
    <div class="flex flex-col md:flex-row space-x-2">
        <div class="bg-blue-200 container h-1/12 rounded  ml-2 md:h-screen">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        </div>
    </div>
</div>

  )
}

export default Restaurant