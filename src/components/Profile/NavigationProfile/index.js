import React, {memo} from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ImageCollection from '../ProfileDetail/Collection/ImageCollection';
import VideoCollection from '../ProfileDetail/Collection/VideoCollection';
import CameraIpCollection from '../ProfileDetail/Collection/CameraIpCollection';
// import Post from '../../Post';



const Tab = createMaterialTopTabNavigator();

const NavigationProfile = ({id, onNestedScroll}) => {
    return (
        <Tab.Navigator>
            {/* <Tab.Screen name="Post" component={Post} /> */}
            <Tab.Screen name="Image" children={()=><ImageCollection id={id} onNestedScroll={onNestedScroll}/>}/> 
            <Tab.Screen name="Video" children={()=><VideoCollection id={id} onNestedScroll={onNestedScroll}/>} />
            <Tab.Screen name="CameraIp" children={()=><CameraIpCollection id={id} onNestedScroll={onNestedScroll}/>} />
        </Tab.Navigator>
    );
};

export default memo(NavigationProfile);