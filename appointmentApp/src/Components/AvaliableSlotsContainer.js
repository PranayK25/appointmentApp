import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-check-box';

const AvailableSlotsContainer = props => {
  const handleCheckbox = () => {
    props.onCheck(props.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleCheckbox}>
      <View style={styles.allBookings}>
        <View style={styles.slotContainer}>
          <Text style={styles.timeText}>{props.time}</Text>
          <View style={styles.doctorText}>
            <Text style={styles.texts}>{props.doctor}</Text>
            <Text style={styles.texts}>{props.speciality}</Text>
          </View>
        </View>
        <View style={styles.checkBox}>
          <CheckBox isChecked={props.checked} onClick={handleCheckbox} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  allBookings: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  timeText: {
    padding: 10,
    fontSize: 23,
  },
  doctorText: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  texts: {
    fontSize: 16,
    opacity: 0.8,
  },
  checkBox: {
    justifyContent: 'center',
  },
});

export default AvailableSlotsContainer;
