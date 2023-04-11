import React from 'react';
import {View, Modal, Pressable} from 'react-native';
import styles from './styles';


const Overlay = ({modalVisible, setModalVisible}) => {
  return (
    <View style={styles.page}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalBackground} />
            <View style={styles.inDialog}></View>
        </Modal>           
    </View>
  );
};

export default Overlay;