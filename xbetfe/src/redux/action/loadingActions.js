import {
    SET_AUTH_LOADING,
    SET_CREATE_POST_LOADING,
    SET_GET_FEED_LOADING,
    SET_GET_USER_LOADING
} from "../../constants/actionType";

export const isAuthenticating = (bool = true) => ({
    type: SET_AUTH_LOADING,
    payload: bool
});

export const isCreatingPost = (bool = true) => ({
    type: SET_CREATE_POST_LOADING,
    payload: bool
});

export const isGettingUser = (bool = true) => ({
    type: SET_GET_USER_LOADING,
    payload: bool
});

export const isGettingFeed = (bool = true) => ({
    type: SET_GET_FEED_LOADING,
    payload: bool
});

export const TLoadingActionType = [
    isCreatingPost,
    isGettingUser,
    isGettingFeed,
    isAuthenticating
];
