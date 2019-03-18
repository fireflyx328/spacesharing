import React from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';

import { Container, Content, Header, Form, Input, Item, Button, Footer, FooterTab, Label } from 'native-base'

export default class Login extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
    }

    authenticateUser(email, password) {
        const data = {
            email, password
        };

        this.props.login(data).then((response) => {
            this.clearInputFields();
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

                        <TouchableOpacity style={{paddingTop: 10, paddingBottom: 10}} onPress={() => this.props.navigation.push('ForgotPassword')}>
                            <Text style={{textAlign:'right'}}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <Button style={{ marginTop: 10 }}
                            full
                            rounded
                            success
                            onPress={() => this.authenticateUser(this.state.email, this.state.password)}
                        >
                            <Text style={{ color: 'white' }}> Login</Text>
                        </Button>
                    </Form>
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: "100%"}}>
                        <Text style={{textAlign: 'right'}} onPress={() => this.props.navigation.push('Register')}>
                            Register
                        </Text>
                    </View>
                </View>
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