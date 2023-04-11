import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


class firebase_message_class {
  constructor(){}

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
  };
  
  async getFCMToken() {
    let fcmtoken  = await AsyncStorage.getItem("fcmtoken");
    if(!fcmtoken) {
      try {
        const fcmtoken = await messaging().getToken();
        if(fcmtoken) {
          await AsyncStorage.setItem("fcmtoken", fcmtoken);
          return fcmtoken;
        }
      } catch (error) {
        console.error(error, "error in fcmtoken")
      }
    } else {
      return fcmtoken;
    }
  };
  
  notificationListner() {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
  
    // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
    messaging().onMessage(async remoteMessage => {
      console.log('notification on froground state ..... ', remoteMessage);
    });
  };

  setBackgroundMessageHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };
}

const firebase_message = new firebase_message_class();
export {firebase_message};