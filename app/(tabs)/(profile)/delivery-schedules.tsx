import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, TextInput } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import RegionCard from '@/components/schedule/RegionCard';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MOCK_SCHEDULES } from '@/constants/schedules';

export default function DeliverySchedulesScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();

  const [search, setSearch] = React.useState('');

  const paddingBottom = Platform.OS === 'ios' ? tabBarHeight + 18 : 18;

  const filtered = MOCK_SCHEDULES.filter(
    s =>
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.cityEn.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce(
    (acc: Record<string, typeof filtered>, item) => {
      if (!acc[item.region]) acc[item.region] = [];
      acc[item.region]?.push(item);
      return acc;
    },
    {} as Record<string, typeof filtered>
  );

  const regions = Object.keys(grouped);

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('schedules.title')} hasGoBack />

      <ContentView>
        <FlatList
          data={regions}
          keyExtractor={item => item}
          contentContainerStyle={[styles.content, { paddingBottom }]}
          ListHeaderComponent={
            <TextInput
              placeholder={t('schedules.searchPlaceholder')}
              style={styles.search}
              value={search}
              onChangeText={setSearch}
            />
          }
          renderItem={({ item }) => <RegionCard region={item} cities={grouped[item] ?? []} />}
        />
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 18,
    gap: 14,
  },

  search: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
});
