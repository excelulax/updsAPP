import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {NoticeScreen} from '../screens/NoticeScreen';
import {SocialMediaScreen} from '../screens/SocialMediaScreen';
import {AnswerUpdsScreen} from '../screens/AnswerUpdsScreen';
import {VocationalTestScreen} from '../screens/VocationalTestScreen';
import {FaqScreen} from '../screens/FaqScreen';
import {QuestionAndAnswer} from '../screens/QuestionAndAnswer';
import {NoticeDetail} from '../screens/NoticeDetail';
import { Notice } from '../types/typeNotice';

export type RootStackParamList = {
  HomeScreen: undefined;
  NoticeScreen: undefined;
  SocialMediaScreen: undefined;
  AnswerUpdsScreen: undefined;
  VocationalTestScreen: undefined;
  FaqScreen: undefined;
  QuestionAndAnswer: undefined;
  NoticeDetail: { notice: Notice };
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="SocialMediaScreen" component={SocialMediaScreen} />
      <Stack.Screen name="AnswerUpdsScreen" component={AnswerUpdsScreen} />
      <Stack.Screen name="VocationalTestScreen" component={VocationalTestScreen}/>
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="QuestionAndAnswer" component={QuestionAndAnswer}/>
      <Stack.Screen name="NoticeDetail" component={NoticeDetail}/>
    </Stack.Navigator>
  );
};
