import {auth, database, provider} from '../../config/firebase';

import * as t from './actionTypes';

//Register the user using email and password
export const loadHelpContacts = () => (dispatch) => {
	return new Promise((resolve, reject) => {
        const refContacts = database.ref().child('help').child('contacts');

        refContacts.on("value", (snapshot) => {
            const contacts = snapshot.val();
            resolve(contacts);
        });
    })
}