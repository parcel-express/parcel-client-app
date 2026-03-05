import { FormikProps } from 'formik';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { FormValues } from '@/app/(tabs)/new-order';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';
import { checkProhibitedItems } from '@/utils/prohibitedItems';

import Calendar from '../Calendar';
import CalendarIcon from '../icons/CalendarIcon';
import CardView from '../ui/CardView';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
type Props = {
  formik: FormikProps<FormValues>;
};
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
  const DIMENSIONAL_FACTOR = 5000;

  const calculateDimensionalWeight = (l: number, w: number, h: number) => {
    return Math.ceil((l * w * h) / DIMENSIONAL_FACTOR);
  };

  const dimWeight = useMemo(() => {
    const length = Number(formik.values.length);
    const width = Number(formik.values.width);
    const height = Number(formik.values.height);

    if (length && width && height) {
      return calculateDimensionalWeight(length, width, height);
    }

    return 0;
  }, [formik.values.length, formik.values.width, formik.values.height]);

  const actualWeight = Number(formik.values.weight) || 0;
  const chargeableWeight = Math.max(actualWeight, dimWeight);

  const prohibitedMatches = useMemo(
    () => checkProhibitedItems(formik.values.contentDescription || ''),
    [formik.values.contentDescription]
  );
  return (
    <View style={styles.detailsPage}>
      <View style={styles.calendarButtonsContainer}>
        <View style={styles.flexChild}>
          <Calendar type='single' onSave={date => formik.setFieldValue('startDate', date)}>
            <View style={styles.innerButton}>
              <CalendarIcon stroke={Colors.icon.primary} />
              <Text style={[Typography.textSmRegular, { color: Colors.text.placeholder }]}>
                {formik.values.startDate || t('orders.startDate')}
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
                {formik.values.endDate || t('orders.endDate')}
              </Text>
            </View>
          </Calendar>
        </View>
      </View>
      <CardView style={styles.card}>
        <Text style={[Typography.textMdBold, { color: Colors.text.black }]}>
          {t('new-order.weightForm.title')}
        </Text>
        <Input
          name={'weight'}
          formik={formik}
          placeholder={t('new-order.weightForm.weightPlaceholder')}
          label={t('new-order.weightForm.weightLabel')}
          keyboardType='decimal-pad'
        />

        <View style={styles.dimensionsRow}>
          <Input
            name={'length'}
            formik={formik}
            placeholder='სმ'
            label={t('new-order.length')}
            keyboardType='numeric'
          />

          <Input
            name={'width'}
            formik={formik}
            placeholder='სმ'
            label={t('new-order.width')}
            keyboardType='numeric'
          />

          <Input
            name={'height'}
            formik={formik}
            placeholder='სმ'
            label={t('new-order.height')}
            keyboardType='numeric'
          />
        </View>

        {dimWeight > 0 && (
          <View style={styles.weightResult}>
            <Text style={Typography.textSmRegular}>
              {t('new-order.actualWeight')}: {actualWeight} {t('new-order.weightType')}
            </Text>

            <Text style={Typography.textSmRegular}>
              {t('new-order.dimensionalWeight')}: {dimWeight} {t('new-order.weightType')}
            </Text>

            <Text style={Typography.textSmBold}>
              {t('new-order.sumPrice')}: {chargeableWeight} {t('new-order.weightType')}
            </Text>
          </View>
        )}

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
      {prohibitedMatches.length > 0 && (
        <Text style={{ color: Colors.text.error.primary }}>
          {t('new-order.prohibitedItemsTitle')}
        </Text>
      )}
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
  dimensionsRow: {
    flexDirection: 'column',
    gap: 8,
  },

  weightResult: {
    marginTop: 10,
    gap: 4,
  },
});
