import { blogConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const createBlog = (blog) => {



    return async (dispatch) => {

        dispatch({
            type: blogConstants.BLOG_CREATE_REQUEST
        });
        const res = await axiosInstance.post(`/blogs`, {
            ...blog
        });

        if (res.status === 200) {
            const { blog } = res.data;
            dispatch({
                type: blogConstants.BLOG_CREATE_SUCCESS,
                payload: {
                    blog
                }
            });
        }
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: blogConstants.BLOG_CREATE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const readBlogs = (blog) => {

    return async (dispatch) => {

        dispatch({
            type: blogConstants.BLOG_READ_REQUEST
        });
        const res = await axiosInstance.get(`/blogs`);
        if (res.status === 200) {
            const { blogs } = res.data;
            localStorage.setItem('blogs', JSON.stringify(blogs));
            dispatch({
                type: blogConstants.BLOG_READ_SUCCESS,
                payload: {
                    blogs
                }
            });
        }
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: blogConstants.BLOG_READ_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const likeBlog = (id, userId) => {

    return async (dispatch) => {
        dispatch({ 
            type: blogConstants.BLOG_UPDATE_REQUEST
        });
        const res = await axiosInstance.put(`/blogs/${id}/like/${userId}`);
        if (res.status === 200) {
            dispatch({ 
                type: blogConstants.BLOG_UPDATE_SUCCESS
            });
            dispatch(readBlogs());
        } 
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: blogConstants.BLOG_UPDATE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const unlikeBlog = (id, userId) => {



    return async (dispatch) => {
        dispatch({ 
            type: blogConstants.BLOG_UPDATE_REQUEST
        });
        const res = await axiosInstance.put(`/blogs/${id}/unlike/${userId}`);
        if (res.status === 200) {
            dispatch({ 
                type: blogConstants.BLOG_UPDATE_SUCCESS
            });
            dispatch(readBlogs());
        } 
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: blogConstants.BLOG_UPDATE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const deleteBlogAction = (id) => {
    return async (dispatch) => {
        dispatch({
            type: blogConstants.BLOG_DELETE_REQUEST
        });
        const res = await axiosInstance.delete(`/blogs/${id}`, {
            payload: {
                id
            }
        });
        if (res.status === 200) {
            dispatch(readBlogs());
            dispatch({
                type: blogConstants.BLOG_DELETE_SUCCESS
            });
        } 
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: blogConstants.BLOG_DELETE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}
