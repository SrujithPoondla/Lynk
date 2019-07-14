import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

export default class HospitalSearchResultsScreen extends Component {
  static navigationOptions = {
    title: 'Nearby Hospitals'
  };
  constructor(props) {
    super(props);

    this.state = {
      hospitalData: null
    };
  }

  componentWillMount() {
    this.getHospitalsData();
  }

  getHospitalsData() {
    fetch('https://f00ecaf1.ngrok.io/api/Hospitals')
      .then(response => response.json())
      .then(responseJson => this.setState({ hospitalData: responseJson }));
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('NavigationScreen')}
    >
      <Card>
        <Text>Name: {item.Name}</Text>
        <Text>Advanced Equipments: {item.AdvancedEquipments}</Text>
        <Text>Basic Equipments: {item.BasicEquipments}</Text>
        {/* <Text>{item.BloodTypes}</Text> */}
        <Text>Specialists Available: {item.SpecialistsAvailable}</Text>
        <Text>OR's Available: {item.ORAvailable}</Text>
        <Text>Rooms Available: {item.RoomsAvailable}</Text>
        <Text>Rooms Taken: {item.RoomsTaken}</Text>
        <Text>Nurses Available: {item.NursesAvailable}</Text>
      </Card>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    console.log(this.state.hospitalData);
    return (
      <ScrollView>
        <FlatList
          renderItem={this.renderItem}
          data={this.state.hospitalData}
          keyExtractor={this.keyExtractor}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
