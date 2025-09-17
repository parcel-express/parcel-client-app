import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import MarkerPinIconLarge from './icons/MarkerPinIconLarge';
import SettingsButton from './SettingsButton';

const NoAddresses = ({ onPress }: { onPress: () => void }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.emptyDataContainer}>
      <View style={styles.content}>
        <MarkerPinIconLarge stroke={Colors.icon.black} />
        <View style={styles.textContainer}>
          <Text style={[Typography.textSmBold, styles.middle]}>
            {t('profile.addresses.noAddressTitle')}
          </Text>
          <Text style={[Typography.textXsRegular, styles.middle]}>
            {t('profile.addresses.noAddressesMessage')}
          </Text>
        </View>
      </View>
      <SettingsButton onPress={onPress}>{t('profile.addresses.addBranch')}</SettingsButton>
    </View>
  );
};

export default NoAddresses;
const styles = StyleSheet.create({
  emptyDataContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 48,
    justifyContent: 'center',
    marginBottom: 52,
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  textContainer: {
    maxWidth: 305,
    gap: 6,
  },
  middle: {
    textAlign: 'center',
  },
});
