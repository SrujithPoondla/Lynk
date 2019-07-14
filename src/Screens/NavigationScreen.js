import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class NavigationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: null,
      destinationLocation: null
    };
  }

  componentWillMount() {
    this.getLocationAsync();
    this.getDestinationLocation();
  }

  getDestinationLocation() {
    this.setState({
      destinationLocation: { latitude: 42.7339, longitude: -73.67387 }
    });
    this.setState({
      currentLocation: { latitude: 47.60647, longitude: -122.33128 }
    });
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} />
        <Button title="Start Navigation" containerStyle={{ padding: 15 }} />
        <MapView.Marker
          coordinate={this.state.currentLocation}
          title="My Marker"
          description="Some description"
        />
        <MapView.Marker
          coordinate={this.state.destinationLocation}
          title="My Marker"
          description="Some description"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
