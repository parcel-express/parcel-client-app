import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { DeliverySchedule } from '@/constants/schedules';
import { Typography } from '@/constants/Typography';

const DAY_LABELS: Record<string, string> = {
  mon: 'M',
  tue: 'Tu',
  wed: 'W',
  thu: 'Th',
  fri: 'F',
  sat: 'Sa',
  sun: 'Su',
};

const FREQUENCY_MAP: Record<string, string> = {
  daily: 'Daily',
  '3x_week': '3x/week',
  '2x_week': '2x/week',
  weekly: 'Weekly',
  special: 'Special',
};

export default function CityScheduleRow({ schedule }: { schedule: DeliverySchedule }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={Typography.textMdMedium}>{schedule.city}</Text>

        <View style={styles.frequencyBadge}>
          <Text style={styles.frequencyText}>{FREQUENCY_MAP[schedule.frequency]}</Text>
        </View>
      </View>

      <View style={styles.daysRow}>
        {Object.keys(DAY_LABELS).map(day => (
          <View
            key={day}
            style={[styles.dayCircle, schedule.days.includes(day) && styles.dayActive]}
          >
            <Text style={styles.dayText}>{DAY_LABELS[day]}</Text>
          </View>
        ))}
      </View>

      <Text style={Typography.textSmRegular}>{schedule.timeWindow}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border.disabledBorder,
  },

  daysRow: {
    flexDirection: 'row',
    gap: 6,
  },

  dayCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.background.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayActive: {
    backgroundColor: Colors.brand.primary,
  },

  dayText: {
    fontSize: 12,
    color: Colors.text.primary,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  frequencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.background.secondarySubtle,
  },

  frequencyText: {
    fontSize: 12,
    color: Colors.text.primary,
  },
});
