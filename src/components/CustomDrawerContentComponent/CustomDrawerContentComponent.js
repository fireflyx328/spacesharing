import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import {auth, database, provider} from '../../config/firebase';

const isLoggedIn = async () => await AsyncStorage.getItem('user');

class CustomDrawerContentComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
	        isLoggedIn: false
	    };

	    this.logoutUser = this.logoutUser.bind(this);

	    this.checkerInterval = null;
	}	

	componentDidMount() {
		this.checkerInterval = setInterval(() => {
			this.checkAuthUser();
		}, 2000);
	} 

	componentWillUnmount() {
        clearInterval(this.checkerInterval);
    }

	checkAuthUser() {
		isLoggedIn().then(user => {
            this.setState({isLoggedIn: user !== null ? true : false});
        }).catch(e => {
            console.log('e', e);
        });
	}

	logoutUser() {
		const {navigation} = this.props;
		AsyncStorage.removeItem('user');
		this.setState({isLoggedIn: false});

		navigation.navigate('Login');
	}

	render() {
		const props = this.props;
		const {navigation} = props;
		const {isLoggedIn} = this.state;
		return (
			<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
				<TouchableOpacity style={{height: 40, paddingLeft: 15, paddingTop: 20}} 
					onPress={() => navigation.closeDrawer()}>
					<Image
						source={require('../../assets/close.png')}
						
					/>
				</TouchableOpacity >
				<ScrollView>
					<DrawerItems style={styles.drawerItems} {...props}
						getLabel = {(scene) => {
							const {key} = scene.route;
							return (
								key !== 'InitScreen' ?
									((isLoggedIn && key == 'Login') ? 
									<TouchableOpacity style={{...styles.itemStyle, ...styles.activeLabelStyle}} 
										onPress={this.logoutUser}>
										<Text style={{...styles.labelStyle, ...styles.activeLabelStyle}}>{`Logout`}</Text>
									</TouchableOpacity >
									: 
									(
										!isLoggedIn ? // Check if not logged in(Show login menu only)
											(key == 'Login') ?
												<View style={styles.itemStyle}>
													<Text style={{...styles.labelStyle}}>{props.getLabel(scene)}</Text>
												</View>
											: 
											null
										: 
										<View style={styles.itemStyle}>
											<Text style={{...styles.labelStyle}}>{props.getLabel(scene)}</Text>
										</View>
									)								
								) : null
							)							
						}}
					/>				
				</ScrollView>
			</SafeAreaView>
		)
	}
}

export default CustomDrawerContentComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	drawerItems: {
		marginTop: 20,
		width: 250
	},
	labelStyle: {
        color: '#ffffff',
        fontWeight: 'normal',
        width: 250
    },
    activeLabelStyle: {
        fontWeight: 'bold'
    },
    itemStyle: {               
        // borderBottomStyle: "solid",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff"
    }
});