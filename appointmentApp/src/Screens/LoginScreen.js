import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import * as firebase from 'firebase';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = enteredEmail => {
    setEmail(enteredEmail);
  };

  const passwordHandler = enteredPassword => {
    setPassword(enteredPassword);
  };

  const login = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          props.navigation.navigate({routeName: 'Consultation'});
        });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.userInputContainer}>
        <View style={styles.inputButtonContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={emailHandler}
            value={email.toLowerCase()}
          />
        </View>
        <View style={styles.inputButtonContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={passwordHandler}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button title="LOG IN" onPress={login.bind(this, email, password)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInputContainer: {
    width: '90%',
  },
  inputButtonContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
  },
});

export default LoginScreen;
