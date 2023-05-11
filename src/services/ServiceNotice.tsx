import firestore from '@react-native-firebase/firestore';
import { Notice } from '../types/typeNotice';
import { DocumentSnapshot } from 'firebase/firestore';
const db = firestore();

export const getNoticias = async () => {
    const data = db.collection('Noticia');
    const snapshot = await data.get();

    const valores: Notice[] = snapshot.docs.map(doc => ({
        id: doc.id,
        categoria: doc.data().categoria,
        fecha: doc.data().fecha,
        imagen: doc.data().imagen,
        like: doc.data().like,
        pie: doc.data().pie,
        prioridad: doc.data().prioridad,
        texto: doc.data().texto,
        titulo: doc.data().titulo,
        url: doc.data().url
    }));
    return valores;
}

export const getPaginatedNotice = async (len:number) => {

    const snapshot = await db.collection('Noticia').orderBy('fecha', 'asc').limit(len+5).get();

    const valores: Notice[] = snapshot.docs.map(doc => ({
        id: doc.id,
        categoria: doc.data().categoria,
        fecha: doc.data().fecha,
        imagen: doc.data().imagen,
        like: doc.data().like,
        pie: doc.data().pie,
        prioridad: doc.data().prioridad,
        texto: doc.data().texto,
        titulo: doc.data().titulo,
        url: doc.data().url
    }));
    return valores;
}
