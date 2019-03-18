import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import ForgotPassword from '../../screens/ForgotPassword'; 

import CustomHeader from '../../../../components/CustomHeader';

import {auth, database, provider} from '../../../../config/firebase';

class ForgotPasswordContainer extends React.Component {	
	constructor(props) {
		super(props)
	}

	componentDidMount() {
	}

	render() {
		return <ForgotPassword {...this.props} />
	}
}

const mapStateToProps = state => {
	return {...state};
}

const mapDisptachToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDisptachToProps)(ForgotPasswordContainer);