import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Dimensions } from 'react-native';
import { Banner } from '../types/typeBanner';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ImageSliderProps {
  banner: Banner[];
}

export const ImageSlider = ({ banner }: ImageSliderProps) => {
  const openUrl = async (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        style={{width:'100%'}}
      >
        {banner.map((item) => (
          <View style={[styles.imageContainer, { width: SCREEN_WIDTH }]} key={item.imagen}>
            <TouchableOpacity onPress={() => openUrl(item.enlace)}>
              <Image style={styles.image} source={{ uri: item.imagen }} resizeMode="stretch"  />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  imageContainer: {
    height: 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});