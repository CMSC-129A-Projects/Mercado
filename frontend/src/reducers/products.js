import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL,
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_LOADING,
    ADD_TO_BAG_SUCCESS,
    ADD_TO_BAG_FAIL
} from '../actions/types';

const initialState = {
    error: null,
    isLoading: false,
    products: null,
    product: null,
    bag: null
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
        case ADD_TO_BAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bag: payload.data
            }
        case PRODUCT_CREATE_FAIL:
        case PRODUCTS_LOADED_FAIL:
        case PRODUCT_LOADED_FAIL:
        case ADD_TO_BAG_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state;
    }
}