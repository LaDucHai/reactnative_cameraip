import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles';

import {useNavigation} from '@react-navigation/core';

import BottomTab from '../BottomTab';
import Collection from './Collection';

import Entypo from 'react-native-vector-icons/Entypo';



const TopTab = ({collec_Sate, item}) => {
    const id = item.AccountId;
    const firstName = item.FirstName;
    const lastName = item.LastName;
    const avatar = item.Avatar;
    const topContent = item.TextOverview.Content;

    const navigation = useNavigation();

    const InProfile = () => {
        navigation.navigate('Profile', {
            id: id,
            firstName: firstName,
            lastName: lastName,
            avatar: avatar
        });
    };
   
  return (
    <View style={styles.page}>
        <View style={styles.top}>
            <Pressable onPress={() => InProfile()} style={styles.left}>
                <Image style={styles.avatar} source={{uri: avatar}}/>
                <Text style={styles.username}>{firstName + ' ' + lastName}</Text>
            </Pressable>
            <View style={styles.right}>
                <Entypo name='dots-three-horizontal' size={25}/>
            </View>
        </View>
        <View style={styles.center}>
            <Text style={styles.content}>{topContent}</Text>
            <Collection collec_Sate={collec_Sate} item={item} />
        </View>
        <View style={styles.bottom}>
            <BottomTab />
        </View>
    </View>
  );
};

export default TopTab;