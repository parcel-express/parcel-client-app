import { StyleSheet } from 'react-native';

import { Colors } from './Colors';

const textXs = {
  fontFamily: 'Inter',
  fontSize: 12,
  letterSpacing: 0,
};
const textSm = {
  fontFamily: 'Inter',
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0,
};
const textMd = {
  fontFamily: 'Inter',
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
};
const textLg = {
  fontFamily: 'Inter',
  fontSize: 18,
  lineHeight: 28,
  letterSpacing: 0,
};

export const Typography = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    color: Colors.login.title,
  },
  textXsMedium: {
    ...textXs,
    fontWeight: '500',
    lineHeight: 16,
  },
  textXsSemiBold: {
    ...textXs,
    fontWeight: '500',
    lineHeight: 16,
  },
  textXsRegular: {
    ...textXs,
    fontWeight: '400',
    lineHeight: 16,
  },
  textMdRegular: {
    ...textMd,
    fontWeight: '400',
  },
  textMdMedium: {
    ...textMd,
    fontWeight: '500',
  },
  textMdBold: {
    ...textMd,
    fontWeight: '700',
  },
  textLgRegular: {
    ...textLg,
    fontWeight: '400',
  },
  textSmRegular: {
    ...textSm,
    fontWeight: '400',
  },
  textSmMedium: {
    ...textSm,
    fontWeight: '500',
  },
  textSmSemiBold: {
    ...textSm,
    fontWeight: '600',
  },
  textSmBold: {
    ...textSm,
    fontWeight: '700',
  },
  textMdSemiBold: {
    ...textMd,
    fontWeight: '600',
  },
  textLgSemiBold: {
    ...textLg,
    fontWeight: '600',
  },
});
