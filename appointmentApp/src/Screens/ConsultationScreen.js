import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  AsyncStorage,
} from 'react-native';
import ConsultationContainer from '../Components/ConsultationContainer';
import * as firebase from 'firebase';

const ConsulationScreen = props => {
  const [consultations, setConsultations] = useState([]);
  let userName;
  // const [filteredList, setFilteredList] = useState([]);

  const onNewBooking = () => {
    props.navigation.navigate({routeName: 'Booking'});
  };

  const onFilterPress = () => {
    props.navigation.navigate({routeName: 'Filter'});
  };

  // const onFilter = () => {
  //   setFilteredList(
  //     consultations.filter(
  //       consultation =>
  //         (consultation.date === filterDate && consultation.time === filterTime)
  //     ),
  //   );
  // };

  useEffect(() => {
    firebase
      .database()
      .ref('/Consultations')
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        setConsultations(Object.values(data));
      });
    // userName = userNameHandler();
    // console.log(userName);
  }, []);

  const userNameHandler = async () => {
    let userId = '';
    try {
      userId = (await AsyncStorage.getItem('userName')) || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return userId;
  };

  return (
    <View style={styles.consultationContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.leftContainer} />
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>My Consultations</Text>
        </View>
        <View style={styles.filterBoxContainer}>
          <Button
            title="Filter"
            style={styles.filterBox}
            onPress={onFilterPress}
          />
        </View>
      </View>
      <View style={styles.userTextContainer}>
        <Text style={styles.userText}>Member : </Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={consultations}
        renderItem={({item: itemData}) => {
          if (!itemData) {
            return null;
          } else {
            return (
              <ConsultationContainer
                doctor={itemData.Doctor}
                speciality={itemData.Speciality}
                time={itemData.Time}
                date={itemData.Date}
              />
            );
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainerstyle}>
          <Button
            style={styles.button}
            title="Book a cunsultation"
            onPress={onNewBooking}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    width: '20%',
  },
  consultationContainer: {
    flex: 1,
  },
  headingContainer: {
    justifyContent: 'space-between',
    marginTop: 50,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '100%',
    flexDirection: 'row',
  },
  headingText: {
    fontSize: 26,
    padding: 15,
  },
  filterBoxContainer: {
    width: '20%',
    justifyContent: 'center',
  },
  userTextContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  userText: {
    fontSize: 20,
    padding: 8,
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

export default ConsulationScreen;
