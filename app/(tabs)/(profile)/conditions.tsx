import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export default function ConditionsScreen() {
  const { t } = useTranslation();
  const paddingBottom = useBottomTabBarHeight() + 18;
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('profile.conditions.title')} hasGoBack />
      <ContentView>
        <ScrollView
          contentContainerStyle={[styles.content, Platform.OS === 'ios' && { paddingBottom }]}
        >
          <Text style={[Typography.textMdRegular, { color: Colors.text.primary }]}>
            {t('profile.conditions.terms')}
          </Text>
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
    padding: 18,
  },
});
