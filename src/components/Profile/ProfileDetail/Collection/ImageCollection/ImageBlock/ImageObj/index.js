import React from 'react';
import {View, Pressable, Image, useWindowDimensions} from 'react-native';
import styles from './styles';

import {useNavigation} from '@react-navigation/core';



const ImageObj = ({id, item, onIndex, onAllData}) => {
    const size = useWindowDimensions();
    const navigation = useNavigation();
    const data = item.data;

    const hnadleImageWatch = () => {
        navigation.navigate('ImageObject', {
            id: id,
            allData: onAllData(),
            index: onIndex
        });
    };

    return (
        <View style={styles.page}>
            <Pressable onPress={() => hnadleImageWatch()}>
                <Image 
                    style={[styles.image, {width:size.width/3}]}
                    source={{uri: data.URL}} 
                />
            </Pressable>
        </View>
    );
};

export default ImageObj;