import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../features/userSlice";
import dataSlice from "../features/dataSlice";
export const store=configureStore({
    reducer:{
        user:userSlice,
        data:dataSlice,
    },
});

