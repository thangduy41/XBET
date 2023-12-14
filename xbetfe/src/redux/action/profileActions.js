import { GET_USER_START, GET_USER_SUCCESS, UPDATE_COVER_PHOTO, UPDATE_PROFILE_INFO, UPDATE_PROFILE_PICTURE, } from "../../constants/actionType";

export const getUserStart = (username) => ({
    type: GET_USER_START,
    payload: username
});

export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: user
});

export const updateProfileInfo = (user) => ({
    type: UPDATE_PROFILE_INFO,
    payload: user
});

export const updateProfilePicture = (image) => ({
    type: UPDATE_PROFILE_PICTURE,
    payload: image
});

export const updateCoverPhoto = (image) => ({
    type: UPDATE_COVER_PHOTO,
    payload: image
});
