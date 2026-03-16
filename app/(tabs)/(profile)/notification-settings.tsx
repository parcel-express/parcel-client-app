import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Switch, Text, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import {
  NOTIFICATION_CATEGORIES,
  useNotificationPreferences,
} from '@/hooks/useNotificationPreferences';

const NotificationRow = ({ category, value, onChange, disabled }: any) => {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={Typography.textMdMedium}>{t(category.titleKey)}</Text>

        <Text style={[Typography.textSmRegular, { color: Colors.text.secondary }]}>
          {t(category.descriptionKey)}
        </Text>
      </View>

      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        trackColor={{
          false: Colors.border.disabledBorder,
          true: Colors.brand.primary,
        }}
        thumbColor={Colors.background.white}
      />
    </View>
  );
};

export default function NotificationSettingsScreen() {
  const { t } = useTranslation();

  const { preferences, loading, updatePreference, setAll, allEnabled } =
    useNotificationPreferences();

  if (loading) return null;

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('notificationSettings.title')} />

      <ContentView>
        {/* MASTER TOGGLE */}

        <View style={styles.masterRow}>
          <Text style={Typography.textMdMedium}>{t('notificationSettings.enableAll')}</Text>

          <Switch
            value={allEnabled}
            onValueChange={setAll}
            trackColor={{
              false: Colors.border.disabledBorder,
              true: Colors.brand.primary,
            }}
            thumbColor={Colors.background.white}
          />
        </View>

        {/* CATEGORY TOGGLES */}

        {NOTIFICATION_CATEGORIES.map(category => (
          <NotificationRow
            key={category.key}
            category={category}
            value={preferences[category.key]}
            disabled={!allEnabled}
            onChange={(val: boolean) => updatePreference(category.key, val)}
          />
        ))}
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  masterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: Colors.border.primary,
  },

  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
});
