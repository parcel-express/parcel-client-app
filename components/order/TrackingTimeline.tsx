import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export type TrackingStep = {
  key: string;
  labelKey: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming';
};

const formatDate = (iso?: string) => {
  if (!iso) return '';
  return new Date(iso).toLocaleString();
};

export const TrackingTimeline = ({ steps }: { steps: TrackingStep[] }) => {
  const { t } = useTranslation();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.3,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse]);

  return (
    <View style={styles.timeline}>
      {steps.map((step, index) => (
        <View key={step.key} style={styles.stepRow}>
          {/* LEFT COLUMN */}
          <View style={styles.dotColumn}>
            {step.status === 'current' ? (
              <Animated.View
                style={[styles.dot, styles.currentDot, { transform: [{ scale: pulse }] }]}
              />
            ) : (
              <View
                style={[
                  styles.dot,
                  step.status === 'completed' && styles.completedDot,
                  step.status === 'upcoming' && styles.upcomingDot,
                ]}
              />
            )}

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  step.status === 'completed' ? styles.completedLine : styles.upcomingLine,
                ]}
              />
            )}
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.stepContent}>
            <Text
              style={[
                Typography.textMdMedium,
                step.status === 'upcoming' && { color: Colors.text.tertiary },
              ]}
            >
              {t(step.labelKey)}
            </Text>

            {step.timestamp && (
              <Text style={Typography.textSmRegular}>{formatDate(step.timestamp)}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    paddingVertical: 20,
  },

  stepRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  dotColumn: {
    width: 30,
    alignItems: 'center',
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  completedDot: {
    backgroundColor: Colors.brand.primary,
  },
  currentDot: {
    backgroundColor: Colors.brand.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  completedLine: {
    backgroundColor: Colors.brand.primary,
  },

  upcomingDot: {
    borderWidth: 2,
    borderColor: Colors.text.tertiary,
  },

  line: {
    width: 2,
    flex: 1,
  },

  upcomingLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.text.tertiary,
  },

  stepContent: {
    flex: 1,
  },
});
