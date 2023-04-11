import React, {memo} from 'react';
import {View, Pressable, useWindowDimensions, Image} from 'react-native';
import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';



const VideoObj = ({id, item, onIndex, onAllData}) => {
    const size = useWindowDimensions();
    const navigation = useNavigation();
    const data = item.data;

    const VideoWatch = () => {
        navigation.navigate('VideoObject', {
            id: id,
            allData: onAllData(),
            index: onIndex
        });
    };

    return (
        <View style={styles.page}>
            <Pressable onPress={() => VideoWatch()}>
                <Image 
                    style={[styles.image, {width: size.width/3}]} 
                    source={{uri: data.URL_ThumbnailVideo}} 
                />
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Ionicons name='play' size={50} color={'white'}/>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default memo(VideoObj);