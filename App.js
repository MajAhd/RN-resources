import React, {Component} from 'react';
import {Root} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/HomeScreen';
import ContactScreen from './src/ContactScreen';
import LocationScreen from './src/LocationScreen';
import SmsScreen from './src/SmsScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Contact: ContactScreen,
    Location: LocationScreen,
    Sms: SmsScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      title: 'RN-Resources',
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
