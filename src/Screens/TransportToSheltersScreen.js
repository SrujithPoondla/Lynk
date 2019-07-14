import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class TransportToSheltersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <KeyboardAwareScrollView>
          <View style={styles.ViewStyle} />
        </KeyboardAwareScrollView>
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
    width: wp('85%')
  }
});
