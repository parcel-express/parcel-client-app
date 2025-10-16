import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import SettingsButton from '@/components/SettingsButton';
import { ThemedView } from '@/components/ThemedView';
import NotificationCard from '@/components/ui/NotificationCard';
import NotificationsModal from '@/components/ui/NotificationsModal';
import { Colors } from '@/constants/Colors';
type Notification = {
  id: number;
  message: string;
  fullMessage: string;
};
export default function NotificationScreen() {
  const [isModalVisible, setModalIsVisible] = React.useState(false);
  const [activeNotification, setActiveNotification] = React.useState<Notification | null>(null);
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const paddingBottom = Platform.OS === 'ios' ? tabBarHeight + 18 : 18;

  const message =
    'მოგესალმებით, გაცნობებთ, რომ შეიცვლა გუდაურის და ყაზბეგის მიწოდების დრო, ხუთშაბათის ნაცვლად ამანათები ჩაბარდება პარასკევ დღეს. ასევე იცვლება ამ რეგიონებთან დაკავშირებული სოფლების მიწოდების დღეც. გთხოვთ გაითვალისწინოთ და გააფრთხილოთ მომხმარებლები. პატ';
  const data = [
    {
      id: 1,
      message,
      fullMessage: message + message + message,
    },
    {
      id: 2,
      message,
      fullMessage: message + message + message,
    },
    {
      id: 3,
      message,
      fullMessage: message + message + message,
    },
  ];
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => (setModalIsVisible(false), setActiveNotification(null));
  const onViewPress = (notification: Notification) => {
    setActiveNotification(notification);
    openModal();
  };
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('notifications.title')} />
      <NotificationsModal
        visible={isModalVisible}
        onClose={closeModal}
        message={activeNotification?.fullMessage ?? undefined}
      />

      <ContentView>
        <FlatList
          data={data}
          ListHeaderComponent={
            <SettingsButton onPress={openModal}>
              {t('notifications.sendNotification')}
            </SettingsButton>
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationCard message={item.message} onPress={() => onViewPress(item)} />
          )}
          contentContainerStyle={[styles.cardsContainer, { paddingBottom }]}
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
