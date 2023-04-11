import React, {useState, useEffect, memo} from 'react';
import {View, Dimensions, Pressable} from 'react-native';
import styles from './styles';

import Video from 'react-native-video';

import ObjectInfor from '../../ObjectInfor';



const FullVideo = ({item, onRender, onActive}) => {
    const [paused, setPaused] = useState(!onActive);

    const handlePause = () => {
        setPaused(!paused);
    };

    useEffect(() => {
        setPaused(!onActive);
    }, [onActive]);

    return (
        <View style={styles.page}>
            {
                onRender?
                <Pressable onPress={() => handlePause()}>
                    <Video 
                        style={styles.video} 
                        source={{uri: item.URL}}
                        onError={(err) => console.error(err)}
                        paused={paused}
                        repeat={true}
                    />
                    <View style={{position: 'absolute', height: Dimensions.get('window').height}}>
                        <ObjectInfor item={item}/>
                    </View>
                </Pressable>:
                <View></View>
            }   
        </View>
    );
};

export default memo(FullVideo);