import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
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
};

const NotificationsModal: React.FC<Props> = ({ visible, onClose, message }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: '',
      trackingCode: '',
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
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.full} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.gapSm}>
              <Text style={[Typography.textMdSemiBold, styles.black]}>
                {t(message ? 'notifications.modal.messageLabel' : 'notifications.modal.sendTitle')}
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
        </View>
      </View>
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
    borderRadius: 12,
    padding: 24,
    paddingBottom: 44,
    paddingHorizontal: 18,
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
    marginTop: 44,
  },
  black: {
    color: Colors.text.black,
  },
  gapSm: {
    gap: 6,
  },
  full: { flex: 1 },
});
