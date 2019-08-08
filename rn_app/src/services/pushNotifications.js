import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

    onNotification: function(notification) {
     notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    popInitialNotification: true,
    requestPermissions: true,

    });
};

const localNotification = (msg) => {
    PushNotification.localNotification({
      autoCancel: true,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      bigText: "-",
      subText: "-",
      color: "green",
      vibrate: true,
      vibration: 300,
      title: "Title",
      message: msg,
      playSound: true,
      soundName: 'default',
      actions: '["Open", "Dismiss"]'
    });
};

export {
    configure,
    localNotification,
};