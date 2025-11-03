import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';

import Calendar from '@/components/Calendar';
import StackedBarWithAxes from '@/components/Chart';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import Legend from '@/components/ui/Legend';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';
import useChartData from '@/hooks/useChartData';

export default function HomeScreen() {
  const tabHeight = useBottomTabBarHeight();
  const paddingBottom = Platform.OS === 'ios' ? tabHeight + 18 : 18;
  const { t } = useTranslation();
  const [date, setDate] = React.useState<{ start?: string; end?: string }>({});
  const chartData = useChartData(date);
  const colorScheme = [
    Colors.charts.primaryScheme.first,
    Colors.charts.primaryScheme.second,
    Colors.charts.primaryScheme.end,
  ];

  const BalanceCard = ({ title }: { title: string }) => {
    return (
      <View style={styles.balanceCard}>
        <View style={styles.balanceCardHeader}>
          <Text style={[Typography.textSmSemiBold, styles.black]}> {title} </Text>
        </View>
        <View style={[styles.balanceContainer]}>
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

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('home.title')} />
      <ContentView>
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

              <Legend colorScheme={colorScheme} />

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
  body: {
    gap: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  balanceCard: {
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    borderRadius: 12,
    backgroundColor: Colors.background.secondarySubtle,
    ...Shadows.shadow_xs,
  },

  balanceCardHeader: {
    paddingHorizontal: 14,
    paddingBottom: 8,
    paddingTop: 12,
  },

  balanceContainer: {
    paddingTop: 48,
    padding: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.border.disabledBorder,
    borderRadius: 12,
    marginHorizontal: -1,
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
});
