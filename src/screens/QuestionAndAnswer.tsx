//npm install @react-native-async-storage/async-storage

import React from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import {globalColors} from '../theme/appTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState, useEffect, useRef} from 'react';
import {RefObject} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore, {firebase} from '@react-native-firebase/firestore';
import {getChatMessages, sendMessage} from '../services/ServiceChat';
import {Message} from '../types/typeMessage';
import {ActivityIndicator} from 'react-native';

export const QuestionAndAnswer = () => {
  const [chatID, setChatID] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef: RefObject<FlatList<Message>> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const db = firestore();

  async function getChatId() {
    try {
      const chatId = await AsyncStorage.getItem('chatId');
      const deviceId = await AsyncStorage.getItem('deviceId');
      if (chatId && deviceId) {
        return [chatId, deviceId];
      } else {
        const docRef = await firestore().collection('CHATS').add({});
        const registrationToken = await firebase.messaging().getToken();

        await AsyncStorage.setItem('chatId', docRef.id);
        await AsyncStorage.setItem('deviceId', registrationToken);

        await firestore().collection(`CHATS/${docRef.id}/messages`).add({
          message:
            '¡Hola! Bienvenido al chat de la Universidad UPDS. ¿En qué podemos ayudarte hoy? ¿Tienes alguna pregunta sobre nuestros programas académicos, proceso de admisión o eventos próximos?',
          isSent: false,
          date: firestore.Timestamp.now(),
          device: registrationToken,
          uname: 'UPDS',
        });
        return [docRef.id, registrationToken];
      }
    } catch (error) {
      // Manejar errores
    }
  }
  const showModal=()=>{setIsModalVisible(true)}

  async function loadMessages() {
    const chatsRef = db
      .collection('CHATS')
      .doc(chatID)
      .collection('messages')
      .orderBy('date', 'desc');
    chatsRef.onSnapshot(querySnapshot => {
      const messagesData: Message[] = [];
      querySnapshot.forEach(doc => {
        messagesData.push({
          id: doc.id,
          message: doc.data().message,
          date: doc.data().date.toDate(),
          isSent: doc.data().isSent,
          device: doc.data().device,
          uname: doc.data().uname,
        });
        setMessages(messagesData);
      });
    });
  }

  async function getUsername() {
    AsyncStorage.getItem('username').then(name => {
      if (name) {
        setUsername(name);
        setIsUsernameSet(true);
      } else {
        setIsModalVisible(true);
      }
    });
  }
  const handleSaveUsername = async () => {
    await AsyncStorage.setItem('username', username);
    // setIsUsernameSet(true);
    setIsModalVisible(false);
  };

  useEffect(() => {
    async function initChat() {
      const data = await getChatId();
      if (data) {
        setChatID(data[0]);
        setDeviceID(data[1]);
      }
    }
    initChat();
    getUsername();
  }, []);

  useEffect(() => {
    loadMessages();
    console.log(chatID);
  }, [chatID]);

  const send = async () => {
    if (message.trim() !== '') {
      setIsLoading(true);
      const newMessage: Message = {
        id: '0',
        message: message.trim(),
        isSent: true,
        date: firestore.Timestamp.now(),
        device: deviceID,
        uname: username,
      };
      setMessage('');
      await sendMessage(chatID, newMessage);
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      {/* {!isUsernameSet && ( */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Por favor ingrese su nombre:</Text>
              <TextInput
                style={styles.nameInput}
                value={username}
                onChangeText={setUsername}
              />
              <Button title="Guardar" onPress={handleSaveUsername} />
            </View>
          </View>
        </Modal>
      {/* )} */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={styles.titleFaq}>UPDS RESPONDE</Text>
      </View>
      <FlatList
        inverted
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              styles.itemContainer,
              item.isSent ? styles.sentContainer : styles.receivedContainer,
            ]}>
            {!item.isSent && (
              <Image
                source={require('../../assets/updsfacebook.jpeg')}
                style={styles.avatar}
              />
            )}
            <View
              style={[
                styles.contentContainer,
                item.isSent ? styles.sentContent : styles.receivedContent,
              ]}>
              <View
                style={[
                  styles.messageContainer,
                  item.isSent ? styles.sentMessage : styles.receivedMessage,
                ]}>
                <Text style={styles.title}>{item.uname}</Text>
                <Text style={styles.description}>{item.message}</Text>
              </View>
            </View>
            {item.isSent && (
              <View
                style={{
                  borderRadius: 50,
                  overflow: 'hidden',
                  marginHorizontal: 0,
                }}>
                <TouchableOpacity onPress={showModal}>
                  <Image
                    source={{
                      uri: 'https://www.bootdey.com/img/Content/avatar/avatar7.png',
                    }}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            marginRight: 10,
          }}
          placeholderTextColor="#b3b3b3"
          placeholder="Escribe un mensaje"
          multiline={true}
          onChangeText={msg => setMessage(msg)}
          blurOnSubmit={false}
          value={message}
          returnKeyType="send"
        />
        <View
          style={{
            borderRadius: 50,
            overflow: 'hidden',
            marginHorizontal: 0,
          }}>
          <TouchableOpacity onPress={send} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={globalColors.primary}
                style={{width: 40, height: 40, marginHorizontal: 10}}
              />
            ) : (
              <Image
                source={require('../../assets/send.png')}
                style={{width: 40, height: 40, marginHorizontal: 10}}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  sentContainer: {
    justifyContent: 'flex-end',
  },
  receivedContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  sentContent: {
    alignItems: 'flex-end',
  },
  receivedContent: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    // color:'#000'
    color:'#343541'
  },
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sentMessage: {
    backgroundColor: globalColors.secondary,
  },
  receivedMessage: {
    backgroundColor: globalColors.fourth,
  },
  titleFaq: {
    color: globalColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  nameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

// import React from 'react';
// import {View, Text, Image, Button, FlatList, StyleSheet} from 'react-native';

// // https://www.rnexamples.com/react-native-examples/b7/Timeline-with-tile-description-image-and-dynamic-buttons
// // https://www.rnexamples.com/react-native-examples/X/Chat-view-ui-example

// interface Item {
//     id: number;
//     avatar: string;
//     title: string;
//     description: string;
//     image?: string;
//     buttons: {
//       title: string;
//       onPress: () => void;
//     }[];
//   }

//   export const QuestionAndAnswer = () => {
//     const items = [
//         {
//           id: 1,
//           avatar: 'https://www.bootdey.com/img/Content/avatar/avatar7.png',
//           title: 'Item 1',
//           description: 'Description for item 1',
//           image: 'https://www.bootdey.com/image/280x280/00FFFF/000000',
//           buttons: [
//             {
//               title: 'Button 1',
//               onPress: () => {},
//             },
//             {
//               title: 'Button 2',
//               onPress: () => {},
//             },
//           ],
//         },
//         {
//           id: 2,
//           avatar: 'https://www.bootdey.com/img/Content/avatar/avatar2.png',
//           title: 'Item 1',
//           description: 'Description for item 1',
//           image: 'https://www.bootdey.com/image/280x280/FF1493/000000',
//           buttons: [
//             {
//               title: 'Button 1',
//               onPress: () => {},
//             },
//             {
//               title: 'Button 2',
//               onPress: () => {},
//             },
//           ],
//         },
//         {
//           id: 3,
//           avatar: 'https://www.bootdey.com/img/Content/avatar/avatar7.png',
//           title: 'Item 1',
//           description: 'Description for item 1',
//           image: 'https://www.bootdey.com/image/280x280/00BFFF/000000',
//           buttons: [
//             {
//               title: 'Button 1',
//               onPress: () => {},
//             },
//             {
//               title: 'Button 2',
//               onPress: () => {},
//             },
//           ],
//         },
//         {
//           id: 4,
//           avatar: 'https://www.bootdey.com/img/Content/avatar/avatar7.png',
//           title: 'Item 1',
//           description: 'Description for item 1',
//           image: 'https://www.bootdey.com/image/280x280/00FFFF/000000',
//           buttons: [
//             {
//               title: 'Button 1',
//               onPress: () => {},
//             },
//             {
//               title: 'Button 2',
//               onPress: () => {},
//             },
//           ],
//         }

//       ]

//     return (
//       <FlatList
//         data={items}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Image source={{ uri: item.avatar }} style={styles.avatar} />
//             <View style={styles.contentContainer}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//               {item.image && (
//                 <Image source={{ uri: item.image }} style={styles.image} />
//               )}
//               <View style={styles.buttonContainer}>
//                 {item.buttons.map((button) => (
//                   <Button title={button.title} onPress={button.onPress} />
//                 ))}
//               </View>
//             </View>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     );
//   };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flexDirection: 'row',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingLeft: 20,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 14,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     marginTop: 10,
//     borderRadius: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
// });
