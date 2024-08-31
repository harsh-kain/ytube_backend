import "./App.css";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Videos from "./pages/Videos";
import ComplexNavbar from "./components/Navbar";
import { postRequest } from "./utils/FetchAPI";
import { Link, Route, Routes } from "react-router-dom";
import { checkAuth } from "./redux/slices/AuthSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import store from "./redux/Store";
import Dashboard from './pages/Dashboard'
import { Provider, useDispatch } from "react-redux";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const [open, setOpen] = useState(0);
    const [openAlert, setOpenAlert] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        // <Router> {/* Wrap the entire app with Router */}
        <div className="flex justify-center items-center w-full flex-col">
            <ComplexNavbar
                openDrawer={openDrawer}
                isDrawerOpen={isDrawerOpen}
            />
            <Sidebar
                isDrawerOpen={isDrawerOpen}
                closeDrawer={closeDrawer}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                handleOpen={handleOpen}
            />
            <div className="containerWrapper w-full flex justify-start items-start flex-wrap mt-[3rem] px-[1rem]">
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Videos />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
        // </Router>
    );
}

export default App;
