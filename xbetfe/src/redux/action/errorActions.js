import {
    CLEAR_AUTH_ERR_MSG,
    SET_AUTH_ERR_MSG,
    SET_NEWSFEED_ERR_MSG,
    SET_PROFILE_ERR_MSG
} from "../../constants/actionType";

export const setAuthErrorMessage = (error) => ({
    type: SET_AUTH_ERR_MSG,
    payload: error
});

export const setProfileErrorMessage = (error) => ({
    type: SET_PROFILE_ERR_MSG,
    payload: error
});

export const setNewsFeedErrorMessage = (error) => ({
    type: SET_NEWSFEED_ERR_MSG,
    payload: error
});

export const clearAuthErrorMessage = () => ({
    type: CLEAR_AUTH_ERR_MSG
});

export const ErrorActionType = [
    setAuthErrorMessage,
    setProfileErrorMessage,
    setNewsFeedErrorMessage,
    clearAuthErrorMessage
];
