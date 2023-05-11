import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {globalColors} from '../theme/appTheme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const FaqScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={styles.titleFaq}>PREGUNTAS FRECUENTES</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <Item
          title="¿Hasta qué fecha puedo programar mi materia?"
          detail="EL tiempo máximo para programar materia es hasta cuatro días desde que inicia el módulo."
        />
        <Item
          title="¿Cómo puedo programar mi materia?"
          detail="Debe visitar el sitio: portal.upds.edu.bo/updsnet luego deberá ingresar a nuestra plataforma con el usuario de Microsoft office 365."
        />
        <Item
          title="Soy estudiante de la UPDS y deseo reincorporarme"
          detail="El primer paso es consultar con el are de Bienestar Estudiantil, si tuviste algún tipo de beca, posteriormente con tu jefe de Carrera para que te ayude a hacer la proyección de materias que llevaras durante el semestre."
        />
        <Item
          title="¿Cómo puedo congelar mi materia?"
          detail="Debes comunicarte con Registro para presentar un justificativo que avale tu solicitud, por ejemplo: bole de viaje, certificado de baja médica, certificado de viaje de trabajo, etc. Posteriormente debes presentare con del Decano de tu Facultad."
        />
        <Item
          title="Para realizar traspaso de Sede"
          detail="Debes enviar una carta al are de Archivos de la Universidad Privada Domingo Savio sede Tarija solicitando el traspaso de la sede Tarija a otra sede del país."
        />
        <Item
          title="Para realizar convalidación externa (Cuando el estudiante viene de otra universidad)"
          detail={
            '•	Carta de solicitud dirigida a la Universidad Privada Domingo Savio.\n•	Fotocopia simple del carnet de identidad y título de bachiller.\n•	2 ejemplares de certificados de notas originales legalizados.\n•	Programas analíticos legalizados y foliados (fotocopia).\n•	Historial académico legalizado o ficha académica legalizada (fotocopia).\n•	Plan de estudios de la carrera con la carga horaria semestral legalizada.\n•	1 folder amarillo con fastenner y un sobre manila tamaño oficio.\n•	Resolución ministerial de la carrera de la universidad de origen (solo en caso de universidades privadas).'
          }
        />
        <Item
          title="¿Cómo me uno al grupo de WhatsApp de mi materia?"
          detail="El enlace a tu grupo de WhatsApp esta disponible en el curso de tu materia en la plataforma Moodle (virtual.upds.edu.bo)"
        />
        <Item
          title="¿Cómo puedo ver mis notas en la plataforma?"
          detail="Debes ingresar en la pestaña de Calificaciones ubicada en la parte izquierda de la plataforma Moodle"
        />
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  title: string;
  detail: string;
}

function Item({title, detail}: ItemProps) {
  const [open, setopen] = useState(false);
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
  };
  return (
    <TouchableOpacity
      style={[styles.item, !open && {height: 40}]}
      onPress={onPress}
      activeOpacity={1}>
      <Text style={styles.title}>{title}</Text>
      {open && (
        <View>
          <Text>{detail}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  item: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: globalColors.fourth,
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    color: globalColors.primary,
  },
  titleFaq: {
    color: globalColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// import React, { useState,Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
// import { StyleSheet } from 'react-native/Libraries/StyleSheet/StyleSheet';

// export const FaqScreen = () => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const [open, setopen] = useState(false);

//     const SECTIONS = [
//         {
//           title: 'First',
//           content: 'Lorem ipsum...',
//         },
//         {
//           title: 'Second',
//           content: 'Lorem ipsum...',
//         },
//       ];

//     return (
//         <View>
//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 0"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 1"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 2"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>
//         </View>
//     );
// };
