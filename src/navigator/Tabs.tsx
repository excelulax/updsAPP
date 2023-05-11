import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {globalColors} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigator} from './NavigatorHome';
import {StackNavigatorStudent} from './NavigatorStudent';

import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import {getBanners} from '../services/ServiceBanner';
import {useState, useEffect} from 'react';
import {Banner} from '../types/typeBanner';
import {ImageSlider} from '../components/ImageSlider';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  useEffect(() => {
    const getImages = async () => {
      const data = await getBanners();
      setBanners(data);
    };
    getImages();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // console.log('activo');
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // console.log('desactivo');
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: 'white',
        }}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: globalColors.primary,
          headerShown: false,
          tabBarStyle: {
            borderTopColor: globalColors.primary,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarIcon: ({color}) => {
            let iconName: string = '';
            switch (route.name) {
              case 'StackNavigator':
                iconName = 'home';
                break;
              case 'StackNavigatorStudent':
                iconName = 'school';
              default:
                break;
            }
            return <Icon name={iconName} size={30} color={color} />;
          },
        })}>
        <Tab.Screen
          name="StackNavigator"
          component={StackNavigator}
          options={{title: 'Inicio'}}
        />

        <Tab.Screen
          name="StackNavigatorStudent"
          component={StackNavigatorStudent}
          options={{title: 'Estudiante'}}
        />
      </Tab.Navigator>
      {!isKeyboardVisible && <ImageSlider banner={banners} />}
    </View>

    // <Tab.Navigator
    //     sceneContainerStyle={{
    //         backgroundColor: 'white'
    //     }}
    //     screenOptions={({ route }) => ({
    //         tabBarActiveTintColor: globalColors.primary,
    //         headerShown: false,
    //         tabBarStyle: {

    //             borderTopColor: globalColors.primary,
    //             borderTopWidth: 0,
    //             elevation: 0
    //         },
    //         tabBarIcon: ({ color }) => {
    //             let iconName: string = '';
    //             switch (route.name) {
    //                 case 'StackNavigator':
    //                     iconName = 'home'
    //                     break;
    //                 case 'StackNavigatorStudent':
    //                     iconName = 'school'
    //                 default:
    //                     break;
    //             }
    //             return <Icon name={iconName} size={30} color={color} />
    //         }
    //     })}>
    //     <Tab.Screen name="StackNavigator" component={StackNavigator} options={{ title: 'Inicio' }} />
    //     <Tab.Screen name="StackNavigatorStudent" component={StackNavigatorStudent} options={{ title: 'Estudiante' }} />
    // </Tab.Navigator>
  );
};
