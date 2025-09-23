import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import Calendar from '@/components/Calendar';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import SearchIcon from '@/components/icons/SearchIcon';
import ShortCutIcon from '@/components/icons/ShortCutIcon';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TabSwitcher from '@/components/ui/TabSwitcher';
import { Colors } from '@/constants/Colors';

import { Order } from '../types/cardTypes';
import { Status, StatusOptions, Tab, Tabs } from '../types/orderTypes';

export default function OrdersScreen() {
  const [tab, setTab] = React.useState<Tab>('Ongoing');
  const [status, setStatus] = React.useState<Status | 'status'>('status');
  const bottomtabHeight = useBottomTabBarHeight();
  const paddingBottom = Platform.OS === 'ios' ? bottomtabHeight + 18 : 18;
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => {
      // TO DO: Implement search functionality
    },
  });
  const { t } = useTranslation();
  const options: StatusOptions = [
    {
      label: t('status.status'),
      value: 'status',
    },
    {
      label: t('status.paid'),
      value: 'paid',
    },
    { label: t('status.pending'), value: 'pending' },
    { label: t('status.overdue'), value: 'overdue' },
    { label: t('status.partiallyPaid'), value: 'partiallyPaid' },
  ];
  const tabs: Tabs = [
    { label: `${t('orders.tabs.onGoing')} (25)`, value: 'Ongoing' },
    { label: `${t('orders.tabs.failed')} (3)`, value: 'Failed' },
    { label: `${t('orders.tabs.completed')} (234)`, value: 'Completed' },
  ];
  const orders: Order[] = [
    {
      id: '1',
      title: 'Order #12345',
      status: 'In Transit',
      statusVariant: 'warning',
      sender: { name: 'John Doe', address: '123 Main St, City, Country' },
      receiver: { name: 'Jane Smith', address: '456 Elm St, City, Country' },
      body: [
        { label: 'Pickup Date', value: '2023-10-01' },
        { label: 'Delivery Date', value: '2023-10-05' },
      ],
    },
    {
      id: '2',
      title: 'Order #12346',
      status: 'Delivered',
      statusVariant: 'success',
      sender: { name: 'Alice Johnson', address: '789 Oak St, City, Country' },
      receiver: { name: 'Bob Brown', address: '321 Pine St, City, Country' },
      body: [
        { label: 'Pickup Date', value: '2023-09-20' },
        { label: 'Delivery Date', value: '2023-09-25' },
      ],
    },
    {
      id: '3',
      title: 'Order #12347',
      status: 'Pending',
      statusVariant: 'warning',
      sender: { name: 'Charlie Davis', address: '654 Maple St, City, Country' },
      receiver: { name: 'Diana Evans', address: '987 Cedar St, City, Country' },
      body: [
        { label: 'Pickup Date', value: '2023-10-10' },
        { label: 'Delivery Date', value: '2023-10-15' },
      ],
    },
  ];

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('orders.title')} />
      <ContentView>
        <FlatList
          ListHeaderComponent={
            <>
              <Input
                name={'search'}
                leftIcon={<SearchIcon />}
                rightIcon={<ShortCutIcon />}
                formik={formik}
                placeholder='Search'
              />
              <View style={styles.row}>
                <View style={styles.container}>
                  <Calendar />
                </View>
                <View>
                  <Select
                    variant='secondary'
                    placeholder='status'
                    options={options}
                    value={status}
                    setValue={(value: string) => setStatus(value as Status)}
                  />
                </View>
              </View>
              <TabSwitcher tabs={tabs} activeTab={tab} onChange={val => setTab(val)} />
            </>
          }
          ListHeaderComponentStyle={styles.flatListContainer}
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Card variant='orders' data={item} />}
          contentContainerStyle={[styles.content, { paddingBottom }]}
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
  flatListContainer: {
    gap: 10,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },
});
