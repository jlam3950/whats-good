import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/loginSlice";
import restaurantReducer from "../redux/nearbyRestaurantsSlice.js" 
//import { nearbyRestaurantsMiddleware } from "../middleware/nearbyRestaurantsMiddleware";

export default configureStore({
    reducer:{
      user: loginReducer, 
      restaurantList: restaurantReducer
    },
    // middleware:{
    //   nearbyRestaurantsMiddleware
    // }
  })
  