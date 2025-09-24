import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import BarLineChart from '@/components/icons/BarLineChartIcon';
import FaceIdIcon from '@/components/icons/FaceIdIcon';
import FileIcon from '@/components/icons/FileIcon';
import LogOutIcon from '@/components/icons/LogOutIcon';
import MarkerPinIcon from '@/components/icons/MarkerPinIcon';
import MessageChatCircleIcon from '@/components/icons/MessageChatCircleIcon';
import PieChartIcon from '@/components/icons/PieChartIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';
import TermsIcon from '@/components/icons/TermsIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TabButton from '@/components/ui/TabButton';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

const getProfileMenuItems = () => [
  {
    iconName: TermsIcon,
    titleKey: 'profile.menu.conditions',
    action: () => {
      router.push('/(tabs)/(profile)/conditions');
    },
  },
  {
    iconName: FileIcon,
    titleKey: 'profile.menu.invoices',
    action: () => {
      router.push('/(tabs)/(profile)/invoices');
    },
  },
  {
    iconName: BarLineChart,
    titleKey: 'profile.menu.analytics',
    action: () => {
      router.push('/(tabs)/(profile)/analytics');
    },
  },
  {
    iconName: PieChartIcon,
    titleKey: 'profile.menu.tariffs',
    action: () => {
      router.push('/(tabs)/(profile)/tariffs');
    },
  },
  {
    iconName: MarkerPinIcon,
    titleKey: 'profile.menu.myAddresses',
    action: () => {
      router.push('/(tabs)/(profile)/addresses');
    },
  },
  {
    iconName: SettingsIcon,
    titleKey: 'profile.menu.settings',
    action: () => {
      router.push('/(tabs)/(profile)/settings');
    },
  },
  {
    iconName: FaceIdIcon,
    titleKey: 'profile.menu.easyAuth',
    action: () => {
      router.push('/(tabs)/(profile)/easy-auth');
    },
  },
  {
    iconName: MessageChatCircleIcon,
    titleKey: 'profile.menu.contact',
    action: () => {
      router.push('/(tabs)/notifications');
    },
    showBadge: true,
  },
];

export default function ProfileScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPad = Platform.OS === 'ios' ? tabBarHeight : 0;
  const menuItems = React.useMemo(getProfileMenuItems, []);

  const handleLogout = () => {
    Alert.alert(t('profile.menu.logout'), t('profile.menu.logoutConfirm'), [
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
      {
        text: t('profile.menu.logout'),
        style: 'destructive',
        onPress: () => {
          // TODO: Implement logout logic
          router.replace('/(auth)/login');
        },
      },
    ]);
  };
  return (
    <ThemedView style={styles.container}>
      <Header title={t('tabs.profiletitle')} />
      <ContentView>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}>
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.userInfo}>
              {/* TODO: replace with real data */}
              <ThemedText style={styles.userName}>John Doe</ThemedText>
              <ThemedText style={styles.userEmail}>john.doe@example.com</ThemedText>
            </View>
          </View>

          {menuItems.map(tab => (
            <TabButton key={tab.titleKey} tab={tab} />
          ))}
          <TabButton
            tab={{
              iconName: LogOutIcon,
              titleKey: 'profile.menu.logout',
              action: handleLogout,
            }}
          />
        </ScrollView>
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 0,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    ...Shadows.shadow_xs,
    backgroundColor: Colors.background.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: Colors.border.borderLight,
    backgroundColor: Colors.background.avatar,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.background.white,
    backgroundColor: Colors.background.successSecondary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.text.primary,
  },
  userEmail: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
    color: Colors.text.tertiary,
  },
});
