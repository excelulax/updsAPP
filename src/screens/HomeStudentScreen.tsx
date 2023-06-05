import React from 'react';
import {SafeAreaView, StatusBar, Text, View, StyleSheet} from 'react-native';
import {TouchableButton} from '../components/TouchableButton';
import {globalColors} from '../theme/appTheme';
import {ScrollView} from 'react-native-gesture-handler';

export const HomeStudentScreen = () => {
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
            <TouchableButton
              iconName="laptop-mac"
              textButton="Plataformas Aprendizaje"
            />
            <TouchableButton iconName="language" textButton="Updsnet" />
            <TouchableButton
              iconName="library-books"
              textButton="Tutoriales Upds"
            />
            <TouchableButton
              iconName="auto-stories"
              textButton="Bliblioteca UPDS"
            />
            <TouchableButton iconName="table-view" textButton="Proyecciones" />
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
