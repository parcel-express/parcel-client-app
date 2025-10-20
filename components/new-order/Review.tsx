import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { FormValues } from '@/app/(tabs)/new-order';
import DropDown from '@/components/DropDown';
import CardView from '@/components/ui/CardView';
import Select from '@/components/ui/Select';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import Services from './Services';
type Props = {
  formik: FormikProps<FormValues>;
};
const paymentMethods = [
  { label: 'კრედიტი/დებეტი', value: 'credit/debit' },
  { label: 'ნაღდი', value: 'cash' },
  { label: 'ინვოისი', value: 'invoice' },
];
const paymentSides = [
  { label: 'მიმღები', value: 'receiver' },
  { label: 'გამგზავნი', value: 'sender' },
  { label: 'ორივე', value: 'both' },
  { label: 'კურიერი', value: 'courier' },
  { label: 'კომპანია', value: 'company' },
];
const Review = ({ formik }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.reviewPage}>
      <View style={styles.gapMedium}>
        <View style={styles.buttonsContainer}>
          <DropDown label={t('new-order.senderLabel')} type={'sender'} disabled formik={formik} />
          <View style={styles.divider} />
          <DropDown
            label={t('new-order.receiverLabel')}
            type={'receiver'}
            disabled
            formik={formik}
          />
        </View>
        <CardView>
          <Text style={[Typography.textSmMedium, { color: Colors.text.black }]}>ამანათის წონა</Text>
          <Select
            setValue={formik.setFieldValue.bind(null, 'weight')}
            options={[]}
            value={formik.values.weight}
            placeholder={formik.values.weight}
            disabled
          />
        </CardView>
        <View style={styles.gapMedium}>
          <Text style={[Typography.textSmBold, { color: Colors.text.black }]}>
            დამატებითი სერვისები
          </Text>
          <Services formik={formik} />
        </View>
      </View>
      <View style={styles.gapLarge}>
        <View style={styles.payment}>
          <Text style={[Typography.textLgBold, { color: Colors.text.black }]}>გადახდა</Text>
          <View style={styles.gapSm}>
            <View style={styles.row}>
              <Text style={[Typography.textSmMedium]}>მიწოდების ფასი</Text>
              <Text style={[Typography.textSmBold]}>12ლ</Text>
            </View>
            <View style={styles.row}>
              <Text style={[Typography.textSmMedium]}>დამატებითი სერვისები</Text>
              <Text style={[Typography.textSmBold]}>12ლ</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[Typography.textLgBold]}>გადახდა</Text>
            <Text style={[Typography.textLgBold]}>24ლ</Text>
          </View>
        </View>
      </View>
      <View style={styles.gapSm}>
        <Select
          setValue={formik.setFieldValue.bind(null, 'paymentType')}
          options={paymentMethods}
          value={formik.values.paymentType}
          placeholder={t('new-order.form.paymentMethodPlaceholder')}
          label={t('new-order.form.paymentMethodLabel')}
        />
        <Select
          setValue={formik.setFieldValue.bind(null, 'paymentSide')}
          options={paymentSides}
          value={formik.values.paymentSide}
          placeholder={t('new-order.form.paymentSidePlaceholder')}
          label={t('new-order.form.paymentSideLabel')}
        />
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  buttonsContainer: {
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 12,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_xs,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border.primary,
  },
  reviewPage: {
    gap: 29,
  },
  gapSm: { gap: 14 },
  gapMedium: {
    gap: 16,
  },
  gapLarge: {
    gap: 28,
  },
  payment: {
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
