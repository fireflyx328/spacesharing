import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage} from 'react-native';
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Asset, AppLoading, SplashScreen } from 'expo';

import NavigationService from './src/services/NavigationService';

import CustomHeader from './src/components/CustomHeader';
import CustomDrawerContentComponent from './src/components/CustomDrawerContentComponent';
import InitScreen from './src/components/InitScreen';

/*---- HOME ----*/
import MainContainer from './src/modules/home/containers/MainContainer';

/*---- AUTHENTICATION ----*/
import LoginContainer from './src/modules/auth/containers/LoginContainer';
import RegisterContainer from './src/modules/auth/containers/RegisterContainer';
import ForgotPasswordContainer from './src/modules/auth/containers/ForgotPasswordContainer';
import ProfileContainer from './src/modules/auth/containers/ProfileContainer';

/*---- HELP & FAQs ----*/
import HelpContainer from './src/modules/helpfaq/containers/HelpContainer';

/*---- ORDERS ----*/
import OrdersContainer from './src/modules/orders/containers/OrdersContainer';

const win = Dimensions.get('window');

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    componentDidMount() {
        SplashScreen.preventAutoHide();     
    }

    render() {
        const ratio = win.width/541;
        if (!this.state.isReady) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{ width: win.width, height: 362 * ratio}}
                        source={require('./src/assets/logo.png')}
                        resizeMode={`contain`}
                        onLoad={this._cacheResourcesAsync}
                    />
                </View>
            );
        }

        return (
            <Provider store={store}>
                <Navigation ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                />
            </Provider>
        );
    }

    _cacheSplashResourcesAsync = async () => {
        const gif = require('./src/assets/logo.png');
        return Asset.fromModule(gif).downloadAsync()
    }

    _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        const images = [
            require('./src/assets/logo.png'),
            require('./src/assets/splash.png'),
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        await Promise.all(cacheImages);
        this.setState({ isReady: true });
    }
    
}

const HomeStackNavigator = createStackNavigator(
    {
        Home: MainContainer
    },
    {
        initialRouteName: "Home"
    }
);

const LoginStackNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginContainer,
        },
        Register: {
            screen: RegisterContainer
        },
        ForgotPassword: {
            screen: ForgotPasswordContainer
        }
    },
    {
        initialRouteName: "Login"
    }
);

const OrdersStackNavigator = createStackNavigator(
    {
        Orders: {
            screen: OrdersContainer
        }
    },
    {
        initialRouteName: "Orders"
    }
);

const MyAccountStackNavigator = createStackNavigator(
    {
        Profile: {
            screen: ProfileContainer
        }
    },
    {
        initialRouteName: "Profile"
    }
);

const HelpStackNavigator = createStackNavigator(
    {
        Help: {
            screen: HelpContainer,
            navigationOptions: ({ navigation }) => ({     
                header: <CustomHeader navigation={navigation}/>
            })
        },
        FAQs: {
            screen: HelpContainer
        }
    },
    {
        initialRouteName: "Help"
    }
);

const MyDrawer = createDrawerNavigator(
    {
        Orders: {
            screen: OrdersStackNavigator,
            navigationOptions: {
                drawerLabel: 'My Orders'
            }
        },
        MyAccount: {
            screen: MyAccountStackNavigator,
            navigationOptions: {
                drawerLabel: 'My Account'
            }
        },
        Home: {
            screen: HomeStackNavigator
        },
        Help: {
            screen: HelpStackNavigator,
            navigationOptions: {
                drawerLabel: 'Help & FAQs'
            }
        },        
        Login: {
            screen: LoginStackNavigator
        },
        InitScreen: {
            screen: InitScreen
        }
    },
    {
        initialRouteName: "InitScreen",
        contentComponent: CustomDrawerContentComponent,
        drawerWidth: 250,
        drawerBackgroundColor: "#355088",
        contentOptions: {
            activeTintColor: '#e91e63',
            itemsContainerStyle: {
                marginVertical: 10
            },
            iconContainerStyle: {
                opacity: 1
            }
        }
    }
);

const Navigation = createAppContainer(MyDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
