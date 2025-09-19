import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
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
  useWindowDimensions,
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
  transparent?: boolean;
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
const Modal = ({ visible, onClose, transparent = true, form, title, subtitle }: Props) => {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const windowHeight = useWindowDimensions().height;
  const panelHeight = windowHeight * 0.85;
  const insets = useSafeAreaInsets();
  const overlayHeight = windowHeight - panelHeight - insets.top;

  const bottomPad = insets.bottom + 22;
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.topOverlay, { height: overlayHeight }]} />
      </TouchableWithoutFeedback>
      <View style={styles.overlay} accessibilityViewIsModal accessible>
        <View style={[styles.content, { height: panelHeight }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? overlayHeight + 20 : overlayHeight + tabBarHeight + 20
            }
            style={styles.full}
          >
            <ScrollView
              keyboardShouldPersistTaps='handled'
              contentContainerStyle={[styles.contentContainer, { paddingBottom: bottomPad }]}
            >
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
          </KeyboardAvoidingView>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  topOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 100,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.modal.overlay,
    justifyContent: 'flex-end',
  },
  content: {
    minWidth: 280,
    minHeight: 120,
    backgroundColor: Colors.modal.background,
    borderRadius: 12,

    elevation: 5,
    gap: 22,
  },
  contentContainer: { paddingTop: 20, paddingHorizontal: 18, paddingBottom: 24, gap: 22 },
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
