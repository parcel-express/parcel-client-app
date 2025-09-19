import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Address } from '@/app/(tabs)/(profile)/addresses';
import type { Invoice } from '@/app/(tabs)/(profile)/invoices';
import { Tariffs } from '@/app/(tabs)/(profile)/tariffs';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';

import CardView from './CardView';
import Tag, { TagVariant } from './Tag';
type Invoices = {
  variant: 'invoices';
  data: Invoice;
  status: string;
  statusVariant: TagVariant;
};
type Addresses = {
  variant: 'addresses';
  data: Address;
  onEditPress: () => void;
  onDeletePress: () => void;
};
type TariffsType = {
  variant: 'tariffs';
  data: Tariffs;
};
type Default = {
  variant: 'default';
  data: { title: string; body: { label: string; value: string }[] };
};

type Props = Invoices | Addresses | TariffsType | Default;
const sizes: Record<
  Props['variant'],
  { header: { paddingBottom: number }; body: { paddingTop: number }; paddingBottom: number }
> = {
  tariffs: { header: { paddingBottom: 20 }, body: { paddingTop: 20 }, paddingBottom: 16 },
  default: { header: { paddingBottom: 20 }, body: { paddingTop: 20 }, paddingBottom: 16 },
  invoices: { header: { paddingBottom: 18 }, body: { paddingTop: 20 }, paddingBottom: 22 },
  addresses: { header: { paddingBottom: 24 }, body: { paddingTop: 14 }, paddingBottom: 24 },
};
const Card = (props: Props) => {
  const { t } = useTranslation();
  const { variant, data } = props;
  return (
    <CardView style={{ paddingBottom: sizes[variant].paddingBottom }}>
      <View style={[styles.header, sizes[variant].header, variant === 'addresses' && styles.gapMd]}>
        <View style={styles.row}>
          <View>
            {variant === 'tariffs' && (
              <Text style={[Typography.textSmRegular, styles.teritary]}>{data.description}</Text>
            )}
            <Text style={variant === 'tariffs' ? Typography.textSmBold : Typography.textSmMedium}>
              {data.title}
            </Text>
          </View>
          {variant === 'addresses' ? (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={props.onDeletePress}
                accessibilityRole='button'
                accessibilityLabel={t('profile.addresses.delete')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <TrashIcon />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.onEditPress}
                accessibilityRole='button'
                accessibilityLabel={t('common.edit')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <PencilIcon />
              </TouchableOpacity>
            </View>
          ) : (
            variant === 'invoices' && <Tag label={props.status} variant={props.statusVariant} />
          )}
        </View>
        {variant === 'addresses' && 'address' in data && (
          <View style={styles.gapSm}>
            <Text style={[Typography.textXsMedium, styles.teritary]}>
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
          <View style={styles.row} key={`${item.label}-${item.value}-${idx}`}>
            <Text style={[Typography.textXsRegular, styles.teritary]}>{item.label}</Text>
            <Text style={[Typography.textXsRegular, styles.teritary]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </CardView>
  );
};

export default Card;
const styles = StyleSheet.create({
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
  teritary: {
    color: Colors.text.tertiary,
  },
});
