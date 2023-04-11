import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import Search from '../../screens/Search';
import AddPost from '../../screens/AddPost';
import Contacts from '../../screens/Contacts';
import MyProfile from '../../screens/MyProfile';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const NavigationBottom = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown : false}}>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({color: string}) => (
            <AntDesign name='home' size={25}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{
          tabBarIcon: ({color: string}) => (
            <AntDesign name='search1' size={25}/>
          ),
        }}
      />
      <Tab.Screen 
        name="AddPost"
        component={AddPost} 
        options={{
          tabBarIcon: ({color: string}) => (
            <Ionicons name='ios-add-circle-outline' size={25}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Contacts"
        component={Contacts} 
        options={{
          tabBarIcon: ({color: string}) => (
            <AntDesign name='message1' size={25}/>
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile" 
        component={MyProfile} 
        options={{
          tabBarIcon: ({color: string}) => (
            <AntDesign name='profile' size={25}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBottom;