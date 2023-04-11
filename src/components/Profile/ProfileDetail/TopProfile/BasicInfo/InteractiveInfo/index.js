import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';


const InteractiveInfo = ({item}) => {
    const InDetailInteractiveInfo = () => {
        console.log('InDetailInteractiveInfo', item.text);
    };
    return (
        <Pressable onPress={() => InDetailInteractiveInfo()} style={styles.page}>
            <Text>{item.amount}</Text>
            <View style={styles.textView}>
                <Text>{item.text}</Text>
            </View>
        </Pressable>
);
};

export default InteractiveInfo;