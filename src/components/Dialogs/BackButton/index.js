import React from 'react';
import {View, Pressable} from 'react-native';
import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/core';


const BackButton = () => {
    const navigation = useNavigation();
    const backButton = () => {
        navigation.pop(); // OR navigation.goBack();
    };

    return (
        <View style={styles.page}>
            <Pressable onPress={() => backButton()}>
                <Ionicons name='arrow-back-circle' size={70}/>
            </Pressable> 
        </View>
    );
};

export default BackButton;