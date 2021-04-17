import { authConstants, blogConstants } from "../actions/constants";

const inistate = {
    error: null,
    blogs: [],
    posting: false,
    posted: false
}

const addNewBlog = (blogs, blog) => {
    return [
        ...blogs,
        blog
    ]
}

export default (state = inistate, action) => {

    switch (action.type) {
        case blogConstants.BLOG_READ_REQUEST:
            state = {
                ...state
            }
            break;
        case blogConstants.BLOG_READ_SUCCESS:
            state = {
                ...state,
                blogs: action.payload.blogs
            }
            break;
        case blogConstants.BLOG_CREATE_REQUEST:
            state = {
                ...state,
                posting: true
            }
            break;
        case blogConstants.BLOG_CREATE_SUCCESS:
            const blog = action.payload.blog;
            const createdBlogs = addNewBlog(state.blogs, blog);
            state = {
                ...state,
                blogs: createdBlogs,
                posting: false,
                posted: true,
            }
            break;
        case blogConstants.BLOG_CREATE_FAILURE:
            state = {
                ...inistate,
                error: action.payload.error
            }
            break;
        case blogConstants.BLOG_READ_FAILURE:
            state = {
                ...inistate,
                error: action.payload.error
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...inistate
            }
            break;
        case blogConstants.BLOG_DELETE_REQUEST:
            state = {
                ...state
            }
            break;
        case blogConstants.BLOG_DELETE_SUCCESS:
            state = {
                ...state
            }
            break;
        case blogConstants.BLOG_DELETE_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        case blogConstants.BLOG_UPDATE_REQUEST:
            state = {
                ...state
            }
            break;
        case blogConstants.BLOG_UPDATE_SUCCESS:
            state = {
                ...state
            }
            break;
        case blogConstants.BLOG_UPDATE_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
    }
    return state;
}