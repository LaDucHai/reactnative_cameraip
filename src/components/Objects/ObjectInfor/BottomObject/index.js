import React from 'react';
import {View} from 'react-native';
import styles from './styles';

import BottomLeftObject from './BottomLeftObject';
import BottomRightObject from './BottomRightObject';


const BottomObject = ({item}) => {
    return (
        <View style={styles.page}>
            <BottomLeftObject item={item}/>
            <BottomRightObject item={item}/>
        </View>
    );
};

export default BottomObject;