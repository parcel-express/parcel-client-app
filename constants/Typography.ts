import { StyleSheet } from 'react-native';

import { Colors } from './Colors';

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
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  textMdRegular: {
    ...textMd,
    fontWeight: '400',
  },
  textMdMedium: {
    ...textMd,
    fontWeight: '500',
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
  textMdSemiBold: {
    ...textMd,
    fontWeight: '600',
  },
  textLgSemiBold: {
    ...textLg,
    fontWeight: '600',
  },
});
