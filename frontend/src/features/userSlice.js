import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    _id:null,
    firstName: null,
    lastName: null,
    username: null,
    profilePic: null,
};

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload);
            state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.profilePic = action.payload.profilePic;
        },
        logoutRedux:(state,action)=>{
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.username = "";
            state.image = "";
            state.profilePic = "";
        }
    }
});

export const {loginRedux,logoutRedux}=userSlice.actions;
export default userSlice.reducer;