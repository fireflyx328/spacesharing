import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import Main from '../../screens/Main';

import CustomHeader from '../../../../components/CustomHeader';

class MainContainer extends React.Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {        
        return {
            title: 'Home',
            drawerLabel: 'Strengthen treasure hunt',
            header: <CustomHeader navigation={navigation}/>
        }
    };
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// alert(JSON.stringify(actions));
	}

	render() {
		return <Main />
	}
}

const mapStateToProps = state => {
	return {...state};
}

const mapDisptachToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDisptachToProps)(MainContainer);