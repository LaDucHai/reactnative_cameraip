import React, {memo} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

import Subject from '../TopProfile/Subject';




const subjects = ['Post', 'Image', 'Video', 'Camera'];

const SubjectView = () => {
    return (
        <View style={styles.page}>
            <FlatList
                data={subjects}
                keyExtractor={(item, index) => String(index)}
                horizontal={true}
                renderItem={({item, index}) =>(
                    <Subject key={index} item={item}/>
                )}
                contentContainerStyle = {styles.subjects}
            />   
        </View>
    )
};

export default memo(SubjectView);