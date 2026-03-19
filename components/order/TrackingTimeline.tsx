import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import PackageIcon from '@/components/icons/PackageIcon';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

export type TrackingStep = {
  key: string;
  labelKey: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming';
};

const formatDate = (iso?: string) => {
  if (!iso) return '';

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const TrackingTimeline = ({ steps }: { steps: TrackingStep[] }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.timeline}>
        {steps.map((step, index) => (
          <View key={step.key} style={styles.stepRow}>
            <View style={styles.iconColumn}>
              {index > 0 && <View style={styles.topConnector} />}

              <View
                style={[
                  styles.iconBadge,
                  step.status === 'current' ? styles.currentIconBadge : styles.defaultIconBadge,
                ]}
              >
                {step.status === 'current' && <View style={styles.currentGlowRing} />}

                <PackageIcon
                  width={28}
                  height={28}
                  stroke={step.status === 'current' ? Colors.text.black : Colors.icon.primary}
                />

                {step.status === 'completed' && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedCheckmark}>✓</Text>
                  </View>
                )}
              </View>

              {index < steps.length - 1 && <View style={styles.bottomConnector} />}
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  Typography.textMdSemiBold,
                  styles.label,
                  step.status === 'current' ? styles.currentLabel : styles.inactiveLabel,
                ]}
              >
                {t(step.labelKey)}
              </Text>

              {step.timestamp && (
                <Text
                  style={[
                    Typography.textMdMedium,
                    styles.timestamp,
                    step.status === 'current' ? styles.currentTimestamp : styles.inactiveTimestamp,
                  ]}
                >
                  {formatDate(step.timestamp)}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.tertiary,
    paddingHorizontal: 8,
    ...Shadows.shadow_lg03,
  },

  timeline: {
    paddingVertical: 10,
  },

  stepRow: {
    flexDirection: 'row',
    minHeight: 92,
  },

  iconColumn: {
    width: 92,
    alignItems: 'center',
    position: 'relative',
  },

  topConnector: {
    position: 'absolute',
    width: 2,
    top: 0,
    bottom: 52,
    backgroundColor: Colors.border.secondary,
    zIndex: 0,
  },

  bottomConnector: {
    position: 'absolute',
    width: 2,
    top: 52,
    bottom: 0,
    backgroundColor: Colors.border.secondary,
    zIndex: 0,
  },

  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    zIndex: 2,
    elevation: 2,
  },

  currentGlowRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.button.outline,
    opacity: 0.35,
  },

  defaultIconBadge: {
    backgroundColor: Colors.background.avatar,
  },

  currentIconBadge: {
    backgroundColor: Colors.background.white,
    borderWidth: 1.5,
    borderColor: Colors.brand.primary,
  },

  completedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  completedCheckmark: {
    ...Typography.textXsBold,
    color: Colors.text.white,
    lineHeight: 14,
    textAlign: 'center',
  },

  label: {
    marginTop: 14,
  },

  stepContent: {
    flex: 1,
    paddingRight: 8,
  },

  currentLabel: {
    color: Colors.text.black,
  },

  inactiveLabel: {
    color: Colors.text.placeholder,
  },

  timestamp: {
    marginTop: 1,
  },

  currentTimestamp: {
    color: Colors.text.black,
  },

  inactiveTimestamp: {
    color: Colors.text.placeholder,
  },
});
