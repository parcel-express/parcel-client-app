import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import SettingsButton from '@/components/SettingsButton';
import { ThemedView } from '@/components/ThemedView';
import NotificationCard from '@/components/ui/NotificationCard';
import { Colors } from '@/constants/Colors';

export default function SupportScreen() {
  const [isModalVisible, setModalIsVisible] = React.useState(false);
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === 'ios' ? tabBarHeight + insets.bottom : insets.bottom;
  const message =
    'მოგესალმებით, გაცნობებთ, რომ შეიცვლა გუდაურის და ყაზბეგის მიწოდების დრო, ხუთშაბათის ნაცვლად ამანათები ჩაბარდება პარასკევ დღეს. ასევე იცვლება ამ რეგიონებთან დაკავშირებული სოფლების მიწოდების დღეც. გთხოვთ გაითვალისწინოთ და გააფრთხილოთ მომხმარებლები. პატ';
  const data = [
    {
      id: 1,
      message,
    },
    {
      id: 2,
      message,
    },
    {
      id: 3,
      message,
    },
  ];
  const openModal = () => setModalIsVisible(true);

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('notifications.title')} />
      {isModalVisible && <Text>Modal is open</Text>}
      <ContentView>
        <FlatList
          data={data}
          ListHeaderComponent={
            <SettingsButton onPress={openModal}>
              {t('notifications.sendNotification')}
            </SettingsButton>
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <NotificationCard message={item.message} onPress={openModal} />}
          contentContainerStyle={[styles.cardsContainer, { paddingBottom: bottomPad }]}
        />
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    padding: 18,
    gap: 14,
  },
});
