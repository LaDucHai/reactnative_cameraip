import React from 'react';
import {View} from 'react-native';
import styles from './styles';

import TopTab from '../PostDetail/TopTab';


const PostOverview = ({item}) => {
  const collec_Sate = false;
  return (
    <View style={styles.page}>
      <TopTab collec_Sate={collec_Sate} item={item}/>
    </View>
  );
};

export default PostOverview;