import React, {memo} from 'react';
import {View} from 'react-native';
import styles from './styles';

import BasicInfo from './BasicInfo';


const TopProfile = () => {
    return (
        <View style={styles.page}>
            <View style={{width: '100%'}}>
                <BasicInfo/>
            </View>
        </View>
    );
};

export default memo(TopProfile);