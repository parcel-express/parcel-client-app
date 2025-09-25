import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import EmptyWishlistIcon from '@/components/icons/EmptyWishlistIcon';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import InfoModal from '@/components/ui/InfoModal';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import { Order } from '../types/cardTypes';
import { Status, StatusOptions, Tab, Tabs } from '../types/orderTypes';

export default function OrdersScreen() {
  const [tab, setTab] = React.useState<Tab>('Ongoing');
  const [status, setStatus] = React.useState<Status | 'status'>('status');
  const [search, setSearch] = React.useState('');
  const [date, setDate] = React.useState<{ start?: string; end?: string }>({});
  const [isModalVisible, setIsModalVisible] = React.useState(false);
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
  // Update search state live
  React.useEffect(() => {
    setSearch(formik.values.search);
  }, [formik.values.search]);

  // Helper to check if a date is within the selected range
  const isWithinRange = (target: string, start?: string, end?: string) => {
    if (!start || !end) return true;
    const targetDate = new Date(target);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return targetDate >= startDate && targetDate <= endDate;
  };

  // Filter function
  const filteredOrders = orders.filter(order => {
    const matchesStatus =
      status === 'status' || order.status.toLowerCase() === status.toLowerCase();
    const matchesSearch =
      !search ||
      order.title.toLowerCase().includes(search.toLowerCase()) ||
      order.sender.name.toLowerCase().includes(search.toLowerCase()) ||
      order.receiver.name.toLowerCase().includes(search.toLowerCase());
    const matchesDate =
      !date.start || !date.end
        ? true
        : order.body.some(
            field =>
              (field.label.toLowerCase().includes('date') ||
                field.label.toLowerCase().includes('pickup') ||
                field.label.toLowerCase().includes('delivery')) &&
              isWithinRange(field.value, date.start, date.end)
          );
    return matchesStatus && matchesSearch && matchesDate;
  });

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <InfoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title='შეკვეთის დეტალები'
      />
      <Header title={t('orders.title')} />
      <ContentView style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <Filters
              formik={formik}
              setDate={setDate}
              date={date}
              status={status}
              setStatus={setStatus}
              tab={tab}
              setTab={setTab}
              options={options}
              tabs={tabs}
            />
          }
          ListHeaderComponentStyle={styles.flatListContainer}
          data={filteredOrders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Card variant='orders' data={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={[
            styles.content,
            filteredOrders.length === 0 && styles.container,
            { paddingBottom },
          ]}
          ListFooterComponent={
            <View style={filteredOrders.length === 0 ? styles.show : styles.hide}>
              <EmptyWishlistIcon />
              <Text style={[Typography.textMdBold, styles.black]}>{t('orders.noOrdersFound')}</Text>
            </View>
          }
          ListFooterComponentStyle={styles.container}
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
  show: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 32,
  },
  hide: {
    display: 'none',
  },
  black: {
    color: Colors.text.black,
  },
});
