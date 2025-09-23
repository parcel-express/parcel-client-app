import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import Calendar from '@/components/Calendar';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import SearchIcon from '@/components/icons/SearchIcon';
import ShortCutIcon from '@/components/icons/ShortCutIcon';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TabSwitcher from '@/components/ui/TabSwitcher';
import { Colors } from '@/constants/Colors';

import { Status, StatusOptions, Tab, Tabs } from '../types/orderTypes';

export default function OrdersScreen() {
  const [tab, setTab] = React.useState<Tab>('Ongoing');
  const [status, setStatus] = React.useState<Status | 'status'>('status');
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
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('orders.title')} />
      <ContentView style={styles.content}>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },
});
