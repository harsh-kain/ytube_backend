import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const getAllComment = await Comment.aggregate([
            {
                $match: {
                    video: new mongoose.Types.ObjectId(videoId),
                },
            },
            {
                $lookup: {},
            },
        ]);
    } catch (error) {}
});

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

    const { videoId } = req.params;
    const { content } = req.body;

    if (!content) {
        throw new ApiErrors(404, "Comment cannot be empty");
    }

    const videoData = await Video.findById(videoId);

    const commentData = await Comment.create({
        content,
        video: videoData?._id,
        owner: req?.user?._id,
    });

    if (!commentData) {
        throw new ApiErrors(404, "Comment cannot be added");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { content } = req.body;
    const {commentId} = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiErrors(404, "Incorret Comment ID");
    }
    if (!content) {
        throw new ApiErrors(404, "Comment cannot be empty string");
    }
    const updateComment = await Comment.findByIdAndUpdate(
        {
            _id: commentId,
        },
        {
            $set: {
                content: content,
            },
        },
        {
            new: true,
        }
    );
    if (!updateComment) {
        throw new ApiErrors(404, "Comment cannot be added");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Comment Updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params;

    if(!isValidObjectId(commentId)){
        throw new ApiErrors(404, "Incorrect comment ID");
    }

    const deleteComment = await Comment.findOneAndDelete(commentId)

    if(!deleteComment){
        throw new ApiErrors(404, "Comment not deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Comment Deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
