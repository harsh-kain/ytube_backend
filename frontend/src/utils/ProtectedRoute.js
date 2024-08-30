import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate("/login")
    //     }
    // },[])
    if (!isAuthenticated) {
        navigate("/login");
    }
    return children;
};

export default ProtectedRoute;
