import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import HomeIcon from '@/components/icons/tabs/HomeIcon';
import NewOrderIcon from '@/components/icons/tabs/NewOrderIcon';
import NotificationsIcon from '@/components/icons/tabs/NotificationsIcon';
import OrdersIcon from '@/components/icons/tabs/OrdersIcon';
import ProfileIcon from '@/components/icons/tabs/ProfileIcon';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export default function TabLayout() {
  const { t } = useTranslation();

  const baseOptions = {
    tabBarActiveTintColor: Colors.brand.primary,
    tabBarButton: HapticTab,
    tabBarLabelStyle: Typography.tabLabel,
    headerShown: false,
    tabBarStyle: Platform.select({
      ios: {
        // Use a transparent background on iOS to show the blur effect
        position: 'absolute' as const,
        backgroundColor: Colors.background.white,
      },
      default: {
        backgroundColor: Colors.background.white,
      },
    }),
  };

  const screenOptions = TabBarBackground
    ? { ...baseOptions, tabBarBackground: TabBarBackground }
    : baseOptions;

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name='index'
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          title: t('tabs.orders'),
          tabBarIcon: ({ focused }) => <OrdersIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='new-order'
        options={{
          title: t('tabs.newOrder'),
          tabBarIcon: ({ focused }) => <NewOrderIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          title: t('tabs.notifications'),
          tabBarIcon: ({ focused }) => <NotificationsIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
