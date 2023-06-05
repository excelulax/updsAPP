import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import {globalColors} from '../theme/appTheme';
// import SubscribeCard from 'react-native-subscribe-card';

export const TutorialScreen = () => {
  const data = [
    {
      id: '1',
      title: 'MICROSOFT TEAMS ESTUDIANTES',
      description: 'Tutorial del uso de Microsoft Teams para estudiantes',
      image:require('../../assets/estudiantes.png'),
      link:'https://cses.fi/book/book.pdf'
    },
    {
      id: '2',
      title: 'MICROSOFT TEAMS MOVIL',
      description: 'Tutorial del uso de Microsoft Teams Movil',
      image:require('../../assets/movil.png'),
      link:'https://cses.fi/book/book.pdf'
    },
    {
      id: '3',
      title: 'MICROSOFT TEAMS INVITADO',
      description: 'Tutorial del uso de Microsoft Teams Invitado',
      image:require('../../assets/invitado.png'),
      link:'https://cses.fi/book/book.pdf'
    },
    {
      id: '4',
      title: 'PLATAFORMA MOODLE ESTUDIANTES',
      description: 'Tutorial del uso de la plataforma moodle estudiantes',
      image:require('../../assets/plataforma.png'),
      link:'https://cses.fi/book/book.pdf'
    }
  ];

  const [results, setResults] = useState(data);
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: globalColors.primary,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          TUTORIALES
        </Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={results}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={post => {
          const item = post.item;
          return (
            <TouchableOpacity style={styles.card}
            onPress={() => {
              Linking.openURL(item.link);
            }}>
              <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={item.image} />
                {/* <Image source={{uri: item.image}}  style={{width: 400, height: 200}}/> */}
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description} </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 17,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  cardImage: {
    // height: 150,
    // width: 0,
    width:150,
    height:150,
    resizeMode: 'cover',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    alignItems:'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: '#778899',
    textAlign:'center'
  },
  description: {
    fontSize: 14,
    flex: 1,
    color: '#B0C4DE',
    textAlign:'center'
  },
});

// import React from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import {globalColors} from '../theme/appTheme';
// import SubscribeCard from 'react-native-subscribe-card';

// // https://www.npmjs.com/package/react-native-subscribe-card

// export const TutorialScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           alignItems: 'center',
//           marginBottom: 10,
//         }}>
//         <Text style={styles.titleTutorials}>TUTORIALES</Text>
//       </View>
//       <ScrollView>
//         <SubscribeCard
//           title="1 year plan"
//           descriptionPrice="$224"
//           description=" billed every year"
//           currency="$"
//           price={12}
//           timePostfix="/mo"
//           onPress={() => {}}
//           style={styles.item}
//         />
//         <SubscribeCard
//           title="1 year plan"
//           descriptionPrice="$224"
//           description=" billed every year"
//           currency="$"
//           price={12}
//           timePostfix="/mo"
//           onPress={() => {}}
//           style={styles.item}
//         />
//         <SubscribeCard
//           title="1 year plan"
//           descriptionPrice="$224"
//           description=" billed every year"
//           currency="$"
//           price={12}
//           timePostfix="/mo"
//           onPress={() => {}}
//           style={styles.item}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontWeight: 'bold',
//     color: globalColors.primary,
//   },
//   item: {
//     // width: '100%',
//     // overflow: 'hidden',
//     // paddingVertical: 10,
//     marginBottom: 5,

//     // marginTop: 2,
//     // backgroundColor: globalColors.primary,
//     // borderRadius: 20,
//     // borderWidth: 1,
//     // borderColor: globalColors.primary,
//   },
//   titleTutorials: {
//     color: globalColors.primary,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });
