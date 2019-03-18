import React from 'react';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';

let Marker = MapView.Marker;

export default class Main extends React.Component {    
    constructor(props) {
        super(props);
        // alert(JSON.stringify(props));
        this.state = {
            location: null,
            errorMessage: null,
        };
    }

    componentDidMount() {
        // alert(JSON.stringify(this.props));
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    onPress = () => {
        alert('Clicked!');
    }
    
    render() {
        let text = 'Waiting..';
        const {location} = this.state;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (location) {
            text = JSON.stringify(location);
        }

        if (location) {
            const {coords} = location;
            const markers = [
                {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    title: 'Foo Place',
                    subtitle: '1234 Foo Drive'
                }
            ];
            return (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    annotations={markers}
                > 
                    <MapView.Marker
                        coordinate={{latitude: coords.latitude, longitude: coords.longitude}}
                        title={"title"}
                        description={"description"}
                     />
                    <View style={{position: "absolute", bottom: 50, alignItems: 'center'}}>
                        <TouchableOpacity style={styles.button}
                        onPress={this.onPress}
                        >
                            <Text style={{textAlign: 'center', color: '#ffffff'}}>Mit Space Sharing beginnen</Text>
                        </TouchableOpacity>
                    </View>
                </MapView>         
            )
        } else {
            return (
                <View>
                    <Text>{text}</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
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