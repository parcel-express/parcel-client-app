import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import XIcon from '../icons/XIcon';

import Button from './Button';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';

type Props = {
  visible: boolean;
  onClose: () => void;
  message?: string | undefined;
  variant?: 'support' | 'notifications';
};

const NotificationsModal: React.FC<Props> = ({
  visible,
  onClose,
  message,
  variant = 'notifications',
}) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: '',
      trackingCode: '',
      fullName: '',
      city: '',
      message: '',
    },
    onSubmit: (_, { resetForm }) => {
      onClose();
      resetForm();
    },
  });
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
  const setSelectValue = (value: string) => {
    formik.setFieldValue('title', value);
  };
  return (
    <Modal visible={visible} transparent animationType='slide' onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.full}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.full} />
          </TouchableWithoutFeedback>
          <View style={styles.modal}>
            <View style={[styles.container, styles.header]}>
              <View style={styles.gapSm}>
                <Text style={[Typography.textMdSemiBold, styles.black]}>
                  {t(
                    message ? 'notifications.modal.messageLabel' : 'notifications.modal.sendTitle'
                  )}
                </Text>
                {!message && (
                  <Text style={[Typography.textXsRegular, styles.black]}>
                    {t('notifications.modal.sendSubTitle')}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={onClose}>
                <XIcon width={12} height={12} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={[styles.container]}>
              {message ? (
                <Text style={[Typography.textMdRegular, styles.black]}>{message}</Text>
              ) : (
                <View style={styles.body}>
                  <Select
                    placeholder={t('notifications.modal.titlePlaceholder')}
                    options={options}
                    setValue={setSelectValue}
                  />
                  <Input
                    name={'trackingCode'}
                    placeholder={t('notifications.modal.trackingPlaceholder')}
                    label={t('notifications.modal.trackingLabel')}
                    formik={formik}
                  />
                  {variant === 'support' && (
                    <>
                      <Input
                        name={'fullName'}
                        placeholder={t('profile.support.form.fullNamePlaceholder')}
                        label={t('profile.support.form.fullNameLabel')}
                        formik={formik}
                      />
                      <Select
                        placeholder={t('profile.support.form.cityPlaceholder')}
                        options={options}
                        setValue={value => formik.setFieldValue('city', value)}
                        label={t('profile.support.form.cityLabel')}
                      />
                    </>
                  )}
                  <TextArea
                    label={t('notifications.modal.messageLabel')}
                    value={formik.values.message}
                    onChangeText={formik.handleChange('message')}
                    placeholder={t('notifications.modal.messagePlaceholder')}
                  />
                </View>
              )}
              <View style={styles.footer}>
                <Button variant='primary' onPress={formik.handleSubmit} size={'md'}>
                  {t(message ? 'common.back' : 'common.send')}
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NotificationsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modal.overlay,
    justifyContent: 'flex-end',
  },
  modal: {
    maxHeight: '80%',
    width: '100%',
    backgroundColor: Colors.modal.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 22,
  },
  body: {
    gap: 22,
  },
  footer: {
    marginVertical: 44,
  },
  black: {
    color: Colors.text.black,
  },
  gapSm: {
    gap: 6,
  },
  full: { flex: 1 },
  container: {
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
});
