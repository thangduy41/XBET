import {
    CLEAR_CHAT,
    CLOSE_CHAT,
    GET_MESSAGES_SUCCESS,
    INITIATE_CHAT,
    MINIMIZE_CHAT,
    NEW_MESSAGE_ARRIVED
} from "../../constants/actionType";

export const initiateChat = (user) => ({
    type: INITIATE_CHAT,
    payload: user
});

export const minimizeChat = (target) => ({
    type: MINIMIZE_CHAT,
    payload: target
});

export const closeChat = (target) => ({
    type: CLOSE_CHAT,
    payload: target
});

export const getMessagesSuccess = (target, messages) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: {
        username: target,
        messages
    }
});

export const newMessageArrived = (target, message) => ({
    type: NEW_MESSAGE_ARRIVED,
    payload: {
        username: target,
        message
    }
});

export const clearChat = () => ({
    type: CLEAR_CHAT
});
