import { authConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const login = (userProp) => {

    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST });
            const res = await axiosInstance.post('/signin', {
                ...userProp
            });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        catch (error) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } 
    }
}

export const signout = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        });
    }
}