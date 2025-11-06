import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import HomeIcon from '@/components/icons/tabs/HomeIcon';
import NewOrderIcon from '@/components/icons/tabs/NewOrderIcon';
import NotificationsIcon from '@/components/icons/tabs/NotificationsIcon';
import OrdersIcon from '@/components/icons/tabs/OrdersIcon';
import ProfileIcon from '@/components/icons/tabs/ProfileIcon';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export default function TabLayout() {
  const { t } = useTranslation();

  const baseOptions = {
    tabBarActiveTintColor: Colors.brand.primary,
    tabBarInactiveTintColor: Colors.text.secondary,
    tabBarButton: HapticTab,
    headerShown: false,
    tabBarStyle: Platform.select({
      ios: {
        position: 'absolute' as const,
        backgroundColor: Colors.background.white,
      },
      default: {
        backgroundColor: Colors.background.white,
      },
    }),
  };

  // Custom label component that respects the tint color
  const TabLabel = ({ focused, children }: { focused: boolean; children: string }) => (
    <Text style={[Typography.tabLabel, focused && Typography.activeTabLabel]}>{children}</Text>
  );

  return (
    <Tabs screenOptions={baseOptions}>
      <Tabs.Screen
        name='index'
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          tabBarLabel: ({ focused, children }) => <TabLabel focused={focused}>{children}</TabLabel>,
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          title: t('tabs.orders'),
          tabBarIcon: ({ focused }) => <OrdersIcon focused={focused} />,
          tabBarLabel: ({ focused, children }) => <TabLabel focused={focused}>{children}</TabLabel>,
        }}
      />
      <Tabs.Screen
        name='new-order'
        options={{
          title: t('tabs.newOrder'),
          tabBarIcon: ({ focused }) => <NewOrderIcon focused={focused} />,
          tabBarLabel: ({ focused, children }) => <TabLabel focused={focused}>{children}</TabLabel>,
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          title: t('tabs.notifications'),
          tabBarIcon: ({ focused }) => <NotificationsIcon focused={focused} />,
          tabBarLabel: ({ focused, children }) => <TabLabel focused={focused}>{children}</TabLabel>,
        }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
          tabBarLabel: ({ focused, children }) => <TabLabel focused={focused}>{children}</TabLabel>,
        }}
      />
    </Tabs>
  );
}
