import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/loginSlice";

export default configureStore({
    reducer:{
      user: loginReducer, 
    }
  })
  