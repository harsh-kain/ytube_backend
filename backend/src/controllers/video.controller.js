import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.models.js"
import {User} from "../models/user.models.js"
import {ApiErrors} from "../utils/ApiErrors.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import cloudinary from "cloudinary"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getPublicIdFromUrl = (url) => {
    console.log(url);
    
    const parts = url.split('/');
    console.log("parts", parts);
    const publicIdWithExtension = parts[parts.length - 1];
    console.log("public id with extension", publicIdWithExtension);
    const publicId = publicIdWithExtension.split('.')[0];
    console.log("public id ", publicId);
    return publicId;
};


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', userId } = req.query;
    
    const skip = (page - 1) * limit;

    const filters = {};
    if (query) {
        filters.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }
    if (userId) {
        filters.owner = userId;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortType === 'desc' ? -1 : 1;

    const videos = await Video.find(filters)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

    const totalVideos = await Video.countDocuments(filters);

    return res.status(200).json(new ApiResponse(200, { totalVideos, videos }, "Videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    if(!title && !description){
        throw new ApiErrors(404,"Enter video title and description")
    }
    console.log(req.files.videoFile);
    
    let thumbnailLocalPath;
    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files.thumbnail[0].path
    }
    if(!thumbnailLocalPath){
        throw new ApiErrors(400, "Thumbnail is required")
    }
    
    let videoFileLocalPath;
    if(req.files && Array.isArray(req.files.videoFile) && req.files.videoFile.length > 0){
        videoFileLocalPath = req.files.videoFile[0].path
    }
    if(!videoFileLocalPath){
        throw new ApiErrors(400, "Please upload the video")
    }
    
    // upload on cloudinary 
    const [videoUrl, thumbnailUrl] = await Promise.all([
        uploadOnCloudinary(videoFileLocalPath),
        uploadOnCloudinary(thumbnailLocalPath)
    ]);

    if(!videoUrl){
        throw new ApiErrors(400, "video not uploaded")
    }
    
    if(!thumbnailUrl){
        throw new ApiErrors(400, "Thumbnail not uploaded")
    }
    console.log(videoUrl);
    console.log(thumbnailUrl);

    const videoData = await Video.create({
        title,
        description,
        videoFile : videoUrl?.url,
        thumbnail : thumbnailUrl?.url,
        duration : videoUrl?.duration,
        owner : req?.user?._id
    })
    
    if(!videoData){
        throw new ApiErrors(500, "Something went wrong while registering the user")
    }

    return res.status(200)
    .json(new ApiResponse(200, videoData, "Video uploaded successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const videoData = await Video.findById(videoId)

    if(!videoData){
        throw new ApiErrors(404, "No Video found")
    }

    return res.status(200)
    .json(new ApiResponse(200, videoData, "Video Details fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;
    
    // Validate title and description
    if (!title || !description) {
        throw new ApiErrors(400, "Enter video title and description");
    }

    // Find the existing video record
    const videoData = await Video.findById(videoId);
    if (!videoData) {
        throw new ApiErrors(404, "Video data not found");
    }
    
    let newThumbnailUrl;
    
    if (req.file) {
        const newThumbnailPath = req.file.path;
        console.log(newThumbnailPath);
        
        // Delete the old thumbnail from Cloudinary
        if (videoData.thumbnail) {
            const publicId = getPublicIdFromUrl(videoData.thumbnail); 
            await cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error("Failed to delete old thumbnail:", error);
                } else {
                    console.log("Old thumbnail deleted:", result);
                }
            });
        }

        // Upload the new thumbnail to Cloudinary
        const thumbnailUploadData = await uploadOnCloudinary(newThumbnailPath);

        if (!thumbnailUploadData) {
            throw new ApiErrors(400, "Thumbnail not uploaded");
        }

        newThumbnailUrl = thumbnailUploadData.url;
    }

    videoData.title = title;
    videoData.description = description;
    if (newThumbnailUrl) {
        videoData.thumbnail = newThumbnailUrl;
    }

    await videoData.save();

    return res.status(200).json(new ApiResponse(200, videoData, "Video data updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const deleteVideoData = await Video.findByIdAndDelete(videoId);

    if(!deleteVideoData){
        throw new ApiErrors(404,"Video not deleted")
    }
    return res.status(200)
    .json(new ApiResponse(200, "Video Deleted Successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const videoData = await Video.findById(videoId);

    if (!videoData) {
        throw new ApiErrors(404, "Video not found");
    }

    videoData.isPublished = !videoData.isPublished;

    await videoData.save();

    return res.status(200).json(new ApiResponse(200, videoData, "Video publish status toggled successfully"));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
