import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStudentScreen } from '../screens/HomeStudentScreen';
import { TutorialScreen } from '../screens/TutorialScreen';
import { ProjectionsScreen } from '../screens/ProjectionsScreen';

const Stack = createStackNavigator();

export const StackNavigatorStudent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeStudentScreen" component={HomeStudentScreen} />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
      <Stack.Screen name="ProjectionsScreen" component={ProjectionsScreen} />
    </Stack.Navigator>
  );
};
