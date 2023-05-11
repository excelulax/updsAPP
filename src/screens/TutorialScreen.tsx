import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {globalColors} from '../theme/appTheme';
import SubscribeCard from 'react-native-subscribe-card';

// https://www.npmjs.com/package/react-native-subscribe-card

export const TutorialScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={styles.titleTutorials}>TUTORIALES</Text>
      </View>
      <ScrollView>
        <SubscribeCard
          title="1 year plan"
          descriptionPrice="$224"
          description=" billed every year"
          currency="$"
          price={12}
          timePostfix="/mo"
          onPress={() => {}}
          style={styles.item}
        />
        <SubscribeCard
          title="1 year plan"
          descriptionPrice="$224"
          description=" billed every year"
          currency="$"
          price={12}
          timePostfix="/mo"
          onPress={() => {}}
          style={styles.item}
        />
        <SubscribeCard
          title="1 year plan"
          descriptionPrice="$224"
          description=" billed every year"
          currency="$"
          price={12}
          timePostfix="/mo"
          onPress={() => {}}
          style={styles.item}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: globalColors.primary,
  },
  item: {
    // width: '100%',
    // overflow: 'hidden',
    // paddingVertical: 10,
    marginBottom: 5,

    // marginTop: 2,
    // backgroundColor: globalColors.primary,
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: globalColors.primary,
  },
  titleTutorials: {
    color: globalColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
