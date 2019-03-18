import React, { Component } from "react";
import {Image} from "react-native";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base';

import LogoTitle from '../LogoTitle';

class CustomHeader extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <Header style={{backgroundColor: "#ffffff"}}>
                <Left><Icon name="ios-menu" onPress={() => navigation.toggleDrawer()} /></Left>
                <Body><LogoTitle /></Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;