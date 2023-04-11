/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Navigation from './src/navigation/navigation';

import PushNotification, {Importance} from 'react-native-push-notification';
import {firebase_message} from './src/utils/firebase/message';
import axios from 'axios';
import { SERVERIP } from './src/components/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  
  // useEffect(() => {
  //   // requestUserPermission();
  //   // NotificationListner();
  // },[]);
  // AsyncStorage.getItem('tokenLogin').then(token => {
  //   axios.get(`${SERVERIP}/user`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }, 
  //   })
  //   .then(function (res) {
  //     console.log(res.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });  
  // })

  // const pushNotification = () => {
  //   // setTimeout(() => {
  //   //   PushNotification.localNotification({
  //   //     channelId: "201195",
  //   //     title: "setTimeout", // (optional)
  //   //     message: "My Notification Message", // (required)
  //   //   });
  //   // }, 3000);
  //   PushNotification.localNotificationSchedule({
  //     //... You can use all the options from localNotifications
  //     channelId: "201195",
  //     title:'My notification title',
  //     message: "My Notification Message", // (required)
  //     date: new Date(Date.now() + 3 * 1000), // in 60 secs
  //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    
  //     /* Android Only Properties */
  //     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  //   });
  //   console.log('localNotification');
  // }  

  // const createChanel = () => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: "201195", // (required)
  //       channelName: "My channel", // (required)
  //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  //       playSound: false, // (optional) default: true
  //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  //       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //     },
  //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // };

  // const deleteChannel = () => {
  //   PushNotification.getChannels(function (channel_ids) {
  //     for(let i = 0; i < channel_ids.length; i++) {
  //       PushNotification.deleteChannel(channel_ids[i]);
  //     }
  //   });
  //   console.log('delete channel')
  // };

  // const getChannels = () => {
  //   PushNotification.getChannels(function (channel_ids) {
  //     console.log(channel_ids); // ['channel_id_1']
  //   });
  // };

  // const arr = []
  //   PushNotification.getScheduledLocalNotifications(notifications => {
  //     for(let i = 0; i < notifications.length; i++) {
  //       arr.push(notifications[i].id);
  //       // console.log(notifications[i].id);
  //     }
  //   });

  // const removeAllDeliveredNotifications = () => {
  //   // PushNotification.removeAllDeliveredNotifications();
  //   // console.log('removeAllDeliveredNotifications');
    
  //   console.log(arr);
  //   PushNotification.removeDeliveredNotifications(arr);
  //   PushNotification.cancelAllLocalNotifications()
  //   PushNotification.removeAllDeliveredNotifications();
  // };

  // const getDeliveredNotifications = () => {
  //   // PushNotification.getDeliveredNotifications((notifications) => {
  //   //   console.log(notifications);
  //   // });
  //   PushNotification.getScheduledLocalNotifications(notifications => {
  //     console.log(notifications);
  //   });
  // };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </>
  );
};

export default App;
