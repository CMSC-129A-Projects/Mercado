import axios from 'axios';

import {
    PRODUCT_LOADING,
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL
} from './types';

export const loadProducts = (params) => async dispatch => {
    dispatch({ type: PRODUCT_LOADING })

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const res = await axios.get(`/store/products/${params}`, config)

        dispatch({
            type: PRODUCTS_LOADED_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: PRODUCTS_LOADED_FAIL })
    }
}

export const getProduct = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const res = await axios.get(`/store/products/${slug}/`, config);

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

export const createProduct = (product) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
        disc_price: product.discPrice,
        stock: product.stock,
        image: product.image,
        slug: '',
        locality: ''
    });

    console.log(body);

    try {
        const res = await axios.post(`/store/products/`, body, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: res
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL
        });
    }
};

export const addToBag = (product) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const body = JSON.stringify()

    try {
        const res = await axios.post('store/bag', body, config)
    } catch (error) {
        
    }
}