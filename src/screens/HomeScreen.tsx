import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TouchableButton } from '../components/TouchableButton';
import { globalColors } from '../theme/appTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


export const HomeScreen = () => {
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}>
      <SafeAreaView
      style={{
        backgroundColor: globalColors.primary,
        paddingTop: StatusBar.currentHeight,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={styles.headher}>
          <Text
            style={{
              ...styles.title,
              fontSize: 20,
            }}>
            Universidad Privada Domingo Savio
          </Text>
          <Text
            style={{
              ...styles.title,
              fontSize: 15,
              marginTop: 5,
            }}>
            Bienvenido
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableButton iconName="location-on" textButton="Ubicacion" />
          <TouchableButton iconName="forum" textButton="Comunicados" />
          <TouchableButton iconName="groups" textButton="Redes Sociales" />
          <TouchableButton
            iconName="device-unknown"
            textButton="Upds Responde"
          />
          <TouchableButton
            iconName="engineering"
            textButton="Test Vocacional"
          />
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  headher: {
    backgroundColor: globalColors.primary,
    width: '100%',
    height: 120,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  title: {
    color: 'white',
  },
});