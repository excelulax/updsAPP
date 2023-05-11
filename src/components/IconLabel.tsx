import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TypeIcon {
    iconName: string;
    textButton: string;
}

export const IconLabel = ({ iconName, textButton }: TypeIcon) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={16} color="white" style={styles.iconStyle} />
            <Text style={styles.labelStyle}>{textButton}</Text>
        </View>
        
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 10,
    },
    labelStyle: {
        fontSize: 12,
        color: 'white',
    },
    iconStyle: {
        marginRight: 2,
    },
});
