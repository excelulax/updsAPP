/*
instalciones: 
npm install rn-fetch-blob --save
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import {Notice} from '../types/typeNotice';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  CommonActions,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigator/NavigatorHome';
import {globalColors} from '../theme/appTheme';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  route: RouteProp<RootStackParamList, 'NoticeDetail'>;
  navigation: StackNavigationProp<RootStackParamList, 'NoticeDetail'>;
};
export const NoticeDetail: React.FC<Props> = ({route, navigation}) => {
  const {notice} = route.params;
  const [like, setLike] = useState(notice.like);
  const [islike, setIsLike] = useState(false);
  const navigator = useNavigation();

  const checkIfLiked = async (): Promise<boolean> => {
    const liked = await AsyncStorage.getItem(`Noticia_${notice.id}`);
    return liked === 'true';
  };
  const likeNotice = async () => {
    setIsLike(!islike);
    const liked = await checkIfLiked();
    const increment = liked ? -1 : 1;
    const noticiaRef = firestore().collection('Noticia').doc(notice.id);
    noticiaRef
      .update({
        like: firestore.FieldValue.increment(increment),
      })
      .then(async () => {
        await AsyncStorage.setItem(`Noticia_${notice.id}`, (!liked).toString());
        setLike(like + increment);
      })
      .catch(error => {
        console.log('Error al incrementar like:', error);
      });
  };

  const shareNotice = async () => {
    const ImageBase64 = notice.imagen;
    try {
      const shareOptions = {
        message: notice.texto,
        url: ImageBase64,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error al compartir la imagen:', error);
    }
  };
  useEffect(() => {
    async function init() {
      const liked = await checkIfLiked();
      setIsLike(liked);
    }
    init();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', marginHorizontal: 30}}>
          <Image style={styles.productImg} source={{uri: notice.imagen}} />
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigator.dispatch(
                    CommonActions.navigate({
                      name: 'NoticeScreen',
                    }),
                  )
                }>
                <Image
                  style={styles.icon}
                  source={require('../../assets/back1.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconFonts}>Regresar</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={likeNotice}>
                <Image
                  style={styles.icon}
                  source={
                    islike
                      ? require('../../assets/like.png')
                      : require('../../assets/nolike.png')
                  }
                />
              </TouchableOpacity>
              <Text style={styles.iconFonts}>Me gusta</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={shareNotice}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/share1.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconFonts}>Compartir</Text>
            </View>
          </View>

          <Text style={styles.title}>{notice.titulo}</Text>
          <Text style={styles.description}>{notice.texto}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.statCount}>{like}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statCount}>{notice.fecha}</Text>
            <Text style={styles.statLabel}>Fecha</Text>
          </View>
        </View>
        <View style={styles.contentSize}>
          <TouchableOpacity
            style={styles.btnSize}
            onPress={() => {
              Linking.openURL('https://www.instagram.com/upds_tarija/?hl=es');
            }}>
            <Image
              source={require('../../assets/instagram.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSize}
            onPress={() => {
              Linking.openURL(
                'https://es-la.facebook.com/universidadprivadadomingosaviotarija/',
              );
            }}>
            <Image
              source={require('../../assets/facebook.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSize}
            onPress={() => {
              Linking.openURL(
                'https://www.youtube.com/@universidadprivadadomingos3411/videos',
              );
            }}>
            <Image
              source={require('../../assets/youtube.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 5,
    padding:5,
    backgroundColor:'#0c0c0c'
  },
  productImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'normal',
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: '#1c273d',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconFonts: {
    fontWeight: 'normal',
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 0,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 5,
//   },
//   productImg: {
//     width: 250,
//     height: 250,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 28,
//     color: '#696969',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   description: {
//     textAlign: 'center',
//     marginTop: 10,
//     color: '#696969',
//   },
//   btnSize: {
//     height: 40,
//     width: 40,
//     borderRadius: 40,
//     borderColor: '#778899',
//     borderWidth: 1,
//     marginHorizontal: 3,
//     backgroundColor: 'white',

//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentSize: {
//     justifyContent: 'center',
//     marginHorizontal: 30,
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   statContainer: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statCount: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color:'gray',
//   },
//   statLabel: {
//     fontSize: 16,
//     color: '#999',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 40,
//     marginTop: 10,
//   },
//   iconContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   iconFonts: {
//     color: 'gray',
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginHorizontal: 0,
//   },
// });
