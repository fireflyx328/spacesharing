import React from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';
import { StackActions } from 'react-navigation';

import { Container, Content, Header, Form, Input, Item, Button, Footer, FooterTab, Label } from 'native-base'

export default class Register extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        // alert(typeof (this.props.register));
    }

    registerUser(email, password) {
        const data = {
            email, password, username: email
        };

        this.props.register(data).then((response) => {
            this.clearInputFields();
            this.props.navigation.dispatch(StackActions.popToTop());
            this.props.navigation.navigate('Home')
        }).catch(e => {
            alert(e.message);
        })
    }

    clearInputFields() {
        this.setState({email: '', password: ''});
    }

    componentWillMount() {
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: "100%"}}><Text h1 style={styles.page_header}>Registration</Text></View>
                </View>
                <ScrollView>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(email) => this.setState({ email })}
                            />

                        </Item>

                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </Item> 

                        <Button style={{ marginTop: 10 }}
                            full
                            rounded
                            success
                            onPress={() => this.registerUser(this.state.email, this.state.password)}
                        >
                            <Text style={{ color: 'white' }}> Register</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
    page_header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0073e5',
        padding: 10
    }
});