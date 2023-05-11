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
} from 'react-native';
import {Notice} from '../types/typeNotice';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigator/NavigatorHome';
import {globalColors} from '../theme/appTheme';
// import Share from 'react-native-share';
import {Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  route: RouteProp<RootStackParamList, 'NoticeDetail'>;
  navigation: StackNavigationProp<RootStackParamList, 'NoticeDetail'>;
};
export const NoticeDetail: React.FC<Props> = ({route, navigation}) => {
  const {notice} = route.params;
  const [like,setLike] = useState(notice.like);
  const clickEventListener = async () => {
    //regresar
  };

  const checkIfLiked = async (): Promise<boolean> => {
    const liked = await AsyncStorage.getItem(`Noticia_${notice.id}`);
    return liked === 'true';
  };
  const likeNotice = async () => {
    const liked = await checkIfLiked();
    const increment = liked ? -1 : 1;
    const noticiaRef = firestore().collection('Noticia').doc(notice.id);
    noticiaRef
      .update({
        like: firestore.FieldValue.increment(increment),
      })
      .then(async () => {
        await AsyncStorage.setItem(`Noticia_${notice.id}`, (!liked).toString());
        setLike(like+increment);
      })
      .catch(error => {
        console.log('Error al incrementar like:', error);
      });
  };

  const shareNotice = async () => {
    try {
      const result = await Share.share({
        message: notice.texto,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
      console.log('error');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', marginHorizontal: 30}}>
          <Image style={styles.productImg} source={{uri: notice.imagen}} />
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={likeNotice}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/like.png')}
                />
              </TouchableOpacity>
              <Text style={styles.iconFonts}>Me gusta</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={shareNotice}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/share.png')}
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
          {/* <View style={styles.statContainer}>
            <Text style={styles.statCount}>{notice.categoria}</Text>
            <Text style={styles.statLabel}>Categoria</Text>
          </View> */}
        </View>
        <View style={styles.contentSize}>
          <TouchableOpacity style={styles.btnSize}>
            <Image
              source={require('../../assets/instagram.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Image
              source={require('../../assets/facebook.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Image
              source={require('../../assets/youtube.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnSize}>
            <Text>{notice.like.toString()}</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.separator}></View>
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => clickEventListener()}>
            <Text style={styles.backButtonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

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
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  backButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: globalColors.fourth,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
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
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
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
    color: 'gray',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 0,
    

    borderRadius: 5,
    borderColor: '#778899',
    // borderWidth: 1,
    backgroundColor:globalColors.fourth
  },
});
