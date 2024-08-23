import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const subscriberId = req.user.id;
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new ApiErrors(400, "Invalid channel ID");
    }

    // Ensure the subscriber and channel are different users
    if (subscriberId === channelId) {
        throw new ApiErrors(400, "You cannot subscribe to your own channel");
    }

    // Check if the subscription already exists
    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId,
    });
    

    if (existingSubscription) {
        // If subscription exists, unsubscribe (delete the subscription)
        await existingSubscription.deleteOne();
        return res.status(200).json(new ApiResponse(200, "Unsubscribed successfully"));
    } else {
        // If subscription does not exist, subscribe (create a new subscription)
        const newSubscription = new Subscription({
            subscriber: subscriberId,
            channel: channelId,
        });

        await newSubscription.save();
        return res.status(201).json(new ApiResponse(201, "Subscribed successfully"));
    }
});



// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    
    if(!isValidObjectId(channelId)){
        throw new ApiErrors(400, "Invalid channel ID");
    }
    
    const channelSubscribers = await Subscription.find({
        channel : channelId
    }).populate('subscriber')
    
    console.log(channelSubscribers);

    
    if (channelSubscribers.length === 0) {
        throw new ApiErrors(404, "Channel not found or no subscribers");
    }
    

    // Optionally, if you want to count the number of subscribers:
    const totalSubscribers = channelSubscribers.length;

    return res.status(200)
              .json(new ApiResponse(200, {channelSubscribers , totalSubscribers}, "Fetched all subscribers"))
   
    
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    
    // Validate channelId format
    if (!isValidObjectId(channelId)) {
        throw new ApiErrors(400, "Invalid channel ID");
    }

    // Find all subscriptions where the user is the subscriber
    const subscriptions = await Subscription.find({ subscriber: channelId }).populate('channel');
    console.log(subscriptions);
    
    if (subscriptions.length === 0) {
        throw new ApiErrors(404, "No subscriptions found for this user");
    }

    // Extract the list of subscribed channels
    const subscribedChannels = subscriptions.map(sub => sub.channel);
    console.log(subscribedChannels);
    
    // Return the list of subscribed channels
    return res.status(200)
              .json(new ApiResponse(200, subscribedChannels, "Fetched all subscribers"))
});



export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
