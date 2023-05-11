import {StatusBar, StyleSheet} from 'react-native';

export const globalColors = {
  primary: '#223B82',
  secondary: '#C1C0C0',
  third: '#006633',
  fourth: '#0099CC',
};

export const globalStyle = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
});