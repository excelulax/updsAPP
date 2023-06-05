import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../theme/appTheme';
import YoutubeIframe from 'react-native-youtube-iframe';
import {FullWindowOverlay} from 'react-native-screens';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {VideoPlayer} from '../components/VideoPlayer';
// import { getTopVideos } from '../services/youtube';

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

interface Video {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
  };
}

export const SocialMediaScreen = () => {
  const channelId = '-------------------------';
  const apiKey = '------------------------';

  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`;
        const response = await fetch(url);
        const data = await response.json();
        const videoItems: Video[] = data.items;
        setVideos(videoItems);
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      }
    }
    fetchVideos();
  }, []);

  const [videoPlayer, setVideoPlayer] = useState(false);
  const handleShowModalVideo = () => {
    setVideoPlayer(true);
  };

  const handleCloseModalVideo = () => {
    setVideoPlayer(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}>
      <VideoPlayer
        title={selectedVideo?.id.videoId||'_'}
        visible={videoPlayer}
        onClose={handleCloseModalVideo}
      />
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
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* YOUTUBE */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/youtube.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={{fontWeight: 'bold'}}>YouTube</Text>
            </View>

            {videos != undefined && videos.length > 0 ? (
              <FlatList
                data={videos}
                keyExtractor={item => item.id.videoId}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <View style={styles.cardContainer}>
                      <View style={styles.cardHeader}>
                        <Image
                          source={require('../../assets/updsfacebook.jpeg')}
                          style={styles.imagePerfil}
                        />
                        <Text style={{fontSize: 11, marginLeft: 5}}>
                          {item.snippet.channelTitle}
                        </Text>
                      </View>
                      <Text style={{fontSize: 10}}>{item.snippet.title}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedVideo(item);
                          setVideoPlayer(true);
                        }}>
                        <Image
                          source={{uri: item.snippet.thumbnails.default.url}}
                          style={styles.imageContainer}
                        />
                      </TouchableOpacity>
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
                          <Icon
                            name="thumb-up-off-alt"
                            size={16}
                            color="#4267B2"
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'bold',
                              marginLeft: 5,
                            }}>
                            Me gusta
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="share" size={16} color="#4267B2" />
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'bold',
                              marginLeft: 5,
                            }}>
                            Compartir
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Image
                  source={require('../../assets/erroryoutube.png')}
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>No hay videos disponibles.</Text>
              </View>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* FACEBOOK */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/facebook.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={{fontWeight: 'bold'}}>Facebook</Text>
            </View>
            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('../../assets/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{fontSize: 11, marginLeft: 5}}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text style={{fontSize: 10}}>
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
                        <Icon
                          name="thumb-up-off-alt"
                          size={16}
                          color="#4267B2"
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* INSTAGRAM */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/instagram.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{fontWeight: 'bold'}}>Instagram</Text>
            </View>
            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('../../assets/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{fontSize: 11, marginLeft: 5}}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text style={{fontSize: 10}}>
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
                        <Icon
                          name="thumb-up-off-alt"
                          size={16}
                          color="#4267B2"
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/youtube.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={{fontWeight: 'bold'}}>Youtube</Text>
            </View>

            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('../../assets/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{fontSize: 11, marginLeft: 5}}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 10}}>
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
                        <Icon
                          name="thumb-up-off-alt"
                          size={16}
                          color="#4267B2"
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
            /> */}
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
  // VIDEO MODAL
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoContainer: {
    width: '80%',
    aspectRatio: 16 / 9,
    backgroundColor: 'transparent',
  },
  // LISTA DE VIDEOS NO DISPONIBLE
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
