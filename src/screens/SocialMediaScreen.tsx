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
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors } from '../theme/appTheme';
// import VideoPlayer from 'react-native-video-player';

import YoutubeIframe from 'react-native-youtube-iframe';
import { FullWindowOverlay } from 'react-native-screens';

const facebookList = [
  {
    id: '1',
    image: require('../../assets/updsfacebook.jpeg'),
  },
  {
    id: '2',
    image: require('../../assets/inicioclases.jpeg'),
  },
  {
    id: '3',
    image: require('../../assets/inscribete.jpeg'),
  },
  {
    id: '4',
    image: require('../../assets/programa.jpeg'),
  },
  {
    id: '5',
    image: require('../../assets/inscribete.jpeg'),
  },
  {
    id: '6',
    image: require('../../assets/programa.jpeg'),
  },
];


const dimensionForScreen = Dimensions.get('screen');

export const SocialMediaScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={styles.titleNotice}>REDES SOCIALES</Text>
        </View>
        <View style={styles.container}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/facebook.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ fontWeight: 'bold' }}>Facebook</Text>
            </View>
            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('../../assets/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{ fontSize: 11, marginLeft: 5 }}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </Text>
                    <Image source={item.image} style={styles.imageContainer} />
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 5,
                        }}>
                        <Icon name="thumb-up-off-alt" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Conpartir
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/instagram.png')}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ fontWeight: 'bold' }}>Instagram</Text>
            </View>
            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('../../assets/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{ fontSize: 11, marginLeft: 5 }}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </Text>
                    <Image source={item.image} style={styles.imageContainer} />
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 5,
                        }}>
                        <Icon name="thumb-up-off-alt" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Conpartir
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/youtube.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ fontWeight: 'bold' }}>Youtube</Text>
            </View>


            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('../../assets/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{ fontSize: 11, marginLeft: 5 }}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text numberOfLines={1} style={{ fontSize: 10 }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </Text>

                    <View>
                      <YoutubeIframe
                        height={85}
                        play={false}
                        videoId={'84WIaK3bl_s'}
                        webViewProps={{
                          mediaPlaybackRequiresUserAction: false,
                          allowsInlineMediaPlayback: false,
                          source: {
                            baseUrl: '',
                            html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/84WIaK3bl_s?autoplay=1&controls=2" frameborder="0" allowfullscreen></iframe>`,
                          },
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 5,
                        }}>
                        <Icon name="thumb-up-off-alt" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Conpartir
                        </Text>
                      </View>
                    </View>
                  </View>


                  // <View style={styles.cardContainer}>
                  //       {/* <VideoPlayer
                  //   video={{uri: 'https://www.youtube.com/watch?v=VhOj-LRa8_g'}}
                  //   autoplay={false}
                  //   defaultMuted={true}
                  //   videoWidth={1500}
                  //   videoHeight={1500}
                  //   thumbnail={require('../../assets/updsfacebook.jpeg')}
                  // /> */}
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// para videos de youtube : https://lonelycpp.github.io/react-native-youtube-iframe/install
//pasos: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: 150,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  imagePerfil: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  imageContainer: {
    width: 150,
    height: 100,
  },
  titleNotice: {
    color: globalColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});