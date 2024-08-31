import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(token){
            dispatch(setAuthenticated(true))
        }else{
            navigate("/login");
        }
    }, [isAuthenticated, navigate,dispatch]);

    if (!isAuthenticated) {
        return null; 
    }

    return children;
};

export default ProtectedRoute;
