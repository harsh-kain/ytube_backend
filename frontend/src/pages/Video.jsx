import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../utils/FetchAPI";
import ReactPlayer from "react-player";
import "../App.css";

const Video = () => {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const fetchData = async () => {
        try {
            // Fetch video details
            const videoResponse = await getRequest(`/videos/${videoId}`);
            if (videoResponse?.success) {
                setVideoData(videoResponse?.data);

                // Fetch channel details only after video data is available
                const channelName = videoResponse?.data?.owner?.username;
                if (channelName) {
                    const channelResponse = await getRequest(`/users/channel/${channelName}`);
                    if (channelResponse?.success) {
                        setChannelData(channelResponse?.data);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [videoId]);

    console.log(videoData);
    console.log(channelData);
    return (
        <>
            <div className="video-big-wrapper">
                <div className="player-wrapper">
                    <ReactPlayer
                        url={videoData?.videoFile}
                        controls
                        width="100%"
                        height="100%" // Set height to 100% so it fills the container
                        className="react-player"
                    />
                </div>
            </div>
            <div className="w-full bg-blue-50 flex justify-center items-center ">
                {/* <h4 className="">{videoData?.description}</h4> */}
                <div className=" text-black p-4 ">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                            <h1 className="text-xl md:text-2xl font-bold">{videoData?.description}</h1>
                            <div className="flex items-center mt-2">
                                <img
                                    src="https://yt3.ggpht.com/ytc/AKedOLTzU2t9oRfxjhH5bkYcXUz91dHXzvFT9vdmLv2V=s88-c-k-c0x00ffffff-no-rj" // Replace with the actual channel avatar URL
                                    alt="Ishtar Punjabi"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-semibold">Ishtar Punjabi</p>
                                    <p className="text-xs text-gray-400">24.1M subscribers</p>
                                </div>
                                <button className="ml-4 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">Subscribe</button>
                            </div>
                            <p className="mt-3 text-gray-400 text-sm">9.4M views • 2 years ago #jagdeepsidhu #beliya #lekh</p>
                            <p className="mt-2 text-gray-400 text-sm">White Hill Music presents the lyrical video of "Beliya" sung by Gurnam Bhullar from the Punjabi movie LEKH. Starring Gurnam Bhullar and Tania. Directed by Manvir Brar. Story by Jagdeep Sidhu. Lyrics written and composed by Jaani. Music by B Praak. Produced by Gunbir Singh Sidhu & Manmord Singh Sidhu.</p>
                        </div>
                        <div className="flex items-center mt-4 md:mt-0 md:ml-8 space-x-4">
                            <div className="flex items-center space-x-1">
                                <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9l-3 3m0 0l-3-3m3 3V4m6 16h.01M4 20h16v-7m-4 4v.01M4 15v5m-4-5v5m8-5v5m-4-5v5" />
                                    </svg>
                                    <span className="ml-1">102K</span>
                                </button>
                                <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15l-3-3m0 0l-3 3m3-3V4m6 16h.01M4 20h16v-7m-4 4v.01M4 15v5m-4-5v5m8-5v5m-4-5v5" />
                                    </svg>
                                </button>
                            </div>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full">Share</button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full">Download</button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full">Clip</button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full">Save</button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full">...</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Video;
