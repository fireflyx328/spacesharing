import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {
    contacts: null
};

const helpReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOAD_CONTACTS:
            const {contacts} = action.payload;
            AsyncStorage.setItem('help_contacts', JSON.stringify(contacts));

            state = Object.assign({}, state, {contacts: contacts });

            return state;

        default:
            return state;
    }
};

export default helpReducer;