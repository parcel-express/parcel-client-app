import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import type { Invoice } from '@/app/types/cardTypes';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import InvoicesModal from '@/components/ui/InvoicesModal';
import { Colors } from '@/constants/Colors';

export default function InvoicesScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const [isInfoModalVisible, setInfoModalIsVisible] = React.useState(false);
  const closeInfoModal = () => {
    setInfoModalIsVisible(false);
  };
  const status = {
    paid: t('status.paid'),
    partiallyPaid: t('status.partiallyPaid'),
    pending: t('status.pending'),
    overdue: t('status.overdue'),
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
      <InvoicesModal
        visible={isInfoModalVisible}
        onClose={closeInfoModal}
        title={t('profile.invoices.title')}
      />
      <ContentView>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setInfoModalIsVisible(true)}>
              <Card variant={'invoices'} data={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={[
            styles.content,
            Platform.OS === 'ios' && { paddingBottom: tabBarHeight + 18 },
          ]}
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
