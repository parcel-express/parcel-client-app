import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { TrackingTimeline } from '@/components/order/TrackingTimeline';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Tag, { TagVariant } from '@/components/ui/Tag';
import { Colors } from '@/constants/Colors';
import { MOCK_TRACKING } from '@/constants/mockData';
import { Typography } from '@/constants/Typography';

export default function OrderTracking() {
  const { orderId } = useLocalSearchParams();
  const { t } = useTranslation();
  const [, setRetryCount] = useState(0);

  const safeOrderId = Array.isArray(orderId) ? orderId[0] : orderId;

  const steps = useMemo(() => {
    if (!safeOrderId) return [];
    return MOCK_TRACKING[safeOrderId] || [];
  }, [safeOrderId]);

  const isCompleted = steps.length > 0 && steps.every(step => step.status === 'completed');
  const activeStep =
    steps.find(step => step.status === 'current') ||
    (isCompleted ? steps[steps.length - 1] : undefined) ||
    steps[0];

  const statusBadge = useMemo<{ label: string; variant: TagVariant }>(() => {
    if (!activeStep) {
      return { label: t('status.pending'), variant: 'warning' };
    }

    if (isCompleted) {
      return { label: t('tracking.delivered'), variant: 'success' };
    }

    return { label: t(activeStep.labelKey), variant: 'warning' };
  }, [activeStep, isCompleted, t]);

  const hasTrackingInfo = steps.length > 0;

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('tracking.title')} hasGoBack titleStyle={styles.trackingHeaderTitle} />

      <ContentView style={styles.contentShell}>
        {!hasTrackingInfo ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('tracking.noTrackingInfo')}</Text>

            <Button size='md' variant='secondary' onPress={() => setRetryCount(prev => prev + 1)}>
              {t('tracking.retry')}
            </Button>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.orderHeaderRow}>
                <Text style={styles.orderNumber}>
                  {t('tracking.orderNumber', { id: safeOrderId || '-' })}
                </Text>

                <Tag variant={statusBadge.variant} label={statusBadge.label} />
              </View>

              <TrackingTimeline steps={steps} />
            </ScrollView>

            <View style={styles.footer}>
              <Text style={styles.estimatedDelivery}>{t('tracking.estimatedDelivery')}: 18:30</Text>

              <Button size='xl' variant='primary' onPress={() => {}}>
                {t('tracking.contactCourier')}
              </Button>
            </View>
          </>
        )}
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentShell: {
    flex: 1,
  },

  trackingHeaderTitle: {
    ...Typography.textLgBold,
    color: Colors.text.white,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    gap: 14,
  },

  orderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  orderNumber: {
    ...Typography.textMdBold,
    color: Colors.text.primary,
    flex: 1,
  },

  footer: {
    marginTop: 'auto',
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border.tertiary,
    backgroundColor: Colors.background.white,
  },

  estimatedDelivery: {
    ...Typography.textSmMedium,
    color: Colors.text.secondary,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },

  emptyTitle: {
    ...Typography.textMdSemiBold,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
