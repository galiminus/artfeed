import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import getTheme from './native-base-theme/components';
import {
  StyleProvider,
  Toast,
  ActionSheet,
  Root,
} from 'native-base';
import { Constants, Notifications, Updates, SecureStore, AppLoading, Asset, Font } from 'expo';
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
              {this.state.loaded ? <DrawerNavigator notification={this.props.exp.notification} /> : <AppLoading />}
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
