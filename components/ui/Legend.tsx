import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

type Props = {
  colorScheme: string[];
};

const Legend = ({ colorScheme }: Props) => {
  const { t } = useTranslation();

  const legend = [
    { title: t('home.submitted'), color: colorScheme[0] },
    { title: t('home.undeliverable'), color: colorScheme[1] },
    { title: t('home.current'), color: colorScheme[2] },
  ];
  return (
    <View style={styles.legendContainer}>
      {legend.map((item, index) => (
        <View key={index.toString()} style={styles.row}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: item.color,
              },
            ]}
          />
          <Text style={[Typography.textXsRegular, { color: Colors.text.tertiary }]}>
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Legend;

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dot: { width: 8, height: 8, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
