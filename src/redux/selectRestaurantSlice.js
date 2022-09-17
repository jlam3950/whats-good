import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectRestaurantSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    restaurantSelection: (state, action) => {
      state.restList = action.payload;
    },
  },
});

export const RestaurantData = (state) => state.restaurantInfo

export const { restaurantSelection } = selectRestaurantSlice.actions;

export default selectRestaurantsSlice.reducer;
