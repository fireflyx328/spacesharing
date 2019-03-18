import * as t from './actionTypes';

let initialState = { isConnected: false, data: [] };

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.FIRST_ACTION:
            state = Object.assign({}, state, {data: action.data });
            return state;

        default:
            return state;
    }
};


export default homeReducer;