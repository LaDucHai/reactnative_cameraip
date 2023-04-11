import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import styles from './styles';
import {SERVERIP} from '../../components/constant';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import {useNavigation, useRoute} from '@react-navigation/core';



const Login = () => {
    const [textInputAccount, setTextInputAccount] = useState('');
    const [textInputPassword, setTextInputPassword] = useState('');

    const navigation = useNavigation();
    const route = useRoute();

    const inExit = () => {
        navigation.pop(); // OR navigation.goBack();
    }
    
    const inLogin = () => {
        axios.get(`${SERVERIP}/login?account=${textInputAccount}&password=${textInputPassword}`)
        .then(res => {
            if(res.data.authentication) {
                AsyncStorage.setItem('tokenLogin', res.data.token, () => {
                    RNRestart.Restart();
                });
            } else {
                console.warn('Account or Password is NOT exact')
            }
        }).catch(err => console.error(err));
    };

    return (
        <View style={styles.page}>
            <View style={styles.viewInput}>
                <TextInput 
                    placeholder='Account'
                    value={textInputAccount}
                    onChangeText={(data) => setTextInputAccount(data)}
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                />
                <TextInput 
                    placeholder='Password'
                    value={textInputPassword}
                    onChangeText={(data) => setTextInputPassword(data)}
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                />
            </View>
            <View style={styles.viewPress}>
                <Pressable onPress={() => inLogin()} style={styles.press}>
                    <Text style={styles.text}>Login</Text>
                </Pressable>
                <Pressable onPress={() => inExit()} style={styles.press}>
                    <Text style={styles.text}>Exit</Text>
                </Pressable>
                <Pressable style={styles.press}>
                    <Text style={styles.text}>Register</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Login;