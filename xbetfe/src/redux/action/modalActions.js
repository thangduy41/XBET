import { HIDE_MODAL, SHOW_MODAL } from "../../constants/actionType";

export const showModal = (modalType) => ({
    type: SHOW_MODAL,
    payload: modalType
});

export const hideModal = (modalType) => ({
    type: HIDE_MODAL,
    payload: modalType
});
