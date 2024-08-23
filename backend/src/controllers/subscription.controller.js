import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };


// const { channelId } = req.params;
//     const { sub } = req.query;
//     console.log(sub);
    
//     if (!isValidObjectId(channelId)) {
//         throw new ApiErrors(500, "ChannelID is required.");
//     }

//     if (sub === "true") {
//         await Subscription.deleteOne({
//             channel: channelId,
//             subscriber: req.user?._id,
//         });
//     } else {
//         await Subscription.create({
//             subscriber: req.user?._id,
//             channel: channelId,
//         });
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, {}, "Subscriptiion toggled succesfully."));