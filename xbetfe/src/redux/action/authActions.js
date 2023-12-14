import {
    CHECK_SESSION,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    REGISTER_START,
    REGISTER_SUCCESS,
    UPDATE_AUTH_PICTURE
} from "../../constants/actionType";

export const loginStart = (email, password) => ({
    type: LOGIN_START,
    payload: {
        email,
        password
    }
});

export const loginSuccess = (auth) => ({
    type: LOGIN_SUCCESS,
    payload: auth
});

export const logoutStart = (callback) => ({
    type: LOGOUT_START,
    payload: { callback }
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const registerStart = ({ email, password, username }) => ({
    type: REGISTER_START,
    payload: {
        email,
        password,
        username
    }
});

export const registerSuccess = (userAuth) => ({
    type: REGISTER_SUCCESS,
    payload: userAuth
});


export const checkSession = () => ({
    type: CHECK_SESSION
});

export const updateAuthPicture = (image) => ({
    type: UPDATE_AUTH_PICTURE,
    payload: image
});
