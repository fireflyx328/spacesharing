import React, { Component } from "react";
import {Image} from "react-native";
class LogoTitle extends React.Component {
	render() {
		return (
			<Image
				source={require('../../assets/logo.png')}
				style={{ width: 140, height: 30 }}
			/>
		);
	}
}

export default LogoTitle;