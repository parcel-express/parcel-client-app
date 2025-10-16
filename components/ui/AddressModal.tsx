import { Image } from 'expo-image';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FormValues } from '@/app/(tabs)/new-order';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

import PinIcon from '../icons/PinIcon';
import UserIcon from '../icons/UserIcon';
import XIcon from '../icons/XIcon';

import Button from './Button';
import Input from './Input';
import Select from './Select';
type Props = {
  visible: boolean;
  onClose: () => void;
  form: FormikProps<FormValues>;
  onSubmit: () => void;
  type: 'sender' | 'receiver';
};

const AddressModal = ({ visible, onClose, form, onSubmit, type }: Props) => {
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
  const inputKeys = ['address', 'name', 'surname', 'company', 'city', 'phoneNumber'];
  const getName = (key: string) => {
    return type + key.slice(0, 1).toUpperCase() + key.slice(1);
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent
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
      <KeyboardAvoidingView
        style={styles.full}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.overlay}>
          <View style={[styles.content, { marginTop: top + 65 }]}>
            <ScrollView
              keyboardShouldPersistTaps='handled'
              keyboardDismissMode='none'
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.form}>
                {inputKeys.map(key => {
                  if (selectKeys.includes(key)) {
                    return (
                      <Select
                        setValue={val => form.setFieldValue(getName(key), val)}
                        options={options}
                        key={key}
                        label={t(`new-order.form.${key}`)}
                        placeholder={t(`new-order.form.${key}Placeholder`)}
                        value={form.values[getName(key) as keyof FormValues] as string}
                      />
                    );
                  }
                  return (
                    <Input
                      name={getName(key) as keyof FormValues}
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
                <Button size='md' variant='primary' onPress={onSubmit}>
                  {t('common.save')}
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  full: {
    flex: 1,
  },
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
  content: {
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    justifyContent: 'flex-end',
    backgroundColor: Colors.background.white,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  form: {
    gap: 10,
  },
  footer: {
    paddingTop: 24,
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
