import React, {useState} from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface TutorialData {
  id: number;
  image: any;
  text: string;
}

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  visible,
  onClose,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselData: TutorialData[] = [
    {
      id: 1,
      image: require('../../assets/tutorial/t1.png'),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iure quia eaque veritatis et nulla, ea laudantium ducimus eveniet! Impedit dolor debitis dignissimos ullam optio beatae officiis animi inventore ab!',
    },
    {
      id: 2,
      image: require('../../assets/tutorial/t2.png'),
      text: 'Indicación 2',
    },
    {
      id: 3,
      image: require('../../assets/tutorial/t3.png'),
      text: 'Indicación 3',
    },
    {
      id: 4,
      image: require('../../assets/tutorial/t4.png'),
      text: 'Indicación 4',
    },
  ];

  const handleNext = () => {
    if (carouselIndex < carouselData.length - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
  };
  const handlePrevious = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };
  const handleFinish = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.carouselContainer}>
          <Image
            source={carouselData[carouselIndex].image}
            style={styles.image}
          />
          <Text style={styles.text}>{carouselData[carouselIndex].text}</Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handlePrevious}>
            <Text style={styles.controlButtonText}>Anterior</Text>
          </TouchableOpacity>
          {carouselIndex < carouselData.length - 1 ? (
            <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
              <Text style={styles.controlButtonText}>Siguiente</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleFinish}>
              <Text style={styles.controlButtonText}>Finalizar</Text>
            </TouchableOpacity>
          )}
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
  carouselContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
    height: '90%',
  },
  image: {
    width: '80%',
    height: '80%',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
    height: 'auto',
  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  controlButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
