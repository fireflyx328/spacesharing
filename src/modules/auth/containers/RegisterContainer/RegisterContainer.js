import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import Register from '../../screens/Register'; 

import CustomHeader from '../../../../components/CustomHeader';

import {auth, database, provider} from '../../../../config/firebase';

class RegisterContainer extends React.Component {
	// static navigationOptions = ({ navigation, navigationOptions }) => {        
 //        return {
 //            title: 'Login',
 //            header: <CustomHeader navigation={navigation}/>
 //        }
 //    };
	constructor(props) {
		super(props)
	}

	componentDidMount() {
        // alert(typeof (this.props.register));
		// alert(JSON.stringify(actions));
		// const email = "j.dagohoy4@test.com";
		// const password = "test124";
		// const username = "jojie4";
		// auth.createUserWithEmailAndPassword(email, password)
  //       .then((resp) => {
  //           let user = {username, uid: resp.user.uid}
  //           const userRef = database.ref().child('users');

  //           userRef.child(user.uid).update({...user})
  //               .then(() => {
  //                   dispatch({type: t.LOGGED_IN, user});
  //                   // resolve(user)
  //               })
  //               .catch((error) => alert(JSON.stringify({message: error})));
  //       })
  //       .catch((error) => alert(JSON.stringify(error)));
	}

	render() {
		return <Register {...this.props} />
	}
}

const mapStateToProps = state => {
	return {...state};
}

const mapDisptachToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDisptachToProps)(RegisterContainer);