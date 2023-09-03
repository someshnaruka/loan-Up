import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    _id:null,
    name:null,
    googleId:null,
    username: null,
    profilePic: null,
};

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            
            state._id = action.payload._id;
      state.name = action.payload.name;
      state.googleId = action.payload.googleId;
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