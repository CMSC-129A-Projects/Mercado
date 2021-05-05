import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
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
    REFRESH_FAIL
} from './types';
import { setAlert } from './alert';

/**
 * Verify access token
 * 
 * @returns 
 */
export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`/auth/jwt/verify/`, body, config);

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

/**
 * Request new access token if token is expired
 * 
 * @returns 
 */
export const refreshToken = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const token_decoded = jwt_decode(localStorage.getItem('access'));
        
        if (Date.now() >= (token_decoded.exp * 1000)) {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            const body = JSON.stringify({ refresh: localStorage.getItem('refresh') });
        
            try {
                const res = await axios.post(`/auth/jwt/refresh/`, body, config);
                
                console.log(res.data.access);

                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } catch (err) {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        } else {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }

    dispatch(checkAuthenticated());
    dispatch(loadUser());
};

/**
 * Get user object from database
 * 
 * @returns 
 */
export const loadUser = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

/**
 * Create jwt to login user
 * 
 * @param {string} email User email
 * @param {string} password User password
 * @returns 
 */
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
        dispatch(setAlert('Login successful', 'success'));
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });

        dispatch(setAlert('Login failed', 'error'));
    }
};

/**
 * Create new User 
 * 
 * @param {string} email User email
 * @param {string} phone_number User phonenumber
 * @param {string} first_name User first name
 * @param {string} last_name User last name
 * @param {string} password User password
 * @param {string} re_password Password retype
 * @returns 
 */
export const signup = (email, phone_number, first_name, last_name, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ email, phone_number, first_name, last_name, password, re_password });

    try {
        const res = await axios.post(`/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Sign up successful', 'success'));
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });

        dispatch(setAlert('Sign up failed', 'error'));
    }
};

/**
 * Email verification via djoser
 * 
 * @param {string} uid Uid
 * @param {string} token JWT
 * @returns 
 */
export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

/**
 * Send password reset through email by djoser 
 * 
 * @param {string} email User email
 * @returns 
 */
export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

/**
 * Verify password reset by djoser
 * 
 * @param {string} uid Uid
 * @param {string} token JWT
 * @param {string} new_password New user password
 * @param {string} re_new_password Password re-type
 * @returns 
 */
export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

/**
 * Destroy tokens and logout user
 * 
 * @returns 
 */
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });

    dispatch(setAlert('Logout successful', 'success'));
};