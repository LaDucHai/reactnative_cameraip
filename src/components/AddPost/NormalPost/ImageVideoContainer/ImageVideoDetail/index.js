import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';

import {useRoute} from '@react-navigation/core';

import PlayVideo from '../../../../Objects/PlayVideo';


const ImageVideoDetail = () => {
    const route = useRoute();
    const item = route?.params?.item;
    return (
        <View style={styles.page}>
            {
                item.type==='video/mp4'?
                <PlayVideo item={item}/>:
                <Image 
                    source={{uri: item.uri}}
                    style={styles.image}
                />
            }
        </View>
    );
};

export default ImageVideoDetail;