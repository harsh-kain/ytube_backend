import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { getRequest } from "../utils/FetchAPI";
import { ToastContainer, toast } from "react-toastify";

const Videos = () => {
    const [allVideos , setAllVideos]= useState(null)
    console.log(allVideos);
    const fetchAllVideos = async () => {
        try {
            const response = await getRequest("/videos")
            if(response?.data){
                setAllVideos(response.data)
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchAllVideos()
    },[])
    return (
        <div className="flex justify-start items-start flex-wrap ">
            <ToastContainer />
            <VideoCard data={allVideos?.videos}/>
        </div>
    );
};

export default Videos;
