import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type NotificationCategory = {
  key: string;
  titleKey: string;
  descriptionKey: string;
  channel: string;
  defaultEnabled: boolean;
};

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  {
    key: 'orderUpdates',
    titleKey: 'notificationSettings.orderUpdates',
    descriptionKey: 'notificationSettings.orderUpdatesDesc',
    channel: 'orders',
    defaultEnabled: true,
  },
  {
    key: 'paymentAlerts',
    titleKey: 'notificationSettings.paymentAlerts',
    descriptionKey: 'notificationSettings.paymentAlertsDesc',
    channel: 'payments',
    defaultEnabled: true,
  },
  {
    key: 'promotions',
    titleKey: 'notificationSettings.promotions',
    descriptionKey: 'notificationSettings.promotionsDesc',
    channel: 'promotions',
    defaultEnabled: false,
  },
  {
    key: 'deliveryReminders',
    titleKey: 'notificationSettings.deliveryReminders',
    descriptionKey: 'notificationSettings.deliveryRemindersDesc',
    channel: 'orders',
    defaultEnabled: true,
  },
];

const PREFS_KEY = 'notification_preferences';

export const useNotificationPreferences = () => {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(PREFS_KEY);

      if (stored) {
        setPreferences(JSON.parse(stored));
      } else {
        const defaults: Record<string, boolean> = {};

        NOTIFICATION_CATEGORIES.forEach(cat => {
          defaults[cat.key] = cat.defaultEnabled;
        });

        setPreferences(defaults);
        await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(defaults));
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (key: string, value: boolean) => {
    const updated = { ...preferences, [key]: value };

    setPreferences(updated);
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(updated));
  };

  const setAll = async (value: boolean) => {
    const updated: Record<string, boolean> = {};

    NOTIFICATION_CATEGORIES.forEach(cat => {
      updated[cat.key] = value;
    });

    setPreferences(updated);
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(updated));
  };

  const allEnabled = Object.values(preferences).every(Boolean);

  return {
    preferences,
    loading,
    updatePreference,
    setAll,
    allEnabled,
  };
};
