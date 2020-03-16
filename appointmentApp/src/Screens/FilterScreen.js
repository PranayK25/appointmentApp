import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Button} from 'react-native';
import CalendarPicker from '../Components/CalendarPicker';
import TimePicker from '../Components/TimePicker';

const FilterScreen = props => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const onSubmit = () => {
    const dateAndTime = date + ' ' + time;
    props.navigation.navigate('Consultation', {dateTime: dateAndTime});
  };

  const filterClear = () => {
    setDate('');
    setTime('');
    onSubmit();
  };

  return (
    <Modal animationType="slide">
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Button
            style={styles.headerText}
            title="Clear"
            onPress={filterClear}
          />
        </View>
        <View style={styles.datePickerContainer}>
          <View>
            <Text style={styles.filterText}>Filter By</Text>
          </View>
          <View style={styles.timeDateContainer}>
            <View style={styles.datePicker}>
              <CalendarPicker onSetDate={setDate} />
            </View>
            <View style={styles.timePicker}>
              <TimePicker onSetTime={setTime} />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.submitButtonContainer}>
            <Button
              styles={styles.buttonText}
              title="Submit"
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
  },
  filterHeader: {
    marginTop: 50,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 20,
  },
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 26,
  },
  timeDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  datePicker: {
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    borderRadius: 5,
    padding: 10,
  },
  timePicker: {
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  timeDateText: {
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  submitButtonContainer: {
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
  },
  buttonText: {
    fontSize: 26,
    color: 'black',
  },
});

export default FilterScreen;
