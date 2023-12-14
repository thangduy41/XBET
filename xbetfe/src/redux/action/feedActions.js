import {
    CLEAR_FEED,
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    DELETE_FEED_POST,
    GET_FEED_START,
    GET_FEED_SUCCESS,
    HAS_NEW_FEED,
    UPDATE_FEED_POST,
    UPDATE_POST_LIKES
} from "../../constants/actionType";


export const getNewsFeedStart = (options) => ({
    type: GET_FEED_START,
    payload: options
});

export const getNewsFeedSuccess = (posts) => ({
    type: GET_FEED_SUCCESS,
    payload: posts
});

export const createPostStart = (post) => ({
    type: CREATE_POST_START,
    payload: post
});

export const createPostSuccess = (post) => ({
    type: CREATE_POST_SUCCESS,
    payload: post
});

export const updateFeedPost = (post) => ({
    type: UPDATE_FEED_POST,
    payload: post
});

export const updatePostLikes = (postID, state, likesCount) => ({
    type: UPDATE_POST_LIKES,
    payload: { postID, state, likesCount }
});

export const deleteFeedPost = (postID) => ({
    type: DELETE_FEED_POST,
    payload: postID
});

export const clearNewsFeed = () => ({
    type: CLEAR_FEED
});

export const hasNewFeed = (bool = true) => ({
    type: HAS_NEW_FEED,
    payload: bool
});

export const TNewsFeedActionType = [
    getNewsFeedStart,
    getNewsFeedSuccess,
    createPostStart,
    createPostSuccess,
    updateFeedPost,
    deleteFeedPost,
    hasNewFeed,
    updatePostLikes,
    clearNewsFeed
];
