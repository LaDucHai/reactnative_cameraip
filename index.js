/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//socket.io-client
// import {io} from 'socket.io-client';
// const socketio = io('http://192.168.1.20:3001');
// socketio.on('connect', () => {
//   socketio.on('test', data => {
//     console.log(data);
//   })
// });
// import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);
//   },
//   requestPermissions: Platform.OS === 'ios'
// })

import {firebase_message} from './src/utils/firebase/message';
// Register background handler
firebase_message.setBackgroundMessageHandler();




AppRegistry.registerComponent(appName, () => App);
