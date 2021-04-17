import authReducer from './authReducer';
import userReducer from './userReducer';
import blogReducer from './blogReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    blog: blogReducer
});

export default rootReducer;