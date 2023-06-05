import React from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

interface MacModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

export const VideoPlayer: React.FC<MacModalProps> = ({
  title,
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
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            {/* <Text style={styles.title}>{title}</Text> */}
            <View style={{borderBottomEndRadius:5, overflow: 'hidden'}}>
              <YoutubeIframe
                height={228}
                play={true}
                videoId={title}
                webViewProps={{
                  mediaPlaybackRequiresUserAction: false,
                  allowsInlineMediaPlayback: false,
                  source: {
                    baseUrl: '',
                    html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${title}?autoplay=1&controls=2" frameborder="0" allowfullscreen></iframe>`,
                  },
                }}
              />
            </View>
          </View>
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
    width: '98%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleBar: {
    height: 30,
    backgroundColor: '#D8503A',
    flexDirection: 'row',
    justifyContent:'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  closeButton: {
    width: 16,
    height: 16,
    borderRadius: 10,
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
    backgroundColor:'black',
    // padding:10
    padding: 1,
    // margin:0
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
