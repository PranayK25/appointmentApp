import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, FlatList} from 'react-native';
import * as firebase from 'firebase';
import AvailableSlotsContainer from '../Components/AvaliableSlotsContainer';

const BookingScreen = props => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [bookings, setBookings] = useState([]);
  // const [newBooking, setNewBooking] = useState({});

  const confirmBooking = () => {
    // setNewBooking(bookings[selectedIndex]);
    newBookingHandler();
    removeBooking();
    props.navigation.navigate({routeName: 'Consultation'});
  };

  const removeBooking = () => {
    firebase
      .database()
      .ref(`/BookingSlots/${selectedIndex}`)
      .remove();
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
        // console.log(data);
        // let bookingList = [...data];
        // setBookings(bookingList);
        setBookings(data);
      });
  }, []);

  // useEffect(() => {
  //   console.log(bookings);
  // }, [bookings]);

  return (
    <View style={styles.slotContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Available Slots</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={bookings}
        renderItem={({item: itemData, index}) => {
          if (!itemData) {
            return null;
          } else {
            return (
              <AvailableSlotsContainer
                doctor={itemData.Doctor}
                speciality={itemData.Speciality}
                time={itemData.Time}
                id={itemData.id}
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
