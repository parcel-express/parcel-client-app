import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';

import Calendar from '@/components/Calendar';
import StackedBarWithAxes from '@/components/Chart';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

export default function HomeScreen() {
  const tabHeight = useBottomTabBarHeight();
  const paddingBottom = Platform.OS === 'ios' ? tabHeight : 0;
  const { t } = useTranslation();
  const [date, setDate] = React.useState<{ start?: string; end?: string }>({});

  const [chartData, setChartData] = React.useState<
    { month: string; listenCount: number; like: number; dislike: number }[]
  >([]);
  const colorScheme = [
    Colors.charts.primaryScheme.first,
    Colors.charts.primaryScheme.second,
    Colors.charts.primaryScheme.end,
  ];
  const legend = [
    { title: t('home.submitted'), color: colorScheme[0] },
    { title: t('home.undeliverable'), color: colorScheme[1] },
    { title: t('home.current'), color: colorScheme[2] },
  ];

  const BalanceCard = ({ title }: { title: string }) => {
    return (
      <View style={styles.balanceCard}>
        <View style={styles.balanceCardHeader}>
          <Text style={[Typography.textSmSemiBold, styles.black]}> {title} </Text>
        </View>
        <View style={[styles.balanceContainer, styles.balanceCard]}>
          <Text style={styles.balance}>0.00</Text>
        </View>
      </View>
    );
  };
  const balance = {
    title: t('home.currencyBalance'),
  };
  const serviceBalance = {
    title: t('home.serviceBalance'),
  };
  const totalBalance = {
    title: t('home.totalBalance'),
  };
  const data = [balance, serviceBalance, totalBalance];
  useEffect(() => {
    const getMonthName = () => {
      const startingMonth = date.start ? new Date(date.start).getMonth() : null;
      const endingMonth = date.end ? new Date(date.end).getMonth() : null;
      return [startingMonth, endingMonth];
    };
    const data = [
      { month: t('months.january'), listenCount: 30, like: 50, dislike: 70 },
      { month: t('months.february'), listenCount: 35, like: 0, dislike: 90 },
      { month: t('months.march'), listenCount: 18, like: 38, dislike: 46 },
      { month: t('months.april'), listenCount: 30, like: 50, dislike: 70 },
      { month: t('months.may'), listenCount: 40, like: 50, dislike: 50 },
      { month: t('months.june'), listenCount: 43, like: 70, dislike: 40 },
      { month: t('months.july'), listenCount: 50, like: 30, dislike: 20 },
      { month: t('months.august'), listenCount: 70, like: 60, dislike: 30 },
      { month: t('months.september'), listenCount: 40, like: 20, dislike: 10 },
      { month: t('months.october'), listenCount: 60, like: 50, dislike: 20 },
      { month: t('months.november'), listenCount: 75, like: 80, dislike: 30 },
      { month: t('months.december'), listenCount: 50, like: 30, dislike: 40 },
    ];
    const filtered = data.filter((_, index) => {
      const [startMonth, endMonth] = getMonthName();

      if (startMonth === null || endMonth === null) return true;
      if (startMonth === undefined || endMonth === undefined) return true;
      if (startMonth === endMonth) {
        return index === startMonth;
      }
      return index >= startMonth && index <= endMonth;
    });

    setChartData(filtered);
  }, [date, t]);

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('home.title')} />
      <ContentView style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <BalanceCard title={item.title} />}
          contentContainerStyle={[styles.body, { paddingBottom }]}
          ListHeaderComponentStyle={styles.headerContainer}
          ListHeaderComponent={
            <>
              <Text style={[Typography.title]}>{t('home.statistic')}</Text>
              <View style={styles.calendarContainer}>
                <Calendar
                  onSave={(start, end) =>
                    setDate({ ...(start ? { start } : {}), ...(end ? { end } : {}) })
                  }
                />
              </View>

              <View style={styles.legendContainer}>
                {legend.map((item, index) => (
                  <View key={index.toString()} style={styles.row}>
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                    <Text style={[Typography.textXsRegular, { color: Colors.text.tertiary }]}>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>

              <StackedBarWithAxes data={chartData} colors={colorScheme} />
            </>
          }
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
    paddingVertical: 18,
  },
  body: {
    gap: 16,
    paddingHorizontal: 18,
  },
  balanceCard: {
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    borderRadius: 12,
    ...Shadows.shadow_xs,
    backgroundColor: Colors.background.secondarySubtle,
  },

  balanceCardHeader: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 12,
  },

  balanceContainer: {
    paddingTop: 48,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    borderRadius: 8,
  },
  balance: {
    fontSize: 28,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  black: { color: Colors.text.black },
  headerContainer: {
    gap: 12,
  },
  calendarContainer: {
    maxWidth: 255,
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dot: { width: 8, height: 8, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
