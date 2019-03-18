import React from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';
import { StackActions } from 'react-navigation';

import { Container, Content, Header, Form, Input, Item, Button, Footer, FooterTab, Label } from 'native-base'

export default class Profile extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            uid: ''
        };

        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentUser().then(user => {
            this.setState({...user});
        });
    }

    updateProfile() {
        const {name, email, password, uid} = this.state;
        const data = {
            name, email, password, uid
        };

        if (!password) {
            alert('Please enter your password.');
            return false;
        }

        this.props.updateUser(data).then((response) => {
            alert('You have successfully updated your profile.');
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
                    <View style={{width: "100%"}}><Text h1 style={styles.page_header}>My Account</Text></View>
                </View>
                <ScrollView>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
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
                            onPress={this.updateProfile}
                        >
                            <Text style={{ color: 'white' }}> Update </Text>
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