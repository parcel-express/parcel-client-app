import { Image } from 'expo-image';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

import PinIcon from '../icons/PinIcon';
import UserIcon from '../icons/UserIcon';
import XIcon from '../icons/XIcon';

import Button from './Button';
import Input from './Input';
import Select from './Select';
type AddressFormValues = {
  address: string;
  name: string;
  surname: string;
  company: string;
  city: string;
  phoneNumber: string;
};
type Props = {
  visible: boolean;
  onClose: () => void;
  transparent?: boolean;
  form: FormikProps<AddressFormValues>;
};

const AddressModal = ({ visible, onClose, transparent = true, form }: Props) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const selectKeys = ['company', 'city'];
  const options = [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ];
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <View style={styles.background}>
        <Image source={require('../../assets/images/map.png')} style={styles.image} />
      </View>

      <View style={styles.addressIcon}>
        <PinIcon />
      </View>
      <View style={[styles.closeIcon, { top: top + 18 }]}>
        <XIcon onPress={onClose} />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.form}>
            {Object.entries(form?.initialValues).map(([key]) => {
              if (selectKeys.includes(key)) {
                return (
                  <Select
                    setValue={val => form.setFieldValue(key, val)}
                    options={options}
                    key={key}
                    label={t(`new-order.form.${key}`)}
                    placeholder={t(`new-order.form.${key}Placeholder`)}
                    value={form.values[key as keyof AddressFormValues] || ''}
                  />
                );
              }
              return (
                <Input
                  name={key as keyof AddressFormValues}
                  formik={form}
                  key={key}
                  label={t(`new-order.form.${key}`)}
                  placeholder={t(`new-order.form.${key}Placeholder`)}
                  leftIcon={key === 'name' ? <UserIcon width={15} height={15} /> : undefined}
                />
              );
            })}
          </View>
          <View style={styles.footer}>
            <Button size='md' variant='primary' onPress={form.submitForm}>
              {t('common.save')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  background: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  image: { flex: 1 },
  closeIcon: {
    position: 'absolute',
    left: 18,
    width: 40,
    height: 40,
    backgroundColor: Colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.shadow_xs,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    borderRadius: 16,
    justifyContent: 'flex-end',
    backgroundColor: Colors.background.white,
    paddingHorizontal: 20,
  },
  form: {
    paddingVertical: 24,
    gap: 10,
  },
  footer: {
    paddingBottom: 44,
  },
  addressIcon: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
