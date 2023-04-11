import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

import {useNavigation} from '@react-navigation/core';


const MyProfile = () => {
  const navigation = useNavigation();

  const inLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={() => inLogin()} style={styles.btnLogin}>
        <Text>LOGIN</Text>
      </Pressable>
    </View>
  );
};

export default MyProfile;