import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

export default function HomeScreen() {
  const { t } = useTranslation();
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
          contentContainerStyle={styles.body}
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
});
