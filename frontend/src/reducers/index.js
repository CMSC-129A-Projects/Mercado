import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import products from './products';

export default combineReducers({
    alert,
    auth,
    products
});