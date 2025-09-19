import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import CardView from './CardView';

const InfoCard = () => {
  const data = [
    { label: 'ქალაქი', value: 'ორშ-პარ - 16:00 საათამდე, შაბ - 12:00 საათამდე' },
    { label: 'რეგიონი', value: 'ორშ-პარ - 16:00 საათამდე' },
    { label: 'სოფლები, მაღალმთიანი რეგიონი', value: 'ორშ-პარ - 16:00 საათამდე' },
  ];
  return (
    <CardView style={styles.card}>
      {data.map((item, index) => (
        <View
          style={[styles.content, data.length - 1 !== index && styles.bottomBorder]}
          key={item.label}
        >
          <Text style={[Typography.textXsSemiBold, styles.keyColor]}>{item.label}</Text>
          <Text style={[Typography.textSmMedium, styles.primaryColor]}>{item.value}</Text>
        </View>
      ))}
    </CardView>
  );
};

export default InfoCard;
const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  content: {
    gap: 10,
    padding: 16,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.border.primary,
  },
  keyColor: {
    color: Colors.text.placeholder,
  },
  primaryColor: {
    color: Colors.text.primary,
  },
});
