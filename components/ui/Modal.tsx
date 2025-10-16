import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Form } from '@/app/(tabs)/(profile)/addresses';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import XIcon from '../icons/XIcon';

import Button from './Button';
import Input from './Input';
import Select from './Select';

type Props = {
  title?: string;
  subtitle?: string;
  visible: boolean;
  onClose: () => void;
  form: FormikProps<Form>;
};
const inputs: (keyof Form)[] = [
  'branchName',
  'customerName',
  'company',
  'city',
  'address',
  'phone',
];
const Modal = ({ visible, onClose, form, title, subtitle }: Props) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.full]}
      >
        <View style={styles.overlay} accessibilityViewIsModal accessible>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.full} />
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.content,
              {
                paddingBottom: Platform.OS === 'ios' ? bottom : bottom + 22,
              },
            ]}
          >
            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.padding}>
              <View style={styles.header}>
                <View style={styles.row}>
                  <Text style={Typography.textMdSemiBold}>{title}</Text>
                  <XIcon onPress={onClose} />
                </View>
                <Text style={[Typography.textXsRegular]}>{subtitle}</Text>
              </View>
              <View style={styles.body}>
                {inputs.map(input => {
                  return input === 'city' ? (
                    <Select
                      key={input}
                      setValue={value => form.setFieldValue('city', value)}
                      options={[
                        { label: 'City 1', value: 'city1' },
                        { label: 'City 2', value: 'city2' },
                        { label: 'City 3', value: 'city3' },
                      ]}
                      value={form.values.city}
                      label={t(`profile.addresses.${input}`)}
                      placeholder={t(`profile.addresses.${input}Placeholder`)}
                    />
                  ) : (
                    <Input<Form>
                      name={input}
                      label={t(`profile.addresses.${input}`)}
                      placeholder={t(`profile.addresses.${input}Placeholder`)}
                      formik={form}
                      key={input}
                      keyboardType={input === 'phone' ? 'phone-pad' : 'default'}
                    />
                  );
                })}
              </View>
              <Button variant='primary' size='md' onPress={form.handleSubmit}>
                {t('profile.addresses.addAddress')}
              </Button>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modal.overlay,
    justifyContent: 'flex-end',
  },
  content: {
    minWidth: 280,
    minHeight: 120,
    backgroundColor: Colors.modal.background,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,

    elevation: 5,
    maxHeight: '80%',
  },
  padding: { paddingTop: 20, paddingHorizontal: 18, gap: 22 },
  header: {
    width: '100%',
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    gap: 22,
  },
  full: { flex: 1 },
});

export default Modal;
