import { authConstants, userConstants } from "../actions/constants";

const inistate = {
    error: null,
    token: null,
    user: {
        name: '',
        email: '',
        role: '',
        contactNumber: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false
}

export default (state = inistate, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
                authenticating: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                authenticate: true,
                authenticating: false
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...inistate,
                loading: false,
                error: action.payload.error
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...inistate
            }
            break;
    }

    return state;
}