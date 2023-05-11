import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalColors} from '../theme/appTheme';

interface Title {
  textHeader: string;
}

export const Header = ({textHeader}: Title) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{textHeader}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleStyle: {
    color: globalColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});