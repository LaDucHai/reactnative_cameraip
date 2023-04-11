import React from 'react';
import {View} from 'react-native';
import styles from './styles';

import TopObject from './TopObject';
import BottomObject from './BottomObject';



const ObjectInfor = ({item}) => {
    return (
        <View style={styles.page}>
            <TopObject item={item}/>
            <BottomObject item={item}/>
        </View>
    );
};

export default ObjectInfor;