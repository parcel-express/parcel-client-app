import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Tab } from '@/app/types/orderTypes';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

type Props = {
  tabs: { label: string; value: Tab }[];
  activeTab?: Tab;
  onChange?: (value: Tab) => void;
};

const TabSwitcher = ({ tabs, activeTab, onChange }: Props) => {
  const TabButton = ({
    children,
    isActive,
    value,
  }: {
    children: string;
    isActive: boolean;
    value: string;
  }) => (
    <TouchableOpacity
      onPress={onChange ? () => onChange(value as Tab) : undefined}
      style={[styles.tabButton, isActive ? styles.activeColor : styles.inactiveColor]}
    >
      <Text
        style={[
          isActive ? Typography.textXsSemiBold : Typography.textXsMedium,
          { color: Colors.text.secondary },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {tabs.slice(0, 3).map(tab => (
        <TabButton key={tab.value} isActive={tab.value === activeTab} value={tab.value}>
          {tab.label}
        </TabButton>
      ))}
    </View>
  );
};

export default TabSwitcher;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 0.74,
    borderColor: Colors.border.primary,
    borderRadius: 6,
    ...Shadows.shadow_xs,
    overflow: 'hidden',
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: Colors.border.primary,
    borderRightWidth: 0.74,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeColor: {
    backgroundColor: Colors.background.disabled,
  },
  inactiveColor: {
    backgroundColor: Colors.background.white,
  },
});
