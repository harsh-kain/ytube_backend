import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    const { content } = req.body;

    if (!content) {
        throw new ApiErrors(400, "All fields are required");
    }

    const user = req.user;

    const tweet = await Tweet.create({
        content,
        owner: user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet add successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const { userId } = req.params;

    const validUser = await User.findById(userId);

    if (!validUser) {
        throw new ApiErrors(404, "User not valid");
    }

    const allTweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(validUser?._id),
            },
        },
    ]);

    if (!allTweets || allTweets.length === 0) {
        throw new ApiErrors(404, "No data available");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, allTweets, "All tweets Fetched Successfully")
        );
});

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params;
    const { content } = req.body;
    const validTweet = await Tweet.findById(tweetId);

    if (!validTweet) {
        throw new ApiErrors(404, "Tweet not found");
    }

    const newTweet = await Tweet.findByIdAndUpdate(
        validTweet?._id,
        {
            $set: {
                content,
            },
        },
        { new: true }
    );

    return res
    .status(200)
    .json(new ApiResponse(200, newTweet, "Tweet update successfully "))
});

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    const {tweetId } = req.params;

    const validTweet = await Tweet.findById(tweetId);

    if(!validTweet){
        throw new ApiErrors(404, "Tweet not found");
    }

    await Tweet.findByIdAndDelete(validTweet?._id)

    return res
    .status(200)
    .json(new ApiResponse(200, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
