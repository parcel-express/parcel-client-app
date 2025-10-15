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
  return (
    <View style={styles.container}>
      {tabs.slice(0, 3).map(tab => (
        <TouchableOpacity
          onPress={onChange ? () => onChange(tab.value) : undefined}
          style={[
            styles.tabButton,
            tab.value === activeTab ? styles.activeColor : styles.inactiveColor,
          ]}
          key={tab.value}
        >
          <Text
            style={[
              tab.value === activeTab ? Typography.textXsSemiBold : Typography.textXsMedium,
              { color: Colors.text.secondary },
            ]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 4,
    borderColor: Colors.border.primary,
    borderWidth: 0.74,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  activeColor: {
    backgroundColor: Colors.background.disabled,
  },
  inactiveColor: {
    backgroundColor: Colors.background.white,
  },
});
