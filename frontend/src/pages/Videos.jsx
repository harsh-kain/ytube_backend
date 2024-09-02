import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { getRequest } from "../utils/FetchAPI";
import { ToastContainer, toast } from "react-toastify";
import RefreshToken from "../components/RefreshToken";

const Videos = () => {
    const [allVideos , setAllVideos]= useState(null)
    const fetchAllVideos = async () => {
        try {
            const response = await getRequest("/videos")
            if(response?.data){
                setAllVideos(response.data)
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchAllVideos()
    },[])
    console.log(allVideos);
    return (
        <div className="flex justify-center items-start flex-wrap w-full mt-[2rem]">
            <ToastContainer />
            {allVideos ? <VideoCard data={allVideos?.videos}/> : <RefreshToken />}
            
        </div>
    );
};

export default Videos;
