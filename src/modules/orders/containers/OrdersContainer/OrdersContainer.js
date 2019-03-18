import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import Orders from '../../screens/Orders'; 

import CustomHeader from '../../../../components/CustomHeader';

class OrdersContainer extends React.Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {        
        return {
            title: 'My Orders',
            header: <CustomHeader navigation={navigation}/>
        }
    };
	constructor(props) {
		super(props)
	}

	componentDidMount() {
	}

	render() {
		return <Orders {...this.props} />
	}
}

const mapStateToProps = state => {
	return {...state};
}

const mapDisptachToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDisptachToProps)(OrdersContainer);