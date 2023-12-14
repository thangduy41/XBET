import { SET_THEME } from "../../constants/actionType";

const initState = {
    theme: 'light',
    // ... more settings
}

const settingsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state;
    }
}

export default settingsReducer;
