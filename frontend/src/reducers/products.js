import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL
} from '../actions/types';

const initialState = {
    products: null,
    product: null
};

export default function product(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case PRODUCTS_LOADED_SUCCESS:
            return {
                ...state,
                products: payload
            }
        case PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                product: payload
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                product: payload
            }
        case PRODUCT_CREATE_FAIL:
        case PRODUCTS_LOADED_FAIL:
        case PRODUCT_LOADED_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}