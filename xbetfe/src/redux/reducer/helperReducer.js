import { SET_TARGET_COMMENT, SET_TARGET_POST } from "../../constants/actionType";

const initState = {
    targetComment: null,
    targetPost: null
}

const helperReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TARGET_COMMENT:
            return {
                ...state,
                targetComment: action.payload
            }
        case SET_TARGET_POST:
            return {
                ...state,
                targetPost: action.payload
            }
        default:
            return state;
    }
}

export default helperReducer;