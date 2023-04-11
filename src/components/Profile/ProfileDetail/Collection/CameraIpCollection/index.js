import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/core';



const CameraIpCollection = ({id, onNestedScroll}) => {
    const navigation = useNavigation();

   
    const intoCameraIp = () => {
        navigation.navigate('CameraIpObject', {id: id});
    };

    return (
        <View>
            <Text>CameraIpCollection</Text>
            <TouchableOpacity onPress={() => intoCameraIp()}>
                <Text>CameraIP</Text>
            </TouchableOpacity>
        </View>
    );
};


export default memo(CameraIpCollection);