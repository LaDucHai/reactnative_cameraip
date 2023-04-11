import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import styles from './styles';

import {inComment} from '../../Redux/CommentRedux';



const CommentDialog = () => {
    const [modalVisible, setModalVisible] = useState(false);

    inComment.subscribe(() => {inComment.getState() === 'inComment' ? setModalVisible(true) : setModalVisible(false)});

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
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.overlay} />   
                <View style={styles.dialog}>
                    <Text>afdgdsfg</Text>
                </View>               
            </Modal>         
        </View>   
    );
};

export default CommentDialog;