import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NoticeCard} from '../components/NoticeCard';
import {globalColors} from '../theme/appTheme';

import {getNoticias, getPaginatedNotice} from '../services/ServiceNotice';
import {FlatList, SectionList} from 'react-native';
import {useState, useEffect} from 'react';
import {Notice} from '../types/typeNotice';
import {LoadingNotice} from '../components/LoadingNotice';

import {CommonActions, useNavigation} from '@react-navigation/native';

//npm install deprecated-react-native-prop-types

export const NoticeScreen = () => {
  const [noticias, setNoticias] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);

  const getMore = async () => {
    setLoading(true);
    const data = await getPaginatedNotice(noticias.length);
    setNoticias(data);
    setLoading(false);
  };

  useEffect(() => {
    getMore();
  }, []);

  const navigator = useNavigation();

  const handleNoticePress = (notice_: Notice) => {
    navigator.dispatch(
      CommonActions.navigate('NoticeDetail', {notice: notice_}),
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'black',//modo oscuro
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
      }}>
      <FlatList
        data={noticias}
        onEndReachedThreshold={0}
        onEndReached={getMore}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View
            style={{
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={styles.titleNotice}>COMUNICADOS</Text>
          </View>
        }
        ListFooterComponent={loading ? <LoadingNotice /> : <View />}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleNoticePress(item)}>
            <NoticeCard {...item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerNotice: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleNotice: {
    // color: globalColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    // -
    color: '#2196f3',
    textShadowColor: '#2196f3',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
