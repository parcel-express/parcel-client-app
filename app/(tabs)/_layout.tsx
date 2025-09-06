import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const { t } = useTranslation();

  const baseOptions = {
    tabBarActiveTintColor: Colors.light.tint,
    headerShown: false as const,
    tabBarButton: HapticTab,
    tabBarStyle: Platform.select({
      ios: {
        // Use a transparent background on iOS to show the blur effect
        position: 'absolute' as const,
      },
      default: {},
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
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='house.fill' color={color} />,
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          title: t('tabs.orders'),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='list.clipboard.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='new-order'
        options={{
          title: t('tabs.newOrder'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='plus.circle.fill' color={color} />,
        }}
      />
      <Tabs.Screen
        name='support'
        options={{
          title: t('tabs.support'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='bubble.left.fill' color={color} />,
        }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='person.fill' color={color} />,
        }}
      />
    </Tabs>
  );
}
