import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { DeliverySchedule } from '@/constants/schedules';
import { Typography } from '@/constants/Typography';

import CityScheduleRow from './CityScheduleRow';

export default function RegionCard({
  region,
  cities,
}: {
  region: string;
  cities: DeliverySchedule[];
}) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <Text style={Typography.textLgSemiBold}>{region}</Text>
          <Text style={Typography.textSmRegular}>
            {cities.length} {t('schedules.locations')}
          </Text>
        </View>
      </TouchableOpacity>

      {expanded && cities.map(city => <CityScheduleRow key={city.cityEn} schedule={city} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    borderRadius: 12,
    padding: 14,
    backgroundColor: Colors.background.secondarySubtle,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
