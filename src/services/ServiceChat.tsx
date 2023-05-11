import firestore from '@react-native-firebase/firestore';
import {Message} from '../types/typeMessage';
const db = firestore();

export const getChatMessages = async (chatId: string) => {
  if (chatId) {
    const querySnapshot = await db
      .collection('CHATS')
      .doc(chatId)
      .collection('messages')
      .orderBy('date', 'desc')
      .get();
    const messages: Message[] = [];
    querySnapshot.forEach(doc => {
      messages.push({
        id: doc.id,
        message: doc.data().message,
        date: doc.data().date.toDate(),
        isSent: doc.data().isSent,
      });
    });
    return messages;
  }
};

export const sendMessage = async (chatId: string, newMessage: Message) => {
  try {
    await firestore().collection(`CHATS/${chatId}/messages`).add(newMessage);
  } catch (error) {
    // Manejar errores
  }
};


