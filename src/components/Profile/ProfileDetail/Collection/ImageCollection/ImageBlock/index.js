import React, {memo} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

import ImageObj from './ImageObj';

const renderItem = ({id, item, index, onIndex_ImageBlock, onAllData}) => {
    const onIndex_renderItem = index;
    return (
        <View key={index}>
            <ImageObj id={id} item={item} onIndex={3*onIndex_ImageBlock+onIndex_renderItem} onAllData={onAllData}/>
        </View>
    )
};

const ImageBlock = ({id, item, onIndex, onAllData}) => {
    const onIndex_ImageBlock = onIndex;
    return (
        <View style={styles.page}>
            <FlatList
                data={item}
                keyExtractor={(item, index) => String(index)}
                listKey={'ImageBlock'}
                horizontal={true}
                renderItem={({item, index}) => renderItem({id, item, index, onIndex_ImageBlock, onAllData})}
            />
        </View>
    );
};

export default memo(ImageBlock);