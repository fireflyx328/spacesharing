import React from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';

import { Container, Content, Header, Form, Input, Item, Button, Footer, FooterTab, Label } from 'native-base'

export default class Orders extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // alert(JSON.stringify(this.props));
    }

    componentWillMount() {
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.page_title}>My Orders</Text>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        padding: 10
    },
    page_title: {
        margin: 24,
        fontSize: 20,
        textAlign: 'center',
    }
});