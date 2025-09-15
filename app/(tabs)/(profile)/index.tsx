import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

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
      router.push('/(tabs)/support');
    },
    showBadge: true,
  },
];

export default function ProfileScreen() {
  const { t } = useTranslation();

  const handleLogout = () => {
    Alert.alert(t('profile.menu.logout'), t('profile.logout.confirm'), [
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
      <ThemedView
        style={styles.contentsContainer}
        lightColor={Colors.background.white}
        darkColor={Colors.background.body_dark}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.userInfo}>
              {/* TODO: replace with real data */}
              <ThemedText style={styles.userName}>Gagi Murjikneli</ThemedText>
              <ThemedText style={styles.userEmail}>gagi.murjikneli@gmail.com</ThemedText>
            </View>
          </View>

          <View style={styles.menuSection}>
            {getProfileMenuItems().map(item => (
              <Pressable
                key={item.titleKey}
                style={styles.menuItem}
                onPress={item.action}
                accessibilityRole='button'
                accessibilityLabel={t(item.titleKey)}
                hitSlop={8}
              >
                <View style={styles.menuItemContent}>
                  {<item.iconName />}
                  <ThemedText style={styles.menuItemTitle}>{t(item.titleKey)}</ThemedText>
                </View>
                {item.showBadge && (
                  <View style={styles.badge}>
                    <View style={styles.onlineDot} />
                    <ThemedText style={Typography.textXsMedium}>
                      {t('profile.contact.online')}
                    </ThemedText>
                  </View>
                )}
              </Pressable>
            ))}

            <Pressable
              style={styles.menuItem}
              onPress={handleLogout}
              accessibilityRole='button'
              accessibilityLabel={t('profile.menu.logout')}
              hitSlop={8}
            >
              <View style={styles.menuItemContent}>
                <LogOutIcon />
                <ThemedText style={styles.menuItemTitle}>{t('profile.menu.logout')}</ThemedText>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
    zIndex: 1000,
    marginTop: -20,

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  content: {
    padding: 20,
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
  menuSection: {
    marginBottom: 30,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 17.5,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: Colors.background.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    backgroundColor: Colors.background.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background.successSecondary,
  },
});
