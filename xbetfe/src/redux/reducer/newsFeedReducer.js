import { CLEAR_FEED, CREATE_POST_SUCCESS, DELETE_FEED_POST, GET_FEED_SUCCESS, HAS_NEW_FEED, UPDATE_FEED_POST, UPDATE_POST_LIKES } from "../../constants/actionType";


const initState = {
    items: [],
    offset: 0,
    hasNewFeed: false
};

const newsFeedReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_FEED_SUCCESS:
            return {
                ...state,
                items: [...state.items, ...action.payload],
                offset: state.offset + 1
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case CLEAR_FEED:
            return initState;
        case UPDATE_FEED_POST:
            return {
                ...state,
                items: state.items.map((post) => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            ...action.payload
                        };
                    }
                    return post;
                })
            }
        case UPDATE_POST_LIKES:
            return {
                ...state,
                items: state.items.map((post) => {
                    if (post.id === action.payload.postID) {
                        return {
                            ...post,
                            isLiked: action.payload.state,
                            likesCount: action.payload.likesCount
                        };
                    }
                    return post;
                })
            }
        case DELETE_FEED_POST:
            return {
                ...state,
                // eslint-disable-next-line array-callback-return
                items: state.items.filter((post) => {
                    if (post.id !== action.payload) {
                        return post;
                    }
                })
            }
        case HAS_NEW_FEED:
            return {
                ...state,
                hasNewFeed: action.payload
            }
        default:
            return state;
    }
};

export default newsFeedReducer;
