import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type {
  AddressesProps,
  InvoicesProps,
  OrderProps,
  TariffsProps,
} from '@/app/types/cardTypes';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';

import CardView from './CardView';
import Tag from './Tag';

type Props = InvoicesProps | AddressesProps | TariffsProps | OrderProps;
const sizes: Record<
  Props['variant'],
  { header: { paddingBottom: number }; body: { paddingTop: number }; paddingBottom: number }
> = {
  orders: { header: { paddingBottom: 20 }, body: { paddingTop: 20 }, paddingBottom: 16 },
  tariffs: { header: { paddingBottom: 20 }, body: { paddingTop: 20 }, paddingBottom: 16 },
  invoices: { header: { paddingBottom: 18 }, body: { paddingTop: 20 }, paddingBottom: 22 },
  addresses: { header: { paddingBottom: 24 }, body: { paddingTop: 14 }, paddingBottom: 24 },
};
const Card = (props: Props) => {
  const { t } = useTranslation();
  const { variant, data } = props;
  const Icon = ({ receiver }: { receiver?: boolean }) => (
    <LinearGradient
      colors={[Colors.gradient.primary.start, Colors.gradient.primary.end]}
      style={styles.orderIcon}
    >
      <View style={[styles.dot, receiver && styles.bigDot]}></View>
    </LinearGradient>
  );
  return (
    <CardView style={{ paddingBottom: sizes[variant].paddingBottom }}>
      <View style={[styles.header, sizes[variant].header, variant === 'addresses' && styles.gapMd]}>
        <View style={[styles.row, styles.spaceBetween]}>
          <View>
            {variant === 'tariffs' && (
              <Text style={[Typography.textSmRegular, styles.tertiary]}>{data.description}</Text>
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
            (variant === 'invoices' || variant === 'orders') && (
              <Tag label={data.status} variant={data.statusVariant} />
            )
          )}
        </View>
        {variant === 'addresses' && (
          <View style={styles.gapSm}>
            <Text style={[Typography.textXsMedium, styles.tertiary]}>
              {t('profile.addresses.address')}
            </Text>
            <Text style={[Typography.textSmBold, { color: Colors.text.primary }]}>
              {data.address}
            </Text>
          </View>
        )}
        {variant === 'orders' && (
          <View style={styles.orderContainer}>
            <View>
              <Icon />
              <View style={styles.line} />
              <Icon receiver />
            </View>
            <View style={styles.gapMd}>
              <View>
                <View style={[styles.row, styles.gapSm]}>
                  <Text style={[Typography.textXsMedium, styles.tertiary]}>
                    {t('orders.sender')}
                  </Text>
                  <View style={styles.dividerDot} />
                  <Text style={[Typography.textXsMedium, styles.tertiary]}>{data.sender.name}</Text>
                </View>
                <Text style={[Typography.textSmMedium, styles.tertiary]}>
                  {data.sender.address}
                </Text>
              </View>
              <View>
                <View style={[styles.row, styles.gapSm]}>
                  <Text style={[Typography.textXsMedium, styles.tertiary]}>
                    {t('orders.sender')}
                  </Text>
                  <View style={styles.dividerDot} />
                  <Text style={[Typography.textXsMedium, styles.tertiary]}>{data.sender.name}</Text>
                </View>
                <Text style={[Typography.textSmMedium, styles.tertiary]}>
                  {data.sender.address}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={[styles.gapMd, sizes[variant].body]}>
        {data.body.map((item, idx) => (
          <View
            style={[styles.row, styles.spaceBetween]}
            key={`${item.label}-${item.value}-${idx}`}
          >
            <Text style={[Typography.textXsRegular, styles.tertiary]}>{item.label}</Text>
            <Text style={[Typography.textXsRegular, styles.tertiary]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </CardView>
  );
};

export default React.memo(Card);
const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.border.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
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
  tertiary: {
    color: Colors.text.tertiary,
  },
  orderContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 8,
  },
  orderIcon: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: Colors.background.white,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  bigDot: {
    width: 14,
    height: 14,
    top: 1,
    left: 1,
  },
  line: {
    width: 2,
    height: 43,
    backgroundColor: Colors.background.black,
    opacity: 0.1,
    marginLeft: 7,
  },
  dividerDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.text.tertiary,
  },
});
