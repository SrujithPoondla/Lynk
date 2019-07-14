import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <View style={styles.TextViewStyle}>
          <Text style={styles.TitleStyle}>Chose One Dispatch Method</Text>
          <Button
            title="Transportation to shelters"
            type="clear"
            titleStyle={styles.ButtonTitleStyle}
            containerStyle={styles.ButtonStyle}
            onPress={() =>
              this.props.navigation.navigate('TransportToShelters')
            }
          />
          <Button
            title="Acute & Emergency Care"
            type="clear"
            titleStyle={styles.ButtonTitleStyle}
            containerStyle={styles.ButtonStyle}
            onPress={() => this.props.navigation.navigate('EmergencyCare')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  TitleStyle: {
    fontSize: 27,
    padding: 5
  },
  TextViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('30%')
  },
  SafeAreaViewStyle: {
    flex: 1
  },
  ButtonStyle: {
    paddingTop: 10
  },
  ButtonTitleStyle: {
    fontSize: 20,
    fontWeight: '600'
  }
});
