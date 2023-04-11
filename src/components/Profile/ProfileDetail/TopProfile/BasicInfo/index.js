import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable, FlatList} from 'react-native';
import styles from './styles';

import {useRoute} from '@react-navigation/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InteractiveInfo from './InteractiveInfo';

import {SERVERIP} from '../../../../constant';





const renderItem = ({item, index}) => {
    return <InteractiveInfo key={index} item={item}/>
};

const BasicInfo = () => {
    const route = useRoute();
    const id = route?.params?.id;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState('avatar');

    const [followStatus, setFollowStatus] = useState();
    const [textFollow, setTextFollow] = useState('');
    const [backGroundFollow, setBackGroundFollow] = useState('');
    const [interact, setInteract] = useState([]);
    const [note, setNote] = useState('');

    const ToggleFollow = () => {
        AsyncStorage.getItem('tokenLogin').then(token => {
            axios.post(`${SERVERIP}/postFollow`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    UnFollowOrFollow: followStatus? 0:1, // UnFollowOrFollow = 1, you send a Follow to FollowedUser. UnFollowOrFollow = 0, you send a Un-Follow to FollowedUser
                    FollowedUser: id
                }
            }).then(function (res) {
                if(res.data[0].Result=== 'You have deleted follow') {
                    setFollowStatus(false);
                    setTextFollow('Follow');
                    setBackGroundFollow('red');
                }
                if(res.data[0].Result=== 'You have followed') {
                    setFollowStatus(true);
                    setTextFollow('Un-Follow');
                    setBackGroundFollow('#d1d5d5');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }); 
    };

    useEffect(() => {
        fetchData();
        return(() => {
            setFirstName('');
            setLastName('');
            setAvatar('avatar');
            setTextFollow('');
            setBackGroundFollow('');
            setInteract([]);
            setNote('');
        });
    }, []);

    const fetchData = () => {
        AsyncStorage.getItem('tokenLogin').then(token => {
            axios.get(`${SERVERIP}/getOverviewInformationOfProfile?accountId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, 
            }).then(function (res) {
                const data = res.data[0];
                setFirstName(data.FirstName);
                setLastName(data.LastName);
                setAvatar(data.Avatar);
                setFollowStatus(data.FollowStatus);
                if(data.FollowStatus) {
                    setTextFollow('Un-Follow');
                    setBackGroundFollow('#d1d5d5');
                } else {
                    setTextFollow('Follow');
                    setBackGroundFollow('red');
                }
                setInteract([{amount: data.FollowingAmount, text: 'Following'}, {amount: data.FollowedAmount, text: 'Followed'}, {amount: '1k', text: 'Likes'}]);
                setNote(data.Note);
            }).catch(function (error) {
                console.error(error);
            }).then(function () {
                // always executed
            });  
        }); 
    };

    return (
        <View style={styles.page}>
            <View>
                <Image style={styles.avatar} source={{uri: avatar}} />
            </View>
            <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
            <View style={styles.interactiveInfo}>
                <FlatList
                    data={interact}
                    keyExtractor={(item, index) => String(index)}
                    horizontal={true}
                    renderItem={renderItem}
                />
            </View>
            <Pressable onPress={() => ToggleFollow()} style={{borderRadius: 5, backgroundColor: backGroundFollow, width: '30%', height: '15%'}}>
                <View style={{height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Text>{textFollow}</Text>
                    </View>
                </View>
            </Pressable>
            <Text style={{marginTop: 5}}>{note}</Text>
        </View>
    );
};

export default BasicInfo;