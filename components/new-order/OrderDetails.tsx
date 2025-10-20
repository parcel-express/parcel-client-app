import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { FormValues } from '@/app/(tabs)/new-order';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import Calendar from '../Calendar';
import CalendarIcon from '../icons/CalendarIcon';
import CardView from '../ui/CardView';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import TypeableSelect from '../ui/TypeableSelect';
type Props = {
  formik: FormikProps<FormValues>;
};
const weightOptions = [
  {
    label: '0.5 კგ - 1 კგ',
    value: '0.5 კგ - 1 კგ',
  },
  {
    label: '1 კგ - 3 კგ',
    value: '1 კგ - 3 კგ',
  },
  {
    label: '3 კგ - 5 კგ',
    value: '3 კგ - 5 კგ',
  },
];
const quantityOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const OrderDetails = ({ formik }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.detailsPage}>
      <View style={styles.calendarButtonsContainer}>
        <View style={styles.flexChild}>
          <Calendar type='single' onSave={date => formik.setFieldValue('startDate', date)}>
            <View style={styles.innerButton}>
              <CalendarIcon stroke={Colors.icon.primary} />
              <Text style={[Typography.textSmRegular, { color: Colors.text.placeholder }]}>
                {formik.values.startDate || t('common.selectDate')}
              </Text>
            </View>
          </Calendar>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.flexChild}>
          <Calendar type='single' onSave={date => formik.setFieldValue('endDate', date)}>
            <View style={styles.innerButton}>
              <CalendarIcon stroke={Colors.icon.primary} />
              <Text style={[Typography.textSmRegular, { color: Colors.text.placeholder }]}>
                {formik.values.endDate || t('common.selectDate')}
              </Text>
            </View>
          </Calendar>
        </View>
      </View>
      <CardView style={styles.card}>
        <Text style={[Typography.textMdBold, { color: Colors.text.black }]}>
          {t('new-order.weightForm.title')}
        </Text>
        <TypeableSelect
          setValue={formik.setFieldValue.bind(null, 'weight')}
          options={weightOptions}
          value={formik.values.weight}
          placeholder={t('new-order.weightForm.weightPlaceholder')}
          label={t('new-order.weightForm.weightLabel')}
          allowInput
          inputType='numeric'
        />
        <View style={styles.divider} />
        <Select
          setValue={formik.setFieldValue.bind(null, 'quantity')}
          options={quantityOptions}
          value={formik.values.quantity}
          placeholder={t('new-order.weightForm.quantityPlaceholder')}
          label={t('new-order.weightForm.quantityLabel')}
        />
        <Input
          name={'orderNumber'}
          formik={formik}
          placeholder='#'
          label={t('new-order.weightForm.orderNumberLabel')}
        />
        <TextArea
          label={''}
          value={formik.values.comment}
          onChangeText={formik.setFieldValue.bind(null, 'comment')}
          placeholder={t('new-order.weightForm.commentPlaceholder')}
        />
      </CardView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border.primary,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.border.primary,
  },

  detailsPage: {
    flexDirection: 'column',
    gap: 10,
  },
  calendarButtonsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border.primary,
    backgroundColor: Colors.background.white,
    borderRadius: 8,
    ...Shadows.shadow_xs,
  },
  flexChild: {
    flex: 1,
    minWidth: 0,
  },
  innerButton: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: 'column',
    gap: 20,
  },
});
