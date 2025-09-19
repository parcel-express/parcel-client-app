import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import { IconProps } from '../icons/types';
import { ThemedText } from '../ThemedText';

type Props = {
  tab: {
    iconName: React.ComponentType<IconProps>;
    titleKey: string;
    action?: () => void;
    showBadge?: boolean;
  };
  rightAccessory?: React.ReactNode;
};

const TabButton = ({ tab, rightAccessory }: Props) => {
  const { t } = useTranslation();
  const disabled = !tab.action;
  return (
    <Pressable
      style={styles.menuItem}
      onPress={tab.action}
      disabled={disabled}
      focusable={!disabled}
      accessibilityRole='button'
      accessibilityLabel={t(tab.titleKey)}
      accessibilityState={{ disabled }}
      hitSlop={8}
    >
      <View style={styles.menuItemContent}>
        {<tab.iconName />}
        <ThemedText style={styles.menuItemTitle}>{t(tab.titleKey)}</ThemedText>
      </View>
      {tab.showBadge && (
        <View style={styles.badge}>
          <View style={styles.onlineDot} />
          <ThemedText style={Typography.textXsMedium}>{t('profile.contact.online')}</ThemedText>
        </View>
      )}
      {rightAccessory}
    </Pressable>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 17.5,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: Colors.background.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    backgroundColor: Colors.background.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background.successSecondary,
  },
});
