import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ConsultationContainer = props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.consultationText}>Doctor: </Text>
        <Text style={styles.consultationText}>Date and Time: </Text>
      </View>
      <View style={styles.detailText}>
        <Text style={styles.consultationText}>{props.doctor}</Text>
        <Text style={styles.consultationText}>{props.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    width: '90%',
    marginTop: 15,
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  detailText: {
    marginLeft: 20,
  },
  consultationText: {
    fontSize: 16,
  },
});

export default ConsultationContainer;
