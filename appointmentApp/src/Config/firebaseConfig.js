import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDsalfSyFCJgaCVppEw1SyHwZ7A3jCQ2d4',
  authDomain: 'appointmentapp-721de.firebaseapp.com',
  databaseURL: 'https://appointmentapp-721de.firebaseio.com',
  projectId: 'appointmentapp-721de',
  storageBucket: 'appointmentapp-721de.appspot.com',
  messagingSenderId: '644788972159',
  appId: '1:644788972159:web:336b4a9e112d2f6d86ed4a',
  measurementId: 'G-3S543YYVHY',
};

firebase.initializeApp(firebaseConfig);
export default firebaseConfig;
