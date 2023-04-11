import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Dimensions, Animated} from 'react-native';
import styles from './styles';

import {useRoute} from '@react-navigation/core';

import FullImage from './FullImage';
import BackButton from '../../Dialogs/BackButton';

import {SERVERIP} from '../../constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




const windowHeight = Dimensions.get('window').height;

const renderItem = ({item, index, renderIndex}) => {
    const handleRender = () => {
        if((index===renderIndex)||((index-1)===renderIndex)||((index+1)===renderIndex)) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <View key={index}>
            <FullImage item={item} onRender={handleRender()}/>
        </View>
    )
}

const ImageObject = () => {
    const route = useRoute();
    const id = route?.params?.id;
    const index = route?.params?.index;
    const allData = route?.params?.allData;

    const [renderIndex, setRenderIndex] = useState(index);

    const pageIndex = useRef(1);
    const [data, setData] = useState(allData);

    const maxIndex = Math.floor(index/18+1);
    const page = useRef(maxIndex);
    const pageSize = String(18*page.current);

    // animated
    const imageObjectHeight= useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            imageObjectHeight,
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
            axios.get(`${SERVERIP}/getImageVideoOfProfile?accountId=${id}&type=0&pageIndex=${pageIndex.current}&pageSize=${pageSize}`, {
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
        setRenderIndex(Math.round(layoutIndex));
    };

    return (
        <Animated.View 
            style={[
                styles.page,
                {
                    height: imageObjectHeight
                }                
            ]}
        >
            <FlatList
                data={data}
                keyExtractor={(item, index) => String(index)}
                horizontal={false}
                renderItem={({item, index}) => renderItem({item, index, renderIndex})}
                showsVerticalScrollIndicator={false}
                snapToInterval={windowHeight}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={2}
                initialScrollIndex={index}  
                getItemLayout={getItemLayout}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
            <View>
                <BackButton />
            </View>
        </Animated.View>
    );
};

export default ImageObject;