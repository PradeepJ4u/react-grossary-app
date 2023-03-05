import { createSlice } from "@reduxjs/toolkit";
import { CNTX_USER } from "../component/Util/Constants";

const userSlice = createSlice({
    name:"user",
    initialState: {currentUser: CNTX_USER},
    reducers:{
        setUser(state,action){
            state.currentUser = action.payload
        }
    }
})

export const userAction = userSlice.actions

export const userReducer = userSlice.reducer