import { userConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const signup = (userProp) => {

    return async (dispatch) => {

        try {            
            dispatch({
                type: userConstants.USER_REGISTER_REQUEST
            });
            const res = await axiosInstance.post(`/signup`, {
                ...userProp
            });
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
        catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    }
}
