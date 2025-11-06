import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { FormValues } from '@/app/(tabs)/new-order';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

import DropDown from '../DropDown';
type Props = {
  formik: FormikProps<FormValues>;
};
const Address = ({ formik }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.buttonsContainer}>
      <DropDown label={t('new-order.senderLabel')} type={'sender'} formik={formik} />
      <View style={styles.divider} />
      <DropDown label={t('new-order.receiverLabel')} type={'receiver'} formik={formik} />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border.secondary,
  },
  buttonsContainer: {
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    borderRadius: 12,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_xs,
  },
});
