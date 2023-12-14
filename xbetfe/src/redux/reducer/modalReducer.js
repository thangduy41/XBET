import { EModalType } from "../../components/main/PostItem";
import { HIDE_MODAL, SHOW_MODAL } from "../../constants/actionType";

const initState = {
    isOpenDeleteComment: false,
    isOpenDeletePost: false,
    isOpenEditPost: false,
    isOpenPostLikes: false
}

const modalMapType = {
    [EModalType.DELETE_COMMENT]: 'isOpenDeleteComment',
    [EModalType.DELETE_POST]: 'isOpenDeletePost',
    [EModalType.EDIT_POST]: 'isOpenEditPost',
    [EModalType.POST_LIKES]: 'isOpenPostLikes',
}

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                [modalMapType[action.payload]]: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                [modalMapType[action.payload]]: false
            }
        default:
            return state;
    }
}

export default modalReducer;