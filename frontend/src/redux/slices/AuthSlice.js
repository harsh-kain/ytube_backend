import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
    isAuthenticated : false,
    accessToken : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload
            localStorage.setItem('accessToken', action.payload)
            Cookies.set('accessToken', action.payload, {expires : 5})

        },
        logout : (state, action) => {
            state.isAuthenticated = false;
            state.accessToken =  null;
            localStorage.removeItem('accessToken')
        },
        checkAuth : (state) => {
            const token = localStorage.getItem('accessToken')
            console.log("token from checkauth",token);
            if(token){
                console.log("in");
                state.isAuthenticated = true;
                state.accessToken = token
            }else{
                console.log("out");
                state.isAuthenticated = false;
                state.accessToken = null
            }
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    }
})

export const {login, logout, checkAuth,setAuthenticated} =authSlice.actions
export default authSlice.reducer