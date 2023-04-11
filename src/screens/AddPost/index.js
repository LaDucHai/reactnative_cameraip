import React from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';

import NormalPost from '../../components/AddPost/NormalPost';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';


const AddPost = () => {
  return (
    <View style={[styles.page, {height: Dimensions.get('window').height - useBottomTabBarHeight()}]}>
      <NormalPost />
    </View>
  );
};

export default AddPost;