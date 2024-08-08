import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const createPlaylist = asyncHandler(async (req, res) => {
    //TODO: create playlist
    const { name, description } = req.body;

    if (!name) {
        throw new ApiErrors(404, "Playlist cannot be empty");
    }

    const playlistData = await Playlist.create({
        name,
        description: description || "",
        video: [],
        owner: req.user._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, playlistData, "Playlist Created"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    //TODO: get user playlists
    const { userId } = req.params;

    const userPlaylists = await Playlist.find({ owner: userId });

    if (!userPlaylists || userPlaylists.length === 0) {
        throw new ApiErrors(404, "No Playlist found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userPlaylists,
                "Playlist data fetched successfully"
            )
        );
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    //TODO: get playlist by id

    // Assuming Playlist schema has an 'owner' field that references the user's ID
    const userPlaylists = await Playlist.findById(playlistId);

    if (!userPlaylists || userPlaylists.length === 0) {
        throw new ApiErrors(404, "No Playlist found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userPlaylists,
                "Playlist data fetched successfully"
            )
        );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    // TODO: remove video from playlist
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    // TODO: delete playlist

    const findAndDeletePlayList = await Playlist.findByIdAndDelete(playlistId);

    if (!findAndDeletePlayList) {
        throw new ApiErrors(404, "Playlist not deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Playlist Deleted Successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    //TODO: update playlist

    if (!name) {
        throw new ApiErrors(404, "Playlist Name is required");
    }
    const findAndUpdatePlayList = await Playlist.findByIdAndUpdate(
        { _id : playlistId },
        {
            $set: {
                name,
                description,
            },
        },
        { new: true }
    );

    if (!findAndUpdatePlayList) {
        throw new ApiErrors(404, "Playlist cannot be updated");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, findAndUpdatePlayList, "Playlist update successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
