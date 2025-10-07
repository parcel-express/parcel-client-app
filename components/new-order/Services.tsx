import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { FormValues } from '@/app/(tabs)/new-order';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import CameraIcon from '../icons/CameraIcon';
import FileIcon from '../icons/FileIcon';
import CustomSwitch from '../ui/Switch';
type BooleanKeys<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];

type Props = {
  formik: FormikProps<FormValues>;
};
type Data = {
  icon: React.ElementType;
  label: string;
  price: string;
  name: BooleanKeys<FormValues>;
};
const Services = ({ formik }: Props) => {
  const { t } = useTranslation();
  const data: Data[] = [
    {
      icon: FileIcon,
      label: t('new-order.fileLabel'),
      price: t('new-order.price'),
      name: 'giveBackDocs',
    },
    {
      icon: CameraIcon,
      label: t('new-order.imageLabel'),
      price: t('new-order.price'),
      name: 'image',
    },
  ];
  const AdditionalService = ({ item }: { item: Data }) => (
    <View style={styles.switchContainer}>
      <View style={styles.switchLabelContainer}>
        <item.icon stroke={Colors.icon.black} strokeWidth={2} />
        <View style={styles.gap}>
          <Text style={[Typography.textXsBold, { color: Colors.text.black }]}>{item.label}</Text>
          <Text style={[Typography.textXsMedium, { color: Colors.text.black }]}>{item.price}</Text>
        </View>
      </View>
      <CustomSwitch
        value={formik.values[item.name] || false}
        onValueChange={value => {
          formik.setFieldValue(item.name, value);
        }}
      />
    </View>
  );
  const AdditionalServices = () => (
    <View style={styles.switchPage}>
      {data.map(item => (
        <AdditionalService item={item} key={item.label} />
      ))}
    </View>
  );
  return <AdditionalServices />;
};

export default Services;

const styles = StyleSheet.create({
  switchPage: {
    flexDirection: 'column',
    gap: 8,
  },
  switchContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    ...Shadows.shadow_xs,
    backgroundColor: Colors.background.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gap: {
    flexDirection: 'column',
    gap: 4,
  },
});
