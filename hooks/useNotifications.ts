/* eslint-disable no-console */
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';

import {
  addNotificationReceivedListener,
  addNotificationResponseListener,
  registerForPushNotifications,
} from '../services/notifications';

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotifications().then(token => {
      setExpoPushToken(token);

      if (token) {
        console.log('Expo Push Token:', token);
      }
    });

    notificationListener.current = addNotificationReceivedListener(setNotification);

    responseListener.current = addNotificationResponseListener(response => {
      const data = response.notification.request.content.data;
      console.log('Notification tapped:', data);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return { expoPushToken, notification };
}
