import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Pressable, View, Alert } from 'react-native';

const getProfileMenuItems = (t: any) => [
  {
    titleKey: 'profile.menu.conditions',
    action: () => {
      router.push('/(tabs)/(profile)/conditions');
    },
  },
  {
    titleKey: 'profile.menu.invoices',
    action: () => {
      router.push('/(tabs)/(profile)/invoices');
    },
  },
  {
    titleKey: 'profile.menu.analytics',
    action: () => {
      router.push('/(tabs)/(profile)/analytics');
    },
  },
  {
    titleKey: 'profile.menu.tariffs',
    action: () => {
      router.push('/(tabs)/(profile)/tariffs');
    },
  },
  {
    titleKey: 'profile.menu.myAddresses',
    action: () => {
      router.push('/(tabs)/(profile)/addresses');
    },
  },
  {
    titleKey: 'profile.menu.settings',
    action: () => {
      router.push('/(tabs)/(profile)/settings');
    },
  },
  {
    titleKey: 'profile.menu.easyAuth',
    action: () => {
      router.push('/(tabs)/(profile)/easy-auth');
    },
  },
  {
    titleKey: 'profile.menu.contact',
    action: () => {
      router.push('/(tabs)/support');
    },
    showBadge: true,
  },
];

export default function ProfileScreen() {
  const { t } = useTranslation();
  const profileMenuItems = getProfileMenuItems(t);

  const handleLogout = () => {
    Alert.alert(t('profile.menu.logout'), 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
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

  const renderMenuItem = (item: any, index: number) => (
    <Pressable key={index} style={styles.menuItem} onPress={item.action}>
      <View style={styles.menuItemContent}>
        <ThemedText style={styles.menuItemTitle}>{t(item.titleKey)}</ThemedText>
        {item.showBadge && (
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <View style={styles.onlineDot} />
              <ThemedText style={styles.badgeText}>{t('profile.contact.online')}</ThemedText>
            </View>
          </View>
        )}
      </View>
      <ThemedText style={styles.menuItemArrow}>›</ThemedText>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>{t('profile.title')}</ThemedText>
        </View>

        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarText}>GM</ThemedText>
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>Gagi Murjikneli</ThemedText>
            <ThemedText style={styles.userEmail}>gagi.murjikneli@gmail.com</ThemedText>
          </View>
        </View>

        <View style={styles.menuSection}>
          {profileMenuItems.map(renderMenuItem)}

          <Pressable style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuItemContent}>
              <ThemedText style={styles.menuItemTitle}>{t('profile.menu.logout')}</ThemedText>
            </View>
            <ThemedText style={styles.menuItemArrow}>›</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#17b26a',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
  menuSection: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#007AFF',
  },
  badgeContainer: {
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d5d7da',
    shadowColor: '#0a0d12',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  onlineDot: {
    width: 6,
    height: 6,
    backgroundColor: '#17b26a',
    borderRadius: 3,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#414651',
  },
});
