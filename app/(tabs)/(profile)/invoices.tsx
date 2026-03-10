import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const STATUS_FILTERS = [
    { label: t('invoices.filters.all'), value: 'all' },
    { label: status.paid, value: status.paid },
    { label: status.partiallyPaid, value: status.partiallyPaid },
    { label: status.pending, value: status.pending },
    { label: status.overdue, value: status.overdue },
  ];

  const filteredInvoices = React.useMemo(() => {
    let result = data;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();

      result = result.filter(
        inv => inv.title.toLowerCase().includes(q) || inv.body[1]?.value.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(inv => inv.status === statusFilter);
    }

    return result;
  }, [data, debouncedSearch, statusFilter]);

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
        invoice={selectedInvoice}
      />
      <ContentView>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={t('invoices.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>
        <View style={styles.tabs}>
          {STATUS_FILTERS.map(filter => (
            <TouchableOpacity
              key={filter.value}
              onPress={() => setStatusFilter(filter.value)}
              style={[styles.tab, statusFilter === filter.value && styles.activeTab]}
            >
              <Text style={[styles.tabText, statusFilter === filter.value && styles.activeTabText]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredInvoices}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedInvoice(item);
                setInfoModalIsVisible(true);
              }}
            >
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
  searchContainer: {
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  searchInput: {
    backgroundColor: Colors.text.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginBottom: 10,
    gap: 8,
  },

  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.background.body,
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: Colors.gradient.primary.start,
  },

  tabText: {
    fontSize: 12,
  },

  activeTabText: {
    color: Colors.text.white,
  },
});
