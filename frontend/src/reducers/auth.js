import {
    LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    PROFILE_PATCH_SUCCESS,
    PROFILE_PATCH_FAIL,
    ADDRESS_PATCH_SUCCESS,
    ADDRESS_PATCH_FAIL
} from '../actions/types';

const initialState = {
    status: null,
    error: null,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isLoading: false,
    isAuthenticated: null,
    user: null
};

export default function auth(state=initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                status: payload.status,
                isLoading: false,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.data.access);
            localStorage.setItem('refresh', payload.data.refresh);
            return {
                ...state,
                status: payload.status,
                isLoading: false,
                isAuthenticated: true,
                access: payload.data.access,
                refresh: payload.data.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                status: payload.status,
                isLoading: false,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                status: payload.status,
                isLoading: false,
                user: payload.data
            }
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.data.access);
            return {
                ...state,
                status: payload.status,
                isLoading: false,
                isAuthenticated: true,
                access: payload.data.access
            }
        case PROFILE_PATCH_SUCCESS:
        case ADDRESS_PATCH_SUCCESS:
            return {
                ...state,
                status: payload.status,
                isLoading: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                isLoading: false,
                user: null
            }
        case PROFILE_PATCH_FAIL:
        case ADDRESS_PATCH_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                error: payload.response.data,
                isLoading: false,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case REFRESH_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
};