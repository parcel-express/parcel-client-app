import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Calendar from '@/components/Calendar';
import ContentView from '@/components/ContentView';
import DropDown from '@/components/DropDown';
import Header from '@/components/Header';
import CalendarIcon from '@/components/icons/CalendarIcon';
import CameraIcon from '@/components/icons/CameraIcon';
import FileIcon from '@/components/icons/FileIcon';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import CardView from '@/components/ui/CardView';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import CustomSwitch from '@/components/ui/Switch';
import TextArea from '@/components/ui/TextArea';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';
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
export default function NewOrderScreen() {
  const [isActive, setIsActive] = React.useState([true, false]);
  const [index, setIndex] = React.useState(0);
  const tabBarHeight = useBottomTabBarHeight();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      weight: '',
      quantity: '',
      orderNumber: '#',
      comment: '',
      startDate: '',
      endDate: '',
    },
    onSubmit: () => {
      setIndex(0);
    },
  });
  const handlePress = () => {
    if (index < 3) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      setIndex(0);
    }
  };
  const data = [
    { icon: FileIcon, label: t('new-order.fileLabel'), price: t('new-order.price') },
    {
      icon: CameraIcon,
      label: t('new-order.imageLabel'),
      price: t('new-order.price'),
    },
  ];
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('new-order.title')} closeButton />
      <ContentView style={[styles.content, { paddingBottom: tabBarHeight + 20 }]}>
        {index === 0 ? (
          <View style={styles.buttonsContainer}>
            <DropDown label={t('new-order.senderLabel')} type={'sender'} />
            <View style={styles.divider} />
            <DropDown label={t('new-order.receiverLabel')} type={'receiver'} />
          </View>
        ) : index === 1 ? (
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
              <Select
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
        ) : (
          <View style={styles.switchPage}>
            {data.map((item, index) => (
              <View style={styles.switchContainer} key={item.label}>
                <View style={styles.switchLabelContainer}>
                  <item.icon stroke={Colors.icon.black} strokeWidth={2} />
                  <View style={styles.gap}>
                    <Text style={[Typography.textXsBold, { color: Colors.text.black }]}>
                      {item.label}
                    </Text>
                    <Text style={[Typography.textXsMedium, { color: Colors.text.black }]}>
                      {item.price}
                    </Text>
                  </View>
                </View>
                <CustomSwitch
                  value={isActive[index] || false}
                  onValueChange={value => {
                    const newState = [...isActive];
                    newState[index] = value;
                    setIsActive(newState);
                  }}
                />
              </View>
            ))}
          </View>
        )}

        <Button size='md' variant={'primary'} style={styles.submitButton} onPress={handlePress}>
          {t('common.continue')}
        </Button>
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
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
  verticalDivider: {
    width: 1,
    height: '100%',
    paddingVertical: -16,
    backgroundColor: Colors.border.primary,
  },
  submitButton: {
    borderRadius: 14,
  },
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
    height: 64,
    paddingHorizontal: 8,
    alignItems: 'center',
    ...Shadows.shadow_xs,
  },
  flexChild: {
    flex: 1,
    minWidth: 0, // allow proper shrinking on small screens
  },
  innerButton: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'column',
    gap: 20,
  },
});
