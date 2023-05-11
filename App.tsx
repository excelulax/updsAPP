import 'react-native-gesture-handler';
import React from 'react';
import {StackNavigator} from './src/navigator/NavigatorHome';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './src/navigator/Tabs';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
const App = () => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('esto es un pruba', remoteMessage);
    });
  }, []);
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};
export default App;
//npm install -g react-native-cli

//NICOL
