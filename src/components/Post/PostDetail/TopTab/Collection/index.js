import React from "react";
import {View, Text, Image, ImageBackground, Pressable} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';


const TextOfSlideshow = ({type, amountOfSlideshow}) => {
  if(amountOfSlideshow > 3) {
    switch(type) {
      case '0':
        return (
          <View style={styles.backGroundImage}>
            <Text style={styles.text}>+{amountOfSlideshow-3}</Text>
          </View>
        );
      case '1':
        return (
          <View style={styles.backGroundVideo}>
            <Text style={styles.text}>+{amountOfSlideshow-3}</Text>
          </View>
        );
    };
  } else {
    return <View></View>
  }
};

const Collection = ({collec_Sate, item}) => {
  const itemCollec = item.ImageVideo;

  const amountOfSlideshow = itemCollec.length;
  const imgHeigh = amountOfSlideshow===1 ? 100 : 50;
  const imgWidth = amountOfSlideshow===2 ? 100 : 50;

  const Slideshow = ({type, url, pos}) => {
    if(pos==='2') {
      switch(type) {
        case '0':
          return (
            <ImageBackground style={{height: '100%', width: '100%'}} source={{uri: url}}>
              <TextOfSlideshow type={type} amountOfSlideshow={amountOfSlideshow}/>
            </ImageBackground>
          );
        case '1':
          return (
            <>
              <Video style={{height: '100%', width: '100%'}} source={{uri: url}} />
              <TextOfSlideshow type={type} amountOfSlideshow={amountOfSlideshow}/>
            </>
          );
      };
    } else {
      switch(type) {
        case '0':
          return (
            <Image style={{height: '100%', width: '100%'}} source={{uri: url}} />
          );
        case '1':
          return (
            <Video style={{height: '100%', width: '100%'}} source={{uri: url}} />
          );
      };
    }
  };

  const navigation = useNavigation();

  const inPostDetail = () => {
    navigation.navigate('PostDetail', {item: item});
  };

  // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
  // https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4

  return (
    !collec_Sate ? 
    <Pressable onPress={() => inPostDetail()} style={styles.page}>
      <View style={{height: `${imgHeigh}%`, width: '100%'}}>
        <Slideshow type={itemCollec[0].Type} url={itemCollec[0].URL} pos={'0'} />
      </View>
      <View style={{height: `${100-imgHeigh}%`, width: '100%', flexDirection: 'row'}}>
        <View style={{height: '100%', width: `${imgWidth}%`}}>
          <Slideshow type={itemCollec[1].Type} url={itemCollec[1].URL} pos={'1'} />
        </View>
        <View style={{height: '100%', width: `${100-imgWidth}%`}}>
          <Slideshow type={itemCollec[2].Type} url={itemCollec[2].URL} pos={'2'} />
        </View>
      </View>
    </Pressable>:
    <View></View>
  );
};

export default Collection;