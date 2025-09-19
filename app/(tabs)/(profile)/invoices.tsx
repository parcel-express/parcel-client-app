import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import type { TagVariant } from '@/components/ui/Tag';
import { Colors } from '@/constants/Colors';

export type Invoice = {
  id: string;
  title: string;
  body: { label: string; value: string }[];
  status: string;
  statusVariant: TagVariant;
};
export default function InvoicesScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const status = {
    paid: t('profile.invoices.status.paid'),
    partiallyPaid: t('profile.invoices.status.partiallyPaid'),
    pending: t('profile.invoices.status.pending'),
    overdue: t('profile.invoices.status.overdue'),
  };
  const data: Invoice[] = [
    {
      id: '1',
      title: '#1123',
      body: [
        { label: 'Date', value: '2023-10-01' },
        { label: 'Amount', value: '$150.00' },
        { label: 'Amount to be Paid', value: '$0.00' },
      ],
      status: status.paid,
      statusVariant: 'success',
    },
    {
      id: '2',
      title: '#1124',
      body: [
        { label: 'Date', value: '2023-10-15' },
        { label: 'Amount', value: '$200.00' },
        { label: 'Amount to be Paid', value: '$50.00' },
      ],
      status: status.partiallyPaid,
      statusVariant: 'warning',
    },
    {
      id: '3',
      title: '#1125',
      body: [
        { label: 'Date', value: '2023-11-01' },
        { label: 'Amount', value: '$300.00' },
        { label: 'Amount to be Paid', value: '$300.00' },
      ],
      status: status.pending,
      statusVariant: 'warning',
    },
    {
      id: '4',
      title: '#1126',
      body: [
        { label: 'Date', value: '2023-11-10' },
        { label: 'Amount', value: '$400.00' },
        { label: 'Amount to be Paid', value: '$400.00' },
      ],
      status: status.overdue,
      statusVariant: 'danger',
    },
    {
      id: '5',
      title: '#1127',
      body: [
        { label: 'Date', value: '2023-11-20' },
        { label: 'Amount', value: '$250.00' },
        { label: 'Amount to be Paid', value: '$250.00' },
      ],
      status: status.pending,
      statusVariant: 'warning',
    },
    {
      id: '6',
      title: '#1129',
      body: [
        { label: 'Date', value: '2023-12-01' },
        { label: 'Amount', value: '$350.00' },
        { label: 'Amount to be Paid', value: '$350.00' },
      ],
      status: status.pending,
      statusVariant: 'warning',
    },
  ];

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('profile.invoices.title')} hasGoBack />
      <ContentView>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Card variant={'invoices'} data={item} />}
          contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + 18 }]}
        />
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
    gap: 10,
  },
});
