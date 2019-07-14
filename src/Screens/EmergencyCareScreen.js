import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Constants from 'expo-constants';
import {
  Input,
  Card,
  CheckBox,
  Button,
  Overlay,
  Icon
} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AutoComplete from 'react-native-autocomplete-input';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

export default class EmergencyScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      gender: null,
      male: true,
      female: false,
      others: false,
      isMEOverlayVisible: false,
      isPIOverlayVisible: false,
      date: null,
      medicalUnit: null,
      gender: null,
      currentLocation: null,
      currentLocationZip: null
      //TODO: add time check in
      //
    };
  }
  componentWillMount() {
    this.getLocationAsync();
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ currentLocation: location });
  };

  findGender() {}

  medicalEvaluationButtonPressed() {
    this.setState({ isMEOverlayVisible: true });
  }

  getZip(lat, lon) {
    // Geocoder.getFromLatLng(lat, lon).then(json => console.log(json));
    var zip;
    Geocoder.getFromLatLng(lat, lon)
      .then(json => {
        var addressComponent = json.results[0].address_components[7].long_name;
        zip = addressComponent;
        return zip;
      })
      .then(zip => {
        this.setState({ currentLocationZip: zip });
      })
      .catch(error => console.warn(error));
  }

  render() {
    const { extra } = Constants.manifest;
    // console.log(extra.googleMapsApiKey);
    Geocoder.init(extra.googleMapsApiKey);
    let current_location = 'Waiting...';
    if (this.state.currentLocation) {
      current_location = this.getZip(
        this.state.currentLocation.coords.latitude,
        this.state.currentLocation.coords.longitude
      );
    }
    let medical_unit_data = [
      {
        value: 'Cardiac center'
      },
      {
        value: 'Intensive Care Unit'
      },
      {
        value: 'Women Care'
      },
      {
        value: 'Pediatric Center'
      }
    ];
    let blood_types_data = [
      {
        value: 'A'
      },
      {
        value: 'A+'
      },
      {
        value: 'A-'
      },
      {
        value: 'B'
      },
      {
        value: 'B-'
      },
      {
        value: 'B+'
      },
      {
        value: 'O+'
      },
      {
        value: 'O-'
      },
      {
        value: 'AB'
      },
      {
        value: 'AB+'
      },
      {
        value: 'AB-'
      }
    ];
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <View style={{ paddingTop: 20 }} />
        <Card>
          <Text style={styles.DispatchUnitCardTextStyle}>
            Dispatch Unit ID : SEA-8A3H
          </Text>
          <Text style={styles.DispatchUnitCardTextStyle}>
            Current Location : 98104
          </Text>
        </Card>
        <Card>
          <View style={styles.FinalButtonsViewStyle}>
            <Button
              title="Enter Patient Info"
              onPress={() => this.setState({ isPIOverlayVisible: true })}
              containerStyle={styles.PIButtonContainerStyle}
              buttonStyle={styles.PIButtonStyle}
            />
            <Button
              title="Medical Evaluation"
              type="solid"
              buttonStyle={styles.MedicalRecordButtonStyle}
              containerStyle={styles.MedicalRecordButtonContainerStyle}
              onPress={() => this.medicalEvaluationButtonPressed()}
            />
          </View>
        </Card>
        <Overlay
          isVisible={this.state.isPIOverlayVisible}
          overlayStyle={styles.OverlayStyle}
          onBackdropPress={() => this.setState({ isPIOverlayVisible: false })}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Ionicons
                name="ios-close"
                size={30}
                style={{ paddingLeft: 10, paddingTop: 10 }}
                onPress={() => this.setState({ isPIOverlayVisible: false })}
              />
              <View style={styles.ViewStyle}>
                <Text style={styles.OverlayTitleStyle}>Patient Info</Text>
                <KeyboardAwareScrollView>
                  <Input
                    placeholder="First Name"
                    containerStyle={styles.InputStyle}
                  />
                  <Input
                    placeholder="Last Name"
                    containerStyle={styles.InputStyle}
                  />
                  <View style={styles.GenderViewStyle}>
                    <CheckBox title="Male" checked={this.state.male} />
                    <CheckBox title="Female" checked={this.state.female} />
                  </View>
                  <View style={styles.GenderViewStyle}>
                    <CheckBox title="Undisclosed" checked={this.state.others} />
                  </View>
                  <View>
                    <DatePicker
                      style={{ width: wp('70%') }}
                      date={this.state.date} //initial date from state
                      mode="date" //The enum of date, datetime and time
                      placeholder="Select Date Of Birth"
                      format="DD-MM-YYYY"
                      minDate="01-01-1900"
                      maxDate="01-01-2019"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36
                        },
                        placeholderText: {
                          fontSize: 15,
                          fontWeight: '200'
                        }
                      }}
                      onDateChange={date => {
                        this.setState({ date: date });
                      }}
                    />
                  </View>
                  <Input
                    placeholder="Address"
                    containerStyle={styles.InputStyle}
                  />
                  <Input
                    placeholder="Emergency Contact"
                    keyboardType="phone-pad"
                    containerStyle={styles.InputStyle}
                  />
                  <View style={{ alignItems: 'center' }}>
                    <Button
                      title="Save"
                      buttonStyle={styles.SaveButtonStyle}
                      containerStyle={styles.SaveButtonContainerStyle}
                    />
                  </View>
                </KeyboardAwareScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Overlay>
        <View style={{ alignItems: 'center' }}>
          <Dropdown
            label="Chose the medical unit"
            containerStyle={styles.MedicalUnitPickerStyle}
            data={medical_unit_data}
          />
          <AutoComplete
            containerStyle={{ width: wp('80%'), paddingBottom: 30 }}
            inputContainerStyle={{
              borderColor: '#FFF',
              borderBottomColor: 'lightgray'
            }}
            placeholder="Enter patient's hospital choice"
            placeholderTextColor="gray"
            // onChangeText={text => this.setState({ query: text })}
            // renderItem={({ item, i }) => (
            //   <TouchableOpacity onPress={() => this.setState({ query: item })}>
            //     <Text>{item}</Text>
            //   </TouchableOpacity>
            // )}
          />
        </View>
        <View style={styles.FinalButtonsViewStyle}>
          <Button
            title="Search"
            type="solid"
            containerStyle={styles.SearchButtonContainerStyle}
            buttonStyle={styles.SearchButtonStyle}
            onPress={() =>
              this.props.navigation.navigate('HospitalsSearchResultsScreen')
            }
          />
        </View>
        <Overlay
          isVisible={this.state.isMEOverlayVisible}
          overlayStyle={styles.OverlayStyle}
          onBackdropPress={() => this.setState({ isMEOverlayVisible: false })}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Ionicons
                name="ios-close"
                size={30}
                style={{ paddingLeft: 10, paddingTop: 10 }}
                onPress={() => this.setState({ isMEOverlayVisible: false })}
              />
              <View style={styles.OverlayViewStyle}>
                <Text style={styles.OverlayTitleStyle}>Medical Evaluation</Text>
                <Input keyboardType="number-pad" placeholder="Blood Pressure" />
                <Input placeholder="Pulse" keyboardType="number-pad" />
                <Input
                  placeholder="Body Temperature"
                  keyboardType="number-pad"
                />
                <Input placeholder="Allergies" />
                <Input placeholder="Medication" />
                <Input placeholder="RSP" keyboardType="number-pad" />

                <Dropdown
                  label="Chose blood type"
                  data={blood_types_data}
                  containerStyle={styles.BloodTypePickerStyle}
                />

                <Button
                  title="Save"
                  buttonStyle={styles.SaveButtonStyle}
                  containerStyle={styles.SaveButtonContainerStyle}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Overlay>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1
  },
  ViewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  InputStyle: {
    paddingBottom: 10,
    width: wp('70%')
  },
  OverlayInputStyle: {
    paddingBottom: 10
  },
  DispatchUnitCardTextStyle: {
    fontSize: 18,
    fontWeight: '600'
  },
  SearchHospitalsCardTitleStyle: {},
  SearchHospitalsCardTitleDividerStyle: {
    backgroundColor: '#FFFF'
  },
  GenderViewStyle: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  MedicalUnitPickerStyle: {
    width: wp('80%')
  },
  DobTextStyle: {
    fontSize: 15,
    fontWeight: '500'
  },
  MedicalRecordButtonContainerStyle: {
    padding: 10
  },
  MedicalRecordButtonStyle: {
    width: wp('80%'),
    backgroundColor: '#DB162F'
  },
  FinalButtonsViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  SearchButtonContainerStyle: {
    paddingBottom: 10
  },
  SearchButtonStyle: {
    width: wp('80%'),
    backgroundColor: 'skyblue'
  },
  OverlayStyle: {
    height: hp('70%')
  },
  OverlayTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 20
  },
  OverlayViewStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  BloodTypePickerStyle: {
    width: wp('70%')
  },
  SaveButtonContainerStyle: {
    width: wp('50%'),
    paddingTop: 20
  },
  OverlayTitleViewStyle: {
    flexDirection: 'row'
  },
  PIButtonContainerStyle: {
    paddingBottom: 10,
    paddingTop: 40
  },
  PIButtonStyle: {
    width: wp('80%'),
    backgroundColor: '#5F758E'
  }
});
