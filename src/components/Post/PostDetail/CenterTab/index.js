import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import InViewPort from "@coffeebeanslabs/react-native-inviewport";


const ImageVideo = ({item}) => {
  const [paused, setPaused] = useState(true);
  const checkVisible = (isVisible) => {
    if(isVisible){
      if(paused){
        setPaused(false);
      }
    }else{
      if(!paused){
        setPaused(true);
      }
    }
  };
  
  if(item.Type===null) {
    return (
      <View></View>
    )
  } else {
    return (
      item.Type==='0'?
      <Image style={styles.image} source={{uri: item.URL}}/>
      :<InViewPort onChange={(isVisible) => checkVisible(isVisible)}>
        <Video 
          style={styles.video} 
          source={{uri: item.URL}}
          onError={(err) => console.error(err)}
          repeat={true}
          muted={true}
          controls
          paused={paused}
        />
      </InViewPort>
    );
  }
};

// onChange={(isVisible) => checkVisible(isVisible)}

const CenterTab = ({item}) => {
  return (
    <View style={styles.page}>
        <View style={styles.menu}>
            <Text style={styles.time}>time</Text>
            <Entypo name='dots-three-horizontal' size={25}/>
        </View>
        <Text style={styles.content}>{item.Text}</Text>
        <ImageVideo item={item} />
    </View>
  );
};

export default CenterTab;