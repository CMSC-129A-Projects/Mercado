import axios from 'axios';

import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL
} from './types';
import { setAlert } from './alert';

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

        dispatch(setAlert('Products loaded', 'success'));
    } catch (err) {
        dispatch({
            type: PRODUCTS_LOADED_FAIL
        });

        dispatch(setAlert('Products not loaded', 'error'));
    }
};

export const getProduct = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`/store/products/${id}/`, config);

        dispatch({
            type: PRODUCT_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_LOADED_FAIL
        });
    }
};

export const createProduct = (user_id, productName, desc, price, discPrice, inStock) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        created_by: user_id,
        name: productName,
        desc: desc,
        price: price,
        disc_price: discPrice,
        categories: [],
        in_stock: inStock
    });

    console.log(body);

    try {
        const res = await axios.post(`/store/products/`, body, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS
        });

        dispatch(setAlert('Product created successfully', 'success'));
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL
        });

        dispatch(setAlert('Product creation failed', 'error'));
    }
};