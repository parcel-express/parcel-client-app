import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';

export const addressListStyles = StyleSheet.create({
  swipeContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  swipeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  editBtn: {
    backgroundColor: Colors.text.success,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  deleteBtn: {
    backgroundColor: Colors.text.error.primary,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  actionText: {
    color: Colors.background.white,
    fontWeight: '600',
  },
});
