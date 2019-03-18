import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import Profile from '../../screens/Profile'; 

import CustomHeader from '../../../../components/CustomHeader';

import {auth, database, provider} from '../../../../config/firebase';

class ProfileContainer extends React.Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {        
        return {
            title: 'My account',
            header: <CustomHeader navigation={navigation}/>
        }
    };
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
	}

	render() {
		return <Profile {...this.props} />
	}
}

const mapStateToProps = state => {
	return {...state};
}

const mapDisptachToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDisptachToProps)(ProfileContainer);