import React, {useState, useEffect, useCallback, useRef, memo} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SERVERIP} from '../../../../constant';

import VideoBlock from './VideoBlock';




const VideoCollection = ({id, onNestedScroll}) => {
    const [pageIndex, setPageIndex]= useState(1);
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState(false);

    const allData = useRef([]);

    const handleAllData = useCallback(() => {
        return allData.current;
    },[]);

    useEffect(() => {
        fetchData();
        return(() => {
            
        });
    },[pageIndex]);

    const fetchData = () => {
        AsyncStorage.getItem('tokenLogin').then(token => {
            axios.get(`${SERVERIP}/getImageVideoOfProfile?accountId=${id}&type=1&pageIndex=${pageIndex}&pageSize=18`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, 
            }).then(function (res) {          
                const dataArr = res.data;
                allData.current = allData.current.concat(dataArr);

                // look up fetch data
                if(dataArr.length===18) {
                    setNextPage(true);
                }

                // set data
                const largeArr = [];
                for(let i = 0; i < dataArr.length; i++) {
                    if(largeArr.length < 1) {
                        largeArr.push([{data: dataArr[i]}]);
                    } else {
                        const smallArr = largeArr[largeArr.length-1];
                        if(smallArr.length < 3) {
                            smallArr.push({data: dataArr[i]});
                        } else {
                            largeArr.push([{data: dataArr[i]}]);
                        }
                    }
                };
                setData(currentValue => currentValue.concat(largeArr));
            }).catch(function (error) {
                console.error(error);
            }).then(function () {
                // always executed
            });  
        }); 
    };

    const handleScroll = (e) => {
        const contentOffset_Y = e.nativeEvent.contentOffset.y;
        const layoutMeasurement_Height = e.nativeEvent.layoutMeasurement.height;
        const contentSize_Height = e.nativeEvent.contentSize.height;
        const offset_contentSize_Height = Dimensions.get('window').height/4;
        if(((contentOffset_Y+layoutMeasurement_Height)>=(contentSize_Height-offset_contentSize_Height)) && nextPage) {
            setPageIndex(preValue => preValue + 1);
            setNextPage(false);
        }
    };

    return (
        <View style={styles.page}>
            <ScrollView
                onScroll={handleScroll}
                nestedScrollEnabled={onNestedScroll}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => String(index)}
                listKey={'ImageCollection'}
                showsVerticalScrollIndicator={false}
            >
                {
                    data.map((item, index) => (
                        <View key={index}>
                            <VideoBlock id={id} item={item} onIndex={index} onAllData={handleAllData}/>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default memo(VideoCollection);