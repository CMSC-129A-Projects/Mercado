import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_LOADING,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL
} from '../actions/types';

const initialState = {
    error: null,
    isLoading: false,
    products: null,
    product: null,
    cart: null,
    checkout: null
};

export default function product(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PRODUCTS_LOADED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: payload
            }
        case PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: payload
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: payload
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: payload.data
            }
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                checkout: payload
            }
        case PRODUCT_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case PRODUCT_CREATE_FAIL:
        case PRODUCTS_LOADED_FAIL:
        case PRODUCT_LOADED_FAIL:
        case ADD_TO_CART_FAIL:
        case CHECKOUT_FAIL:
        case PRODUCT_REVIEW_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state;
    }
}