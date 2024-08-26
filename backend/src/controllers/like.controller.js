import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { Video } from "../models/video.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiErrors(404, "Incorrect video id");
    }

    const video = await Video.findById(videoId);

    const user = req.user;

    const existingLike = await Like.findOne({
        video: video?._id,
        likedBy: user?.id,
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, "Like removed successfully"));
    } else {
        await Like.create({
            video: video?._id,
            likedBy: user?._id,
        });
        return res
            .status(200)
            .json(new ApiResponse(200, "Like added successfully"));
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!isValidObjectId(commentId)) {
        throw new ApiErrors(404, "Incorrect comment id");
    }

    const comment = await Comment.findById(commentId);

    const user = req.user;

    const existingComment = await Like.findOne({
        comment: comment?._id,
        likedBy: user?._id,
    });


    if (existingComment) {
        await existingComment.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, "Like removed successfully"));
    } else {
        await Like.create({
            comment: comment?._id,
            likedBy: user?._id,
        });
        return res
            .status(200)
            .json(new ApiResponse(200, "Like added successfully"));
    }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiErrors(404, "Incorrect tweet id");
    }

    const tweet = await Tweet.findById(tweetId);
    const user = req.user;

    const existingTweet = await Like.findOne({
        tweet: tweet?._id,
        likedBy: user?._id,
    });

    if(existingTweet){
        await existingTweet.deleteOne();
        return res
        .status(200)
        .json(new ApiResponse(200, "Like removed successfully"));
    }else{
        await Like.create({
            tweet : tweet?._id,
            likedBy : user?._id
        })
        return res
            .status(200)
            .json(new ApiResponse(200, "Like added successfully"));
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const user = req.user;

    // Fetch all liked videos for the current user
    const likedVideos = await Like.find({ likedBy: user?._id })
        .populate('video', '-tweet -comment') // Populating video details and excluding tweet and comment fields
        .exec();

    // If no liked videos are found, return a message
    if (!likedVideos.length) {
        return res.status(404).json(new ApiResponse(404, "No liked videos found"));
    }

    // Return the liked videos to the client
    return res.status(200).json(new ApiResponse(200, "Liked videos retrieved successfully", likedVideos));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
