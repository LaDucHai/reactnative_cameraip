import React, {memo} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

import VideoObj from './VideoObj';

const renderItem = ({id, item, index, onIndex_VideoBlock, onAllData}) => {
    const onIndex_renderItem = index;
    return (
        <View key={index}>
            <VideoObj id={id} item={item} onIndex={3*onIndex_VideoBlock+onIndex_renderItem} onAllData={onAllData}/>
        </View>
    )
};


const VideoBlock = ({id, item, onIndex, onAllData}) => {
    const onIndex_VideoBlock = onIndex;
    return (
        <View style={styles.page}>
            <FlatList
                data={item}
                keyExtractor={(item, index) => String(index)}
                listKey={'VideoBlock'}
                horizontal={true}
                renderItem={({item, index}) => renderItem({id, item, index, onIndex_VideoBlock, onAllData})}
            />
        </View>
    );
};

export default memo(VideoBlock);