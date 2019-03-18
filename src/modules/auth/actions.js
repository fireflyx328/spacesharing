import {auth, database, provider} from '../../config/firebase';

import * as t from './actionTypes';

import {AsyncStorage} from 'react-native';

// Get current user
export const getCurrentUser = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		const user = auth.currentUser;
		if (user) {
			const data = {
				name: user.displayName,
	  			email: user.email,
	  			uid: user.uid
			}
			resolve(data);
		} else {
			reject()
		}
	})
}

// Update current user
export const updateUser = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		var user = auth.currentUser;

		// Update user name
		user.updateProfile({
			displayName: data.name
		}).then(() => {
			// Update user email
			user.updateEmail(data.email).then(() => {
			  	// Update user password
				user.updatePassword(data.password).then(() => {
					resolve()
				}).catch(error => {
					reject(error)
				});
			}).catch(error => {
			  reject(error)
			});
		}).catch(error => {
			reject(error)
		});
	});
}

//Register the user using email and password
export const register = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
        const {email, password, username} = data;
        auth.createUserWithEmailAndPassword(email, password)
            .then((resp) => {
                let user = {username, uid: resp.user.uid}
                const userRef = database.ref().child('users');

                userRef.child(user.uid).update({...user})
                    .then(() => {
                        dispatch({type: t.LOGIN_SUCCESS, user});
                        resolve(user)
                    })
                    .catch((error) => reject({message: error}));
            })
            .catch((error) => reject(error));
    })
}

//Create the user object in realtime database
export const createUser = (user) => (dispatch) => {
	return new Promise((resolve, reject) => {
        const userRef = database.ref().child('users');

        userRef.child(user.uid).update({...user})
            .then(() => {
                dispatch({type: t.LOGIN_SUCCESS, user});
                resolve(user)
            })
            .catch((error) => reject({message: error}));
    });
}

//Sign the user in with their email and password
export const login = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const {email, password} = data;
        auth.signInWithEmailAndPassword(email, password)
            .then((resp) => {
                //Get the user object from the realtime database
                let {user} = resp;
                database.ref('users').child(user.uid).once('value')
                    .then((snapshot) => {

                        const exists = (snapshot.val() !== null);

                        //if the user exist in the DB, replace the user variable with the returned snapshot
                        if (exists) user = snapshot.val();

                        if (exists) dispatch({type: t.LOGIN_SUCCESS, user});
                        resolve({exists, user});
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
}

//Send Password Reset Email
export const resetPassword = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const {email} = data;
        auth.sendPasswordResetEmail(email)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
}

//Sign user out
export function signOut() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            auth.signOut()
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    }
}

//Sign user in using Facebook
export function signInWithFacebook(fbToken,) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const credential = provider.credential(fbToken);
            auth.signInWithCredential(credential)
                .then((user) => {
                    //Get the user object from the realtime database
                    database.ref('users').child(user.uid).once('value')
                        .then((snapshot) => {

                            const exists = (snapshot.val() !== null);

                            //if the user exist in the DB, replace the user variable with the returned snapshot
                            if (exists) user = snapshot.val();

                            if (exists) dispatch({type: t.LOGIN_SUCCESS, user});
                            resolve({exists, user});
                        })
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
        });
    }
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);

            if (isLoggedIn) {
                //Get the user object from the realtime database
                database.ref('users').child(user.uid).once('value')
                    .then((snapshot) => {

                        const exists = (snapshot.val() !== null);

                        //if the user exist in the DB, replace the user variable with the returned snapshot
                        if (exists) user = snapshot.val();

                        if (exists) dispatch({type: t.LOGIN_SUCCESS, user});
                        callback(exists, isLoggedIn);
                    })
                    .catch((error) => {
                        //unable to get user
                        dispatch({type: t.LOGGED_OUT});
                        callback(false, false);
                    });
            } else {
                dispatch({type: t.LOGGED_OUT});
                callback(false, isLoggedIn)
            }
        });
    };
}