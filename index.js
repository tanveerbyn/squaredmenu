import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';// Req
import messaging from '@react-native-firebase/messaging';


// // Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     // showIosNotification('title', "body");
//     console.log('remoteMessage', remoteMessage)
//     // const { message } = remoteMessage.data;
//     if (remoteMessage.notification) {
//         const { body, title } = remoteMessage.notification;
//         Platform.OS === 'android' ? showAndroidNotification(title, body) : showIosNotification(title, body);
//     } else if (remoteMessage.data) {
//         const { body, title } = remoteMessage.data;
//         Platform.OS === 'android' ? showAndroidNotification(title, body) :showIosNotification(title, body);
//     }
// });

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));