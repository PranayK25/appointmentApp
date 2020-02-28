import React from 'react';
import {View, StyleSheet} from 'react-native';
import Navigator from './src/Navigation/Navigator';
import firebaseConfig from './src/Config/firebaseConfig';
// import Test from './src/Components/Test';

const AppointmentApp = () => {
  firebaseConfig;
  return (
    <View style={styles.screen}>
      <Navigator />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AppointmentApp;
