import axios from 'axios';

import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL
} from './types';

export const loadProducts = (auth) => async dispatch => {
    if (auth.user) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${auth.access}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`/store/products/`, config);

            dispatch({
                type: PRODUCTS_LOADED_SUCCESS,
                payload: res
            });
        } catch (err) {
            dispatch({
                type: PRODUCTS_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: PRODUCTS_LOADED_FAIL
        });
    }
};