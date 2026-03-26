import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export const addressesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modal.overlay,
  },
  modalContent: {
    backgroundColor: Colors.background.white,
    padding: 24,
    borderRadius: 12,
    minWidth: 300,
  },
  modalTitle: {
    ...Typography.textLgBold,
    marginBottom: 8,
    color: Colors.text.primary,
  },
  modalSubtitle: {
    ...Typography.textSmRegular,
    color: Colors.text.tertiary,
    marginBottom: 16,
  },
  modalCancelBtn: {
    marginTop: 16,
  },
  modalCancelText: {
    color: Colors.brand.primary,
    textAlign: 'right',
    ...Typography.textSmMedium,
  },
});
