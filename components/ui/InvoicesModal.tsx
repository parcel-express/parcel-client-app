import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import FileDown from '../icons/FileDown';
import PrinterIcon from '../icons/PrinterIcon';
import XIcon from '../icons/XIcon';

import Button from './Button';
import CardView from './CardView';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
};

const InvoicesModal = ({ visible, onClose, title }: Props) => {
  const { t } = useTranslation();
  const invoiceData = [
    {
      label: t('profile.invoices.orderName'),
      value: 'შპს ამანათი',
    },
    {
      label: t('profile.invoices.orderCode'),
      value: '#223394',
    },
    {
      label: t('profile.invoices.name'),
      value: 'შპს ონვეი',
    },
    { label: t('profile.invoices.taxNumber'), value: '545455656' },
    { label: t('profile.invoices.bankAccount'), value: 'GE29TB7190109400000003' },
    { label: t('profile.invoices.services'), value: 'მიწოდება' },
    { label: t('profile.invoices.total'), value: '$12.00' },
  ];

  const financialDetails = [
    {
      label: t('profile.invoices.commission'),
      value: '12.00₾',
    },
    {
      label: t('profile.invoices.additionalServices'),
      value: '12.00₾',
    },
    {
      label: t('profile.invoices.total'),
      value: '12.00₾',
    },
    {
      label: t('profile.invoices.paidAmount'),
      value: '0.00₾',
      color: Colors.text.success,
    },
    {
      label: t('profile.invoices.amountDue'),
      value: '12.00₾',
      color: Colors.text.danger,
    },
  ];

  return (
    <Modal visible={visible} transparent animationType='slide' onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modal}>
          <View style={styles.row}>
            <Text style={[Typography.textMdSemiBold, styles.black]}>{title}</Text>

            <TouchableOpacity onPress={onClose}>
              <XIcon width={12} height={12} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.body}>
            {/* INVOICE HEADER */}
            <CardView style={styles.gapLg}>
              <View style={styles.gapSm}>
                <Text style={[Typography.textSmSemiBold]}>
                  <Text style={[Typography.textSmMedium]}>{t('profile.invoices.order')}:</Text>{' '}
                  #223394
                </Text>
                <Text style={[Typography.textXsRegular, { color: Colors.text.secondary }]}>
                  {t('profile.invoices.date')}: 19.07.2025
                </Text>
              </View>
              <View style={styles.buttonRow}>
                <View style={styles.twoFull}>
                  <Button
                    variant='secondary'
                    size='sm'
                    onPress={() => {}}
                    leftIcon={<FileDown width={18} height={18} strokeWidth={1.5} />}
                  >
                    {t('profile.invoices.downloadReport')}
                  </Button>
                </View>
                <View style={styles.full}>
                  <Button
                    variant='secondary'
                    size='sm'
                    onPress={() => {}}
                    leftIcon={<PrinterIcon stroke={Colors.icon.black} />}
                  >
                    {t('profile.invoices.print')}
                  </Button>
                </View>
              </View>
            </CardView>

            {/* INVOICE BODY */}
            <CardView style={styles.card}>
              {invoiceData.map((item, index) => (
                <View style={styles.cardRow} key={item.label}>
                  <Text
                    style={[
                      index === 0 ? Typography.textSmBold : Typography.textSmMedium,
                      styles.black,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={[
                      index === 0 ? Typography.textSmBold : Typography.textSmMedium,
                      styles.black,
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </CardView>

            {/* FINANCES */}
            <View style={styles.section}>
              <Text style={[Typography.textSmBold]}>{t('profile.invoices.financialDetails')}</Text>
              <CardView style={styles.card}>
                {financialDetails.map(item => (
                  <View style={styles.cardRow} key={item.label}>
                    <Text style={[Typography.textSmRegular, { color: Colors.text.tertiary }]}>
                      {item.label}
                    </Text>
                    <Text
                      style={[
                        Typography.textSmBold,
                        item.color ? { color: item.color } : styles.black,
                      ]}
                    >
                      {item.value}
                    </Text>
                  </View>
                ))}
              </CardView>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default InvoicesModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modal.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    backgroundColor: Colors.modal.background,
    borderRadius: 12,
    height: '85%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  black: {
    color: Colors.text.black,
  },
  body: {
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 38,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  gapLg: {
    gap: 20,
  },
  gapSm: {
    gap: 4,
  },
  full: {
    flex: 1,
  },
  twoFull: {
    flex: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    gap: 14,
  },
  section: { marginTop: 10, gap: 14 },
});
