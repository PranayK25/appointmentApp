import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  // FlatList,
  SectionList,
} from 'react-native';
import * as firebase from 'firebase';
import AvailableSlotsContainer from '../Components/AvaliableSlotsContainer';

const BookingScreen = props => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [localBookingList, setLocalBookingList] = useState([]);
  // const [sectionBookings, setSectionBookings] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref('/BookingSlots')
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        const sectionData = onSection(data);
        setLocalBookingList(Object.values(data));
        setBookings(sectionData);
        // setBookings(data);
        // console.log(data)
      });
  }, []);

  // useEffect(() => {
  //   onSection(bookings);
  // }, []);

  // useEffect(() => {
  //   console.log(bookings);
  // }, [sectionListArray]);

  const onSection = data => {
    let sectionListArray = [];
    data.forEach(element => {
      if (element) {
        sectionListArray.push({
          title: element.Date,
          data: [
            {
              doctor: element.Doctor,
              time: element.Time,
              speciality: element.Speciality,
              isBooked: element.isBooked,
              id: element.id,
            },
          ],
        });
      }
    });
    return sectionListArray;
    // console.log(sectionListArray);
  };

  // useEffect(() => {
  //   console.log(sectionBookings);
  // }, [sectionBookings]);

  const confirmBooking = () => {
    if (selectedIndex !== null) {
      console.log(localBookingList[selectedIndex])
      updateBooking();
      localBookingList[selectedIndex - 1].isBooked = true;
      newBookingHandler();
      props.navigation.navigate({routeName: 'Consultation'});
    } else {
      props.navigation.navigate({routeName: 'Consultation'});
    }
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
      .push(localBookingList[selectedIndex - 1]);
  };

  return (
    <View style={styles.slotContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Available Slots</Text>
      </View>
      {/* <Text>{JSON.stringify(bookings, null, 4)}</Text> */}
      {/* <FlatList
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
      /> */}
      {/* <SectionList
        keyExtractor={(item, index) => index.toString()}
        sections={bookings || []}
        renderItem={({item, index}) => {
          // if (item.isBooked === false) {
          return (
            <AvailableSlotsContainer
              doctor={item.doctor}
              speciality={item.speciality}
              time={item.time}
              checked={index === selectedIndex}
              onCheck={setSelectedIndex}
              index={index}
            />
          );
        }}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
      /> */}
      <SectionList
        keyExtractor={(item, index) => index.toString()}
        sections={bookings}
        renderItem={({item, index}) => {
          if (item.isBooked === false) {
            return (
              <AvailableSlotsContainer
                doctor={item.doctor}
                speciality={item.speciality}
                time={item.time}
                checked={item.id === selectedIndex}
                onCheck={setSelectedIndex}
                id={item.id}
              />
            );
          } else {
            return null;
          }
        }}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
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

// https://www.reddit.com/r/reactnative/comments/aaww56/using_sectionlist_how_would_i_programatically/

// [
//   { title: 'Section Head For Data A', data: [{name: 'Gaurav', last_name: 'Ahuja'}] },
//   { title: 'Section Head For Data B', data: [{name: 'Gaurav', last_name: 'Ahuja'}] },
//   { title: 'Section Head For Data C', data: [{name: 'Gaurav', last_name: 'Ahuja'}] },
//  ]
