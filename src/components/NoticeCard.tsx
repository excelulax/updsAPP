import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { globalColors } from '../theme/appTheme';
import { IconLabel } from './IconLabel';
import { Notice } from '../types/typeNotice';

export const NoticeCard = (props: Notice) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImage}>
        <Image
          source={{ uri: props.imagen }}
          style={styles.imageCard}
        />
      </View>
      <View style={styles.cardDetailContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>{props.titulo}</Text>
        <Text style={styles.cardDetail} numberOfLines={1}>
          {props.texto}
        </Text>
        <View style={styles.iconContainer}>
          <IconLabel iconName="favorite-border" textButton={props.like + " likes"} />
          <IconLabel iconName="access-time" textButton={props.fecha.toString()} />
        </View>
      </View>
    </View>
  );
};
//------------
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 25,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - 25,
    marginBottom: 20,
    backgroundColor: '#000',
    height: 220,
    borderRadius: 20, 
    shadowColor: '#2196f3',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  cardImage: {
    width: deviceWidth - 25,
    height: 130,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.9,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontSize: 24,
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  cardDetail: {
    // fontWeight: '200',
    // color: 'white'
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  cardDetailContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageCard: {
    height: 130,
    width: deviceWidth - 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     width: deviceWidth - 25,
//     alignItems: 'center',
//     marginTop: 25,
//   },
//   cardContainer: {
//     width: deviceWidth - 25,
//     marginBottom: 20,
//     backgroundColor: globalColors.primary,
//     height: 220,
//     borderRadius: 20,
//     shadowColor: globalColors.primary,
//     shadowOffset: {
//       width: 5,
//       height: 5,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 9,
//   },
//   cardImage: {
//     width: deviceWidth - 25,
//     height: 130,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     opacity: 0.9,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: 'white',
//   },
//   cardDetail: {
//     fontWeight: '200',
//     color: 'white'
//   },
//   cardDetailContainer: {
//     marginHorizontal: 10,
//     marginVertical: 5,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   imageCard: {
//     height: 130,
//     width: deviceWidth - 25,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
// });
