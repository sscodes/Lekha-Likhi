import { authConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const login = (user1) => {

    return async (dispatch) => {
        let res='';
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST });
            res = await axiosInstance.post('/signin', {
                ...user1
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
            // const { error } = res.data;
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