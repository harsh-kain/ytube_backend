import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { getRequest } from "../utils/FetchAPI";
import { ToastContainer, toast } from "react-toastify";

const Videos = ({login}) => {

    // const [count, setCount ] = useState(0)
    // const GetVideos = async() => {
    //     const data = await getRequest("/videos")
    //     console.log(data);
    //     return data
    // }
    // GetVideos();
    // useEffect( async () => {
    //     // const data = await getRequest("/videos")
    //     GetVideos()
    // },[login])

    return (
        <div>
            <ToastContainer />
            <VideoCard />
        </div>
    );
};

export default Videos;
