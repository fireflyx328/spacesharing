import React from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';

import { Container, Content, Header, Form, Input, Item, Button, Footer, FooterTab, Label } from 'native-base'

export default class ForgotPassword extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    componentDidMount() {
    }

    resetPassword(email) {
        const data = {
            email
        };

        this.props.resetPassword(data).then((response) => {
            alert('Instruction is sent to your email.');
            this.clearInputFields();
            this.props.navigation.goBack()
        }).catch(e => {
            alert(e.message);
        })
    }

    clearInputFields() {
        this.setState({email: ''});
    }

    componentWillMount() {
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: "100%"}}><Text h1 style={styles.page_header}>Forgot Password</Text></View>
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

                        <Button style={{ marginTop: 10 }}
                            full
                            rounded
                            success
                            onPress={() => this.resetPassword(this.state.email)}
                        >
                            <Text style={{ color: 'white' }}> Reset Password</Text>
                        </Button>
                    </Form>
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: "100%"}}>
                        <Text style={{textAlign: 'right'}} onPress={() => this.props.navigation.goBack()}>
                            Login
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
    page_header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0073e5',
        padding: 10
    }
});