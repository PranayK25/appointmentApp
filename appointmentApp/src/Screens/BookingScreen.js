import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SectionList,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';
import AvailableSlotsContainer from '../Components/AvaliableSlotsContainer';
import {NavigationEvents} from 'react-navigation';

const BookingScreen = props => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [localBookingList, setLocalBookingList] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    firebase
      .database()
      .ref('/BookingSlots')
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        const sectionData = onSection(data);
        setLocalBookingList(Object.values(data));
        setBookings(sectionData);
      });
  }, []);

  const userDetailsHandler = async () => {
    let username = await AsyncStorage.getItem('userName');
    setUserName(username);
  };

  const onSection = data => {
    let sectionListArray = Object.values(data);
    let res = sectionListArray.reduce((re, o) => {
      let existObj = re.find(obj => obj.title === o.Date);
      if (existObj) {
        existObj.data.push(o);
      } else {
        re.push({
          title: o.Date,
          data: [o],
        });
      }
      return re;
    }, []);
    return res;
  };

  const confirmBooking = () => {
    if (selectedIndex !== null) {
      updateBooking();
      localBookingList[selectedIndex - 1].isBooked = true;
      newBookingHandler();
      setSelectedIndex(null);
      props.navigation.navigate({routeName: 'Consultation'});
    } else {
      setSelectedIndex(null);
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
      .ref(`/Consultations/${userName}`)
      .push(localBookingList[selectedIndex - 1]);
  };

  return (
    <View style={styles.slotContainer}>
      <NavigationEvents onWillFocus={userDetailsHandler} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Available Slots</Text>
      </View>
      <SectionList
        keyExtractor={(item, index) => index.toString()}
        sections={bookings}
        renderItem={({item, index}) => {
          if (item.isBooked === false) {
            return (
              <AvailableSlotsContainer
                doctor={item.Doctor}
                speciality={item.Speciality}
                time={item.Time}
                checked={item.id === selectedIndex}
                onCheck={setSelectedIndex}
                id={item.id}
              />
            );
          } else {
            return null;
          }
        }}
        renderSectionHeader={({section}) => {
          let count = 0;
          section.data.map(val => {
            if (val.isBooked === false) {
              count += 1;
            }
          });
          if (count) {
            return <Text style={styles.styleTextTitle}>{section.title}</Text>;
          } else {
            return null;
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
