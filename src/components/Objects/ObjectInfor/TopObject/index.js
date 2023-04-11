import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TopObject = ({item}) => {
    const handleMore = () => {
        console.log('TopObject', 'handleMore');
    };
    return (
        <View style={styles.page}>
            <View>
                <Text style={styles.name}>{`${item.FirstName} ${item.LastName}`}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => handleMore()}>
                <MaterialCommunityIcons name='dots-horizontal' size={35}/>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default TopObject