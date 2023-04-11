import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SERVERIP} from '../../../../../constant';

const IconContainer = ({item}) => {
    const [toggleLikeColor, setToggleLikeColor] = useState(() => {
        if(item.iconName === 'heart') {
            if(item.likeStatus) {
                return 'red';
            } else {
                return 'white';
            }
        } else {
            return 'white';
        }
    });

    const IconButton = () => {
        console.log('IconContainer')
    };

    const toggleLike = () => {
        AsyncStorage.getItem('tokenLogin').then(token => {
            axios.post(`${SERVERIP}/postImageVideoLike`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    postImageVideoId: item.PostImageVideoId
                }
            }).then(function (res) {
                if(res.data[0].Result === "You have liked") {
                    setToggleLikeColor('red');
                }
                if(res.data[0].Result === "You have deleted like") {
                    setToggleLikeColor('white');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }); 
    };

    return (
        <View style={styles.page}>
            <TouchableWithoutFeedback onPress={() => IconButton()}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name='heart' size={30} color={toggleLikeColor} />
                    <Text style={styles.iconText}>{item.LikeAmount}</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => IconButton()}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name='email' size={30} color={toggleLikeColor} />
                    <Text style={styles.iconText}>{item.SuggestionAmount}</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => IconButton()}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name='chat' size={30} color={toggleLikeColor} />
                    <Text style={styles.iconText}>{item.InboxAmount}</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => IconButton()}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name='comment' size={30} color={toggleLikeColor} />
                    <Text style={styles.iconText}>0</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => IconButton()}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name='share-circle' size={30} color={toggleLikeColor} />
                    <Text style={styles.iconText}>{item.ShareAmount}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default IconContainer;