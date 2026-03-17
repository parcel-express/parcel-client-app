import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, Text, View } from 'react-native';

import { TrackingTimeline } from '@/components/order/TrackingTimeline';
import { MOCK_TRACKING } from '@/constants/mockData';

export default function OrderTracking() {
  const { orderId } = useLocalSearchParams();
  const { t } = useTranslation();

  const steps = MOCK_TRACKING[orderId as string] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('tracking.title')}</Text>

      <Text style={styles.orderNumber}>Order #{orderId}</Text>

      <TrackingTimeline steps={steps} />

      <View style={styles.footer}>
        <Text>{t('tracking.estimatedDelivery')}: 18:30</Text>

        <Button title={t('tracking.contactCourier')} onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },

  orderNumber: {
    marginBottom: 20,
  },

  footer: {
    marginTop: 'auto',
    gap: 16,
  },
});
