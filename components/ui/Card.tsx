import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Address } from '@/app/(tabs)/(profile)/addresses';
import { Invoice } from '@/app/(tabs)/(profile)/invoices';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';

import Tag from './Tag';

type Props = {
  variant: 'default' | 'invoices' | 'addresses';
  onEditPress?: () => void;
  onDeletePress?: () => void;
  data: Address | Invoice;
  status?: string;
  statusVariant?: 'success' | 'warning' | 'danger';
};
const sizes: Record<
  Props['variant'],
  { header: { paddingBottom: number }; body: { paddingTop: number }; paddingBottom: number }
> = {
  default: { header: { paddingBottom: 20 }, body: { paddingTop: 20 }, paddingBottom: 16 },
  invoices: { header: { paddingBottom: 18 }, body: { paddingTop: 20 }, paddingBottom: 22 },
  addresses: { header: { paddingBottom: 24 }, body: { paddingTop: 14 }, paddingBottom: 24 },
};
const Card = ({
  variant = 'default',
  onEditPress,
  onDeletePress,
  data,
  status = 'Success',
  statusVariant = 'success',
}: Props) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.card, { paddingBottom: sizes[variant].paddingBottom }]}>
      <View style={[styles.header, sizes[variant].header, variant === 'addresses' && styles.gapMd]}>
        <View style={styles.row}>
          <Text style={Typography.textSmMedium}>{data.title}</Text>
          {variant === 'addresses' ? (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={onDeletePress}
                accessibilityRole='button'
                accessibilityLabel='Delete address'
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <TrashIcon />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onEditPress}
                accessibilityRole='button'
                accessibilityLabel='Edit address'
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <PencilIcon />
              </TouchableOpacity>
            </View>
          ) : (
            <Tag label={status} variant={statusVariant} />
          )}
        </View>
        {variant === 'addresses' && 'address' in data && (
          <View style={styles.gapSm}>
            <Text style={[Typography.textXsMedium, { color: Colors.text.tertiary }]}>
              {t('profile.addresses.address')}
            </Text>
            <Text style={[Typography.textSmBold, { color: Colors.text.primary }]}>
              {data.address}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.gapMd, sizes[variant].body]}>
        {data?.body?.map((item, idx) => (
          <View style={styles.row} key={`${item.label}-${idx}`}>
            <Text style={Typography.textXsRegular}>{item.label}</Text>
            <Text style={Typography.textXsRegular}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    ...Shadows.shadow_xs,
    backgroundColor: Colors.background.white,
    padding: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.border.card,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  gapMd: {
    gap: 16,
  },
  gapSm: {
    gap: 7,
  },
});
