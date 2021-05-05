import axios from 'axios';

import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL
} from './types';

export const loadProducts = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'            
        }
    };

    try {
        const res = await axios.get(`/store/products/`, config);

        dispatch({
            type: PRODUCTS_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_LOADED_FAIL
        });
    }
};