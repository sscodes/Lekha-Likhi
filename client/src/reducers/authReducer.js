import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        name: '',
        email: '',
        contactNumber: ''
    },
    authenticate: false,
    authenticating: false,
    error: null,
    message: ''
};

export default (state = initState, action) => {

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...initState
            }
            break;
    }
    return state;
}