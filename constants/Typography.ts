import { StyleSheet } from 'react-native';

import { Colors } from './Colors';

const text_sm = {
  fontFamily: 'Inter',
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0,
};
const text_md = {
  fontFamily: 'Inter',
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
};
const text_lg = {
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
  text_xs_medium: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  text_md_regular: {
    ...text_md,
    fontWeight: '400',
  },
  text_md_medium: {
    ...text_md,
    fontWeight: '500',
  },
  text_lg_regular: {
    ...text_lg,
    fontWeight: '400',
  },
  text_sm_regular: {
    ...text_sm,
    fontWeight: '400',
  },
  text_sm_semiBold: {
    ...text_sm,
    fontWeight: '600',
  },
  text_md_semiBold: {
    ...text_md,
    fontWeight: '600',
  },
  text_lg_semiBold: {
    ...text_lg,
    fontWeight: '600',
  },
});
