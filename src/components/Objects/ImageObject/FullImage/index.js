import React, {memo}  from 'react';
import {View, ImageBackground} from 'react-native';
import styles from './styles';

import ObjectInfor from '../../ObjectInfor';


const FullImage = ({item, onRender}) => {
    return (
        <View style={styles.page}>
            {
                onRender?
                <ImageBackground style={styles.image} source={{uri: item.URL}}>
                    <ObjectInfor item={item}/>
                </ImageBackground>:
                <View></View>
            }           
        </View>
    );
};

export default memo(FullImage);