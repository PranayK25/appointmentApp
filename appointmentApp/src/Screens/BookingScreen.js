import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, FlatList} from 'react-native';
import * as firebase from 'firebase';
import AvailableSlotsContainer from '../Components/AvaliableSlotsContainer';

const BookingScreen = props => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [bookings, setBookings] = useState([]);

  const confirmBooking = () => {
    updateBooking();
    bookings[selectedIndex].isBooked = true;
    newBookingHandler();
    props.navigation.navigate({routeName: 'Consultation'});
  };

  const updateBooking = () => {
    if (selectedIndex !== null) {
      firebase
        .database()
        .ref(`/BookingSlots/${selectedIndex}`)
        .update({isBooked: true});
    }
  };

  const newBookingHandler = () => {
    firebase
      .database()
      .ref('/Consultations')
      .push(bookings[selectedIndex]);
  };

  useEffect(() => {
    firebase
      .database()
      .ref('/BookingSlots')
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        setBookings(Object.values(data));
      });
  }, []);

  return (
    <View style={styles.slotContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Available Slots</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={bookings}
        renderItem={({item: itemData, index}) => {
          if (itemData && itemData.isBooked === false) {
            return (
              <AvailableSlotsContainer
                doctor={itemData.Doctor}
                speciality={itemData.Speciality}
                time={itemData.Time}
                checked={index === selectedIndex}
                onCheck={setSelectedIndex}
                index={index}
              />
            );
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainerstyle}>
          <Button
            style={styles.button}
            title="Confirm Booking"
            onPress={confirmBooking}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 50,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '100%',
  },
  header: {
    fontSize: 26,
    padding: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 25,
    marginBottom: 15,
  },
  buttonContainerstyle: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
  },
});

export default BookingScreen;
