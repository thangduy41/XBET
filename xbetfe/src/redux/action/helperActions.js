import { SET_TARGET_COMMENT, SET_TARGET_POST } from "../../constants/actionType";

export const setTargetComment = (comment) => ({
    type: SET_TARGET_COMMENT,
    payload: comment
});

export const setTargetPost = (post) => ({
    type: SET_TARGET_POST,
    payload: post
});

