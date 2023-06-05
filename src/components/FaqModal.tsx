

import React from 'react';
import {View, Modal, StyleSheet, Text, ScrollView,TouchableOpacity} from 'react-native';

interface MacModalProps {
  title: string;
  content: string;
  visible: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<MacModalProps> = ({
  title,
  content,
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
      >
      <View style={styles.modalContainer}>
        <View style={styles.windowContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeButtonIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  windowContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleBar: {
    height: 30,
    backgroundColor: '#D8503A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIcon: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});
