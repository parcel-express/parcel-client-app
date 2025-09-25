import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import CardView from './CardView';
type Props = {
  data?: { label: string; value: string }[];
  variant?: 'default' | 'unstyled' | 'row';
};
const InfoCard = ({ data, variant = 'default' }: Props) => {
  const initialData = [
    { label: 'ქალაქი', value: 'ორშ-პარ - 16:00 საათამდე, შაბ - 12:00 საათამდე' },
    { label: 'რეგიონი', value: 'ორშ-პარ - 16:00 საათამდე' },
    { label: 'სოფლები, მაღალმთიანი რეგიონი', value: 'ორშ-პარ - 16:00 საათამდე' },
  ];
  const toMap = data && data.length ? data : initialData;
  const Wrapper = variant === 'default' ? CardView : View;

  return (
    <Wrapper style={styles.card}>
      {toMap.map((item, index) => (
        <View
          style={[
            variant === 'default' ? styles.content : styles.smallContent,
            toMap.length - 1 !== index && variant === 'default' && styles.bottomBorder,
            variant === 'row' && styles.row,
          ]}
          key={item.label}
        >
          <Text
            style={[
              variant === 'unstyled'
                ? Typography.textSmBold
                : variant === 'row'
                  ? Typography.textSmMedium
                  : Typography.textXsSemiBold,
              variant !== 'default' ? styles.black : styles.keyColor,
            ]}
          >
            {item.label}
          </Text>
          <Text
            style={[
              variant === 'row' ? Typography.textXsBold : Typography.textSmMedium,
              variant !== 'default' ? styles.black : styles.primaryColor,
            ]}
          >
            {item.value}
          </Text>
        </View>
      ))}
    </Wrapper>
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
  smallContent: {
    gap: 8,
    paddingHorizontal: 0,
    paddingBlock: 10,
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
  black: {
    color: Colors.text.black,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
