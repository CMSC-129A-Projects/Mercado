import axios from 'axios';

import {
    PRODUCT_LOADING,
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL
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

export const addToCart = (cart, product, quantity) => async dispatch => {
    dispatch({ type: PRODUCT_LOADING })
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const body = JSON.stringify({
        'cart': cart.id,
        'cart_pk': cart.id,
        'product': product.id,
        'product_pk': product.id,
        'quantity': quantity
    })

    try {
        const res = await axios.post(`/store/cart-items/`, body, config)

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error
        })
    }
}

export const checkout = (user, items) => {
    return async (dispatch) => {
        dispatch({ type: PRODUCT_LOADING })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        let requests = items.map(async (value, key) => {
            const body = JSON.stringify({
                'user_pk': user.id,
                'user': user.id,
                'product_pk': value.product_pk,
                'product': value.product_pk,
                'quantity': value.quantity,
                'total': '',
                'status': 'pending'
            })

            let [order_res, cart_item_res] = await axios.all([
                axios.post(`/store/orders/`, body, config),
                axios.delete(`/store/cart-items/${value.id}`, config)
            ]) 
            return {key, data: order_res, cart_item_res}
        })

        let responses = await Promise.all(requests)

        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: responses
        })
    }
}

export const createProductReview = (user, product, review) => async dispatch => {
    dispatch({ type: PRODUCT_LOADING })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const body = JSON.stringify({
            'user_pk': user.id,
            'user': user.id,
            'profile_pk': user.profile.id,
            'profile': user.profile.id,
            'product_pk': product.id,
            'product': product.id,
            'rating': review.rating,
            'body': review.body,
            'slug': 'slug'
        })

        const res = await axios.post(`/store/product-reviews/`, body, config)

        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error
        })
    }
}
