import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import InfoCard from '@/components/ui/InfoCard';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
export type Tariffs = {
  title: string;
  description: string;
  body: { label: string; value: string }[];
};
const TariffListHeader = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.rowGap}>
      <Text style={Typography.textMdBold}>{t('profile.tariffs.orderAcceptanceTitle')}</Text>
      <InfoCard />
      <Text style={Typography.textMdBold}>{t('profile.tariffs.title')}</Text>
    </View>
  );
};
export default function TariffsScreen() {
  const { t } = useTranslation();
  const paddingBottom = useBottomTabBarHeight();
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
      <Header title={t('profile.tariffs.title')} />
      <ContentView style={styles.contentContainer}>
        <FlatList
          data={data}
          ListHeaderComponent={<TariffListHeader />}
          renderItem={({ item }) => <Card variant='tariffs' data={item} />}
          keyExtractor={item => item.title}
          contentContainerStyle={[styles.rowGap, { paddingBottom }]}
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
    padding: 18,
    gap: 24,
  },
  rowGap: {
    gap: 24,
  },
});
