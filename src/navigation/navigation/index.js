import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NavigationBottom from '../navigationBottom';
import Profile from '../../screens/Profile';
import PostDetail from '../../components/Post/PostDetail';
import Login from '../../screens/Login';
import FullImage from '../../components/Objects/ImageObject/FullImage';
import ImageObject from '../../components/Objects/ImageObject';
import VideoObject from '../../components/Objects/VideoObject';
import ImageVideoDetail from '../../components/AddPost/NormalPost/ImageVideoContainer/ImageVideoDetail';
import Camera from '../../components/AddPost/NormalPost/Camera';
import CameraIpObject from '../../components/Objects/CameraIpObject';



const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name='NavigationBottom' component={NavigationBottom}/>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='PostDetail' component={PostDetail}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='FullImage' component={FullImage}/>
            <Stack.Screen name='ImageObject' component={ImageObject}/>
            <Stack.Screen name='VideoObject' component={VideoObject}/>
            <Stack.Screen name='ImageVideoDetail' component={ImageVideoDetail}/>
            <Stack.Screen name='Camera' component={Camera}/>
            <Stack.Screen name='CameraIpObject' component={CameraIpObject}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;