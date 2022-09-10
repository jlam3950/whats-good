import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: [],
}

const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       updateUser: (state, action) => {
        console.log(`hi this is the ${action.payload}`);
        state.username.push(action.payload);
       }
    }
})

export const SelectUsername = (state) => state.user.username; 

export const { 
    updateUser,
} = loginSlice.actions;

export default loginSlice.reducer; 