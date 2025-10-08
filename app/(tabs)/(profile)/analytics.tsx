import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Calendar from '@/components/Calendar';
import StackedBarWithAxes from '@/components/Chart';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Legend from '@/components/ui/Legend';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import useChartData from '@/hooks/useChartData';

export default function AnalyticsScreen() {
  const { t } = useTranslation();
  const paddingBottom = useBottomTabBarHeight();
  const [date, setDate] = React.useState<{ start?: string | undefined; end?: string | undefined }>(
    {}
  );
  const chartData = useChartData(date);
  const colorScheme = [
    Colors.charts.primaryScheme.first,
    Colors.charts.primaryScheme.second,
    Colors.charts.primaryScheme.end,
  ];
  const secondaryColorScheme = [
    Colors.charts.secondaryScheme.first,
    Colors.charts.secondaryScheme.second,
    Colors.charts.secondaryScheme.end,
  ];
  const greenColorScheme = [Colors.charts.green, Colors.charts.green, Colors.charts.green];

  return (
    <ThemedView style={styles.container}>
      <Header title={t('profile.easyAuth.title')} hasGoBack />
      <ContentView>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom }]}>
          <View style={styles.chartContainer}>
            <View style={styles.legend}>
              <Calendar onSave={(start, end) => setDate({ start, end })} />
              <Legend colorScheme={colorScheme} />
            </View>
            <StackedBarWithAxes data={chartData} colors={colorScheme} />
          </View>
          <View style={styles.chartContainer}>
            <Text style={[Typography.textLgSemiBold, { color: Colors.text.primary }]}>
              {t('profile.analytics.cityTitle')}
            </Text>
            <StackedBarWithAxes data={chartData} colors={secondaryColorScheme} />
          </View>
          <View style={styles.chartContainer}>
            <Text style={[Typography.textLgSemiBold, { color: Colors.text.primary }]}>
              {t('profile.analytics.dailyTitle')}
            </Text>
            <StackedBarWithAxes data={chartData} colors={greenColorScheme} />
          </View>
        </ScrollView>
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
    gap: 22,
  },
  legend: {
    gap: 19,
  },
  chartContainer: {
    gap: 12,
  },
});
