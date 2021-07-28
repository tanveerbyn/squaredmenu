import { Platform } from 'react-native';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Clipboard from '@react-native-clipboard/clipboard';
import {ServiceConstant} from './ServiceConstant'



async function check_permission() {
    try {
        let permission = await messaging().hasPermission();
        
        if (permission) {
            get_token();
        } else {
            request_permission();
        }

    }
    catch (e) {

    }

}

async function request_permission() {
    try {
        const permission = await messaging().requestPermission();
        //console.log('permission',permission)
        if (permission) {
            return true;
        }
        else {

        }
    }
    catch (e) {

    }
}

async function get_token() {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('fcm token-----', fcmToken);
        await Clipboard.setString(String(fcmToken));
        ServiceConstant.set_fcm_Token(fcmToken)
    }


}

async function getMessage() {
  
    this.notificationListener = await messaging().onMessage(async (msg) => {
        console.log('msg', msg)
        if (msg.notification) {
            const { body, title } = msg.notification;
            Platform.OS === 'android' ? showAndroidNotification(title, body, msg.notification.android.imageUrl) : showIosNotification(title, body);
        } else if (msg.data) {
            const { body, title } = msg.data;
            console.log('actual message', message)
            Platform.OS === 'android' ? showAndroidNotification(title, body, msg.notification.android.imageUrl) : showIosNotification(title, body);
        }
    })
}

async function showIosNotification(title, body) {

    PushNotificationIOS.presentLocalNotification({
        alertBody: body,
        alertTitle: title,
        alertAction: 'view',
        isSilent: false,

    });
}

async function showAndroidNotification(msgtitle, msgbody, icon) {
    const channel_id = "default_notification_channel_id";
    PushNotification.localNotification({
        channelId : channel_id,
        title: msgtitle,
        message: msgbody,
        priority: "high",
        showWhen: true,
        importance: 'high',




    });
}


function createNotificationChannel() {
    if (Platform.OS == 'android') {
        PushNotification.createChannel(
            {
                channelId: "default_notification_channel_id", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                // playSound: false, // (optional) default: true
                //soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

}

async function Call_Notification() {
    createNotificationChannel();
    request_permission();   
    check_permission();
    getMessage()

}

export { Call_Notification, showAndroidNotification, showIosNotification };
