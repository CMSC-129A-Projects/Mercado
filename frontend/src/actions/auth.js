import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
    USER_LOADING,
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
} from './types';
import { setAlert } from './alert';

/**
 * Verify access token
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
                    type: AUTHENTICATED_SUCCESS,
                    payload: res
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
                
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res
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

    dispatch(checkAuthenticated())
    dispatch(loadUser())
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
                payload: res
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
 * @param {string} phoneNumber User phone number
 * @param {string} password User password
 * @returns 
 */
export const login = (phoneNumber, password) => async dispatch => {
    dispatch({ type: USER_LOADING })

    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        "phone_number": phoneNumber, 
        "password": password
    });

    try {
        const res = await axios.post(`/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        });

        dispatch(setAlert('Login successful', 'success'));
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err
        });
        
        dispatch(setAlert('Login failed', 'danger'));
    }
};

/**
 * Create new User 
 * 
 * @param {string} phoneNumber User phonenumber
 * @param {string} firstName User first name
 * @param {string} lastName User last name
 * @param {string} username User username
 * @param {string} email User email
 * @param {string} userType User type
 * @param {string} password User password
 * @param {string} rePassword Password retype
 * @returns 
 */
export const createUser = (data) => async dispatch => {
    dispatch({ type: USER_LOADING })

    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ 
        'phone_number': data.phoneNumber,
        'first_name': data.firstName,
        'last_name': data.lastName,
        'username': data.username,
        'email': data.email,
        'user_type': data.userType,
        'password': data.password,
        're_password': data.rePassword
    });

    try {
        const res = await axios.post(`/auth/users/`, body, config);

        console.log(res);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res
        });

        dispatch(setAlert('Sign up successful', 'success'));
        dispatch(login(data.phoneNumber, data.password));
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err
        });

        for (const field in err.response.data)
            dispatch(setAlert(err.response.data[field], 'danger'));
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
export const resetPassword = (email) => async dispatch => {
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
export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async dispatch => {
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
    dispatch({type: USER_LOADING});

    dispatch({
        type: LOGOUT
    });
};

export const patchProfile = (data) => async dispatch => {
    dispatch({type: USER_LOADING});

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify(data);


        try {
            const res = await axios.put(`/accounts/profile/${data.slug}/`, body, config);


            dispatch({
                type: PROFILE_PATCH_SUCCESS,
                payload: res
            });
        } catch (err) {
            dispatch({type: PROFILE_PATCH_FAIL});
        }
    } else {
        dispatch({type: PROFILE_PATCH_FAIL});
    }

    dispatch(loadUser());
};

export const patchUserAddress = (data) => async dispatch => {
    dispatch({type: USER_LOADING});

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        
        const body = JSON.stringify({
            'brgy': data.barangay,
            'city': data.city,
            'province': data.province,
            'region': data.region
        });


        try {
            const res = await axios.patch(`/accounts/location/${data.slug}/`, body, config);

            dispatch({
                type: ADDRESS_PATCH_SUCCESS,
                payload: res
            });
        } catch (err) {
            dispatch({type: ADDRESS_PATCH_FAIL});
        }
    } else {
        dispatch({type: ADDRESS_PATCH_FAIL});
    }

    dispatch(loadUser());
};