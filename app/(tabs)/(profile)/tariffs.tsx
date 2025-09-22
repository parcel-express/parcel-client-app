import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, Text } from 'react-native';

import type { Tariffs } from '@/app/types/cardTypes';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import InfoCard from '@/components/ui/InfoCard';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
const PADDING = 18;
const TariffListHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <Text style={Typography.textMdBold}>{t('profile.tariffs.orderAcceptanceTitle')}</Text>
      <InfoCard />
      <Text style={Typography.textMdBold}>{t('profile.tariffs.title')}</Text>
    </>
  );
};
export default function TariffsScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const paddingBottom = Platform.OS === 'ios' ? tabBarHeight + PADDING : PADDING;
  const data: Tariffs[] = [
    {
      title: 'Tariff 1',
      description: 'Description for Tariff 1',
      body: [
        { label: 'City', value: '$10' },
        { label: 'Region', value: '$12' },
        { label: 'Country', value: '$15' },
        { label: 'Weight up to 1kg', value: '$5' },
        { label: 'Weight up to 5kg', value: '$10' },
        { label: 'Weight up to 10kg', value: '$15' },
      ],
    },
    {
      title: 'Tariff 2',
      description: 'Description for Tariff 2',
      body: [
        { label: 'City', value: '$8' },
        { label: 'Region', value: '$10' },
        { label: 'Country', value: '$12' },
        { label: 'Weight up to 1kg', value: '$4' },
        { label: 'Weight up to 5kg', value: '$8' },
        { label: 'Weight up to 10kg', value: '$12' },
      ],
    },
    {
      title: 'Tariff 3',
      description: 'Description for Tariff 3',
      body: [
        { label: 'City', value: '$12' },
        { label: 'Region', value: '$15' },
        { label: 'Country', value: '$18' },
        { label: 'Weight up to 1kg', value: '$6' },
        { label: 'Weight up to 5kg', value: '$12' },
        { label: 'Weight up to 10kg', value: '$18' },
      ],
    },
  ];

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('profile.tariffs.title')} hasGoBack />
      <ContentView>
        <FlatList
          data={data}
          ListHeaderComponent={<TariffListHeader />}
          ListHeaderComponentStyle={styles.contentContainer}
          renderItem={({ item }) => <Card variant='tariffs' data={item} />}
          keyExtractor={item => item.title}
          contentContainerStyle={[styles.flatListContainer, { paddingBottom }]}
        />
      </ContentView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 24,
  },
  flatListContainer: {
    padding: PADDING,
    gap: 24,
  },
});
