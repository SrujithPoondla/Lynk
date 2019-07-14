import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import React from 'react';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import EmergencyCareScreen from '../Screens/EmergencyCareScreen';
import TransportToSheltersScreen from '../Screens/TransportToSheltersScreen';
import HospitalSearchResultsScreen from '../Screens/HospitalSearchResultsScreen';
import NavigationScreen from '../Screens/NavigationScreen';

const EmergencyCareStackNavigation = createStackNavigator(
  {
    EmergencyCare: { screen: EmergencyCareScreen },
    HospitalsSearchResultsScreen: { screen: HospitalSearchResultsScreen },
    NavigationScreen: { screen: NavigationScreen }
  }
  //   { headerMode: 'none' }
);

const TransportToSheltersStackNavigation = createStackNavigator(
  {
    TransportToShelters: { screen: TransportToSheltersScreen }
  },
  { headerMode: 'none' }
);

const SwitchNavigation = createSwitchNavigator(
  {
    Home: { screen: HomeScreen },
    EmergencyCare: { screen: EmergencyCareStackNavigation },
    TransportToShelters: { screen: TransportToSheltersStackNavigation }
  },
  {
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(SwitchNavigation);

export default AppContainer;
