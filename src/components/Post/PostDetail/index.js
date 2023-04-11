import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

import TopTab from './TopTab';
import CenterTab from './CenterTab';
import BottomTab from './BottomTab';
import BackButton from '../../Dialogs/BackButton';

import {useRoute} from '@react-navigation/core';



const PostDetail = () => {
  const collec_Sate = true;

  const route = useRoute();

  const item = route?.params?.item;

  return (
    <View style={styles.page}>
      <TopTab collec_Sate={collec_Sate} item={item}/>
      <FlatList 
        data={item.ImageVideo}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) =>(
          <View style={styles.frame} key={index}>
            <CenterTab item={item} />
            <BottomTab />
          </View>
        )}
      />
      <View>
        <BackButton />
      </View>
    </View>
  );
};

export default PostDetail;