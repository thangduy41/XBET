import {
    CLEAR_AUTH_ERR_MSG,
    SET_AUTH_ERR_MSG,
    SET_NEWSFEED_ERR_MSG,
    SET_PROFILE_ERR_MSG
} from "../../constants/actionType";

const initState = {
    authError: null,
    profileError: null,
    newsFeedError: null
}

const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_AUTH_ERR_MSG:
            return {
                ...state,
                authError: action.payload
            }
        case SET_PROFILE_ERR_MSG:
            return {
                ...state,
                profileError: action.payload
            }
        case SET_NEWSFEED_ERR_MSG:
            return {
                ...state,
                newsFeedError: action.payload
            }
        case CLEAR_AUTH_ERR_MSG:
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
};

export default errorReducer;
