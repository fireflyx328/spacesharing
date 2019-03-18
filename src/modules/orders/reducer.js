import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {
    orders: []
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};

export default ordersReducer;