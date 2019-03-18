import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import Help from '../../screens/Help'; 

import CustomHeader from '../../../../components/CustomHeader';

class HelpContainer extends React.Component {
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
		this.props.loadHelpContacts().then(response => {
			console.log(response);
		})
	}

	render() {
		return <Help {...this.props} />
	}
}

const mapStateToProps = state => {
	return {...state};
}

const mapDisptachToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDisptachToProps)(HelpContainer);