import React, {useState} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

import {useNavigation} from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {SERVERIP} from '../../../../constant';

import IconContainer from './IconContainer';


const BottomRightObject = ({item}) => {
    const id = item.AccountId;

    const [toggleStatusFollow, setToggleStatusFollow] = useState(item.FollowStatus);

    const navigation = useNavigation();

    const InProfile = () => {
        navigation.navigate('Profile', {
            id: id
        });
    };

    const toggleFollow = () => {
        AsyncStorage.getItem('tokenLogin').then(token => {
            axios.post(`${SERVERIP}/postFollow`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    UnFollowOrFollow: 1, // UnFollowOrFollow = 1, you send a Follow to FollowedUser
                    FollowedUser: id
                }
            }).then(function (res) {
                if(res.data[0].Result === "You have followed") {
                    setToggleStatusFollow(true);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }); 
    };

    const handleFollow = () => {
        toggleFollow();
    };

    return (
        <View style={styles.page}>
            <View style={styles.topRight}>
                <View style={styles.inforBlock}>
                    <TouchableWithoutFeedback onPress={() => InProfile()}>
                        <View style={styles.icon}>
                            <Image style={styles.avatar} source={{uri: item.Avatar}} />
                            {toggleStatusFollow ? <View style={{height: 22}}/>:<MaterialCommunityIcons onPress={() => handleFollow()} name='plus-circle' size={20} color={'red'}/>}
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.inforBlock}>
                        <IconContainer item={item}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BottomRightObject;