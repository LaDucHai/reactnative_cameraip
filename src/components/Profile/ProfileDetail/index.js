import React, {useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import styles from './styles';

import {useRoute} from '@react-navigation/core';

import TopProfile from './TopProfile';
import BackButton from '../../Dialogs/BackButton';
import Header from '../../Dialogs/Header';
import NavigationProfile from '../NavigationProfile';


const header_Height = Dimensions.get('window').height/24;
const windowHeight = Dimensions.get('window').height;

const renderItem = ({item, index, nestedScroll}) => {
    return (
        <View style={{height: windowHeight-header_Height}} key={index}>
            <NavigationProfile id={item} onNestedScroll={nestedScroll}/>
        </View>
    )
};

const ProfileDetail = () => {
    const route = useRoute();
    const id = route?.params?.id; 

    const [nestedScroll, setNestedScroll] = useState(false);

    const handleScroll = (e) => {
        const contentOffset_Y = e.nativeEvent.contentOffset.y;
        const top_Height = windowHeight/2;
        if((contentOffset_Y)>=(top_Height-50)) {
            if(!nestedScroll) {
                setNestedScroll(true);
            }
        } else {
            if(nestedScroll) {
                setNestedScroll(false);
            }
        }
    };

    return (
        <View style={styles.page}>
            <Header/>
            <FlatList
                ListHeaderComponent={
                    <>
                        <TopProfile/>
                    </>
                }
                data={[id]}
                keyExtractor={(item, index) => String(index)}
                listKey={'ProfileDetail'}
                renderItem={({item, index}) => renderItem({item, index, nestedScroll})}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
            <BackButton/>
        </View>
    );
};

export default ProfileDetail;