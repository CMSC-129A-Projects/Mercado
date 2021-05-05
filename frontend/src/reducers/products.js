import {
    PRODUCTS_LOADED_SUCCESS,
    PRODUCTS_LOADED_FAIL
} from '../actions/types';

const initialState = {
    products: null
};

export default function product(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case PRODUCTS_LOADED_SUCCESS:
            return {
                ...state,
                products: payload
            }
        case PRODUCTS_LOADED_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}