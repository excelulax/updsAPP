import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalColors } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

interface Touchable {
  iconName: string;
  textButton: string;
}

interface Props extends StackScreenProps<any, any> { }

export const TouchableButton = (
  { iconName, textButton }: Touchable,
  { navigation }: Props,
) => {
  const navigator = useNavigation();

  if (textButton === 'Ubicacion') {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            'https://www.360virtualbo.com/tour/educacion/updstarija',
          );
        }}
        style={styles.box}
        activeOpacity={0.8}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Comunicados') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigator.dispatch(
            CommonActions.navigate({
              name: 'NoticeScreen',
            }),
          )
        }
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Redes Sociales') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigator.dispatch(
            CommonActions.navigate({
              name: 'SocialMediaScreen',
            }),
          )
        }
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Upds Responde') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigator.dispatch(
            CommonActions.navigate({
              name: 'AnswerUpdsScreen',
            }),
          )
        }
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Test Vocacional') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigator.dispatch(
            CommonActions.navigate({
              name: 'VocationalTestScreen',
            }),
          )
        }
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Plataformas Aprendizaje') {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://virtual.upds.edu.bo');
        }}
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Updsnet') {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://portal.upds.edu.bo/updsnet');
        }}
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Tutoriales Upds') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigator.dispatch(
            CommonActions.navigate({
              name: 'TutorialScreen',
            }),
          )
        }
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Biblioteca Upds') {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('Bliblioteca UPDS');
        }}
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else if (textButton === 'Proyecciones') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigator.dispatch(
            CommonActions.navigate({
              name: 'ProjectionsScreen',
            }),
          )
        }
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://portal.upds.edu.bo');
        }}
        style={styles.box}
        activeOpacity={0.6}>
        <Text>
          <Icon name={iconName} size={80} color={globalColors.primary} />
        </Text>
        <Text style={{ marginTop: 10 }}>{textButton}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: globalColors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
});
