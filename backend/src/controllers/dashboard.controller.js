import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const user = req.user;

    const allVideo = await Video.find({
        owner: user?._id,
    });

    const totalViews = allVideo?.reduce((acc, curr) => {
        return curr.views + acc;
    }, 0);

    const allLikedVideoList = await Like.find({
        likedBy: user?._id,
    }).populate("video");

    const totalLikes = allLikedVideoList.length;

    const totalVideo = allVideo?.length;

    const totalSubscriber = await Subscription.find({
        channel: user?._id,
    });
    const totalSubscriberLength = totalSubscriber.length;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalVideo,
                    totalSubscriberLength,
                    allLikedVideoList,
                    totalViews,
                    totalLikes,
                },
                "Fetched all videos successfully"
            )
        );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const user = req.user;

    const allVideo = await Video.find({
        owner: user?._id,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, allVideo, "Fetched all videos successfully")
        );
});

export { getChannelStats, getChannelVideos };
