import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from '../Screens/LoginScreen';
import ConsultationScreen from '../Screens/ConsultationScreen';
import FilterScreen from '../Screens/FilterScreen';
import BookingScreen from '../Screens/BookingScreen';

const Navigator = createStackNavigator(
  {
    Consultation: ConsultationScreen,
    Login: LoginScreen,
    Filter: FilterScreen,
    Booking: BookingScreen,
  },
  {
    initialRouteName: 'Consultation',
    defaultNavigationOptions: {
      headerShown: false,
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default createAppContainer(Navigator);
