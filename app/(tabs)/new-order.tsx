import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import ContentView from '@/components/ContentView';
import DropDown from '@/components/DropDown';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

export default function NewOrderScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { t } = useTranslation();

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('notifications.title')} closeButton />
      <ContentView style={[styles.content, { paddingBottom: tabBarHeight + 20 }]}>
        <View style={styles.buttonsContainer}>
          <DropDown />
          <View style={styles.divider} />
          <DropDown />
        </View>

        <Button size='md' variant={'primary'} style={styles.submitButton}>
          გაგრძელება
        </Button>
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
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 12,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_xs,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border.primary,
  },
  submitButton: {
    borderRadius: 14,
  },
});
