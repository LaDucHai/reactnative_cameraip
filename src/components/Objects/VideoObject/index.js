import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Dimensions, Animated} from 'react-native';
import styles from './styles';

import {useRoute} from '@react-navigation/core';
import BackButton from '../../Dialogs/BackButton';

import {SERVERIP} from '../../constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FullVideo from './FullVideo';



const windowHeight = Dimensions.get('window').height;

const renderItem = ({item, index, activeVideoIndex}) => {
    const handleRender = () => {
        if((index===activeVideoIndex)||((index-1)===activeVideoIndex)||((index+1)===activeVideoIndex)) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <View key={index}>
            <FullVideo item={item} onRender={handleRender()} onActive={activeVideoIndex===index}/>
        </View>
    )
}

const VideoObject = () => {
    const route = useRoute();
    const id = route?.params?.id;
    const index = route?.params?.index;
    const allData = route?.params?.allData;

    const [activeVideoIndex, setActiveVideoIndex] = useState(index);

    const pageIndex = useRef(1);
    const [data, setData] = useState(allData);

    const maxIndex = Math.floor(index/18+1);
    const page = useRef(maxIndex);
    const pageSize = String(18*page.current);

    // animated
    const videoObjectHeight= useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            videoObjectHeight,
            {
              toValue: windowHeight,
              duration: 500,
              useNativeDriver: false
            }
        ).start();
        return(() => {
            
        });
    },[]);

    const fetchData = () => {
        AsyncStorage.getItem('tokenLogin').then(token => {
            axios.get(`${SERVERIP}/getImageVideoOfProfile?accountId=${id}&type=1&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, 
            }).then(function (res) {          
                const dataArr = res.data;
                setData(currentValue => currentValue.concat(dataArr));
            }).catch(function (error) {
                console.error(error);
            }).then(function () {
                // always executed
            });  
        }); 
    };

    const handleOnEndReached = () => {
        pageIndex.current = pageIndex.current + 1;
        fetchData();
    };

    const getItemLayout = (data, index) => {
        return {length: windowHeight, offset: windowHeight * index, index};
    };

    const handleScroll = (e) => {
        const contentOffset_Y = e.nativeEvent.contentOffset.y;
        const layoutIndex = contentOffset_Y/windowHeight;
        setActiveVideoIndex(Math.round(layoutIndex));
    };

    return (
        <Animated.View 
        style={[
                styles.page,
                {
                    height: videoObjectHeight
                }                
            ]}
        >
            <FlatList
                data={data}
                keyExtractor={(item, index) => String(index)}
                listKey={'VideoObject'}
                horizontal={false}
                renderItem={({item, index}) => renderItem({item, index, activeVideoIndex})}
                showsVerticalScrollIndicator={false}
                snapToInterval={windowHeight}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.5}
                initialScrollIndex={index}  
                getItemLayout={getItemLayout}
                onScroll={(e) => handleScroll(e)}
                scrollEventThrottle={16}
            />
            <View>
                <BackButton />
            </View>
        </Animated.View>
    );
};

export default VideoObject;