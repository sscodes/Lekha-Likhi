import { userConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const signup = (user) => {

    return async (dispatch) => {

        dispatch({
            type: userConstants.USER_REGISTER_REQUEST
        });
        const res = await axiosInstance.post(`/signup`, {
            ...user
        });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else {
            if (res.status === 404) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}
