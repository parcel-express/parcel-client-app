import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import { ThemedText } from '../ThemedText';

type Props = {
  tab: {
    iconName: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
    titleKey: string;
    action: () => void;
    showBadge?: boolean;
  };
};

const TabButton = ({ tab }: Props) => {
  const { t } = useTranslation();
  return (
    <Pressable
      key={tab.titleKey}
      style={styles.menuItem}
      onPress={tab.action}
      accessibilityRole='button'
      accessibilityLabel={t(tab.titleKey)}
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
