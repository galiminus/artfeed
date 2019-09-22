import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import getTheme from './native-base-theme/components';
import {
  StyleProvider,
  Toast,
  ActionSheet,
  Root,
} from 'native-base';
import { Notifications, Updates, AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import configureStore from './configureStore';
let { store, persistor } = configureStore();

import JournalsRouter from './components/JournalsRouter';
import Journal from './components/Journal';
import PrivacyPolicy from './components/PrivacyPolicy';
import Drawer from './components/Drawer';
import OptOut from './components/OptOut';
import Subscriptions from './components/Subscriptions';
import AddSubscription from './components/AddSubscription';

import getExpoToken from './getExpoToken';

import { loadSubscriptions } from './actions/subscriptions';
import { setExpoToken } from './actions/expoToken';

const MainNavigator = createStackNavigator(
  {
    JournalsRouter,
    Journal,
    PrivacyPolicy,
    OptOut,
    Subscriptions,
    AddSubscription
  },
  {
    headerMode: 'none',
    initialRouteName: 'JournalsRouter',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    MainNavigator
  },
  {
    contentComponent: (props) => (
      <Drawer {...props} />
    )
  }
);

class ResourcesLoader extends React.Component {
  state = {
    loaded: false,
  };

  async componentDidMount() {
    let expo_token;

    if (!this.props.expoToken) {
      expo_token = await getExpoToken();
      this.props.setExpoToken(expo_token);
    } else {
      this.props.loadSubscriptions({ expo_token: this.props.expoToken });
      this.setState({ loaded: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expoToken !== nextProps.expoToken) {
      this.props.loadSubscriptions({ expo_token: nextProps.expoToken });
      this.setState({ loaded: true });
    }
  }

  render() {
    return (
      this.state.loaded ? <DrawerNavigator /> : <AppLoading />
    )
  }
}

const ConnectedResourcesLoader = connect(
  ({ expoToken }) => ({ expoToken }),
  (dispatch) => ({
    loadSubscriptions: (params) => dispatch(loadSubscriptions(params)),
    setExpoToken: (params) => dispatch(setExpoToken(params))
  })
)(ResourcesLoader);

export default class App extends React.Component {
  state = {
    loaded: false,
  };

  componentWillMount() {
    Toast.toastInstance = null;
    ActionSheet.actionsheetInstance = null;
  }

  async componentDidMount() {
    await Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        MaterialIcons: require('native-base/Fonts/MaterialIcons.ttf'),
      })
    ]);
    this.setState({ loaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <StyleProvider style={getTheme()}>
            <Root>
              {this.state.loaded ? <ConnectedResourcesLoader /> : <AppLoading />}
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
