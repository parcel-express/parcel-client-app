import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Address } from '@/app/types/cardTypes';
import { AddressOnboarding } from '@/components/address/AddressOnboarding';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import SettingsButton from '@/components/SettingsButton';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { Colors } from '@/constants/Colors';
export type Form = {
  branchName: string;
  customerName: string;
  company: string;
  city: string;
  address: string;
  phone: string;
};

export default function AddressesScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const formik = useFormik<Form>({
    initialValues: {
      branchName: '',
      customerName: '',
      company: '',
      city: '',
      address: '',
      phone: '',
    },
    onSubmit: (_values, { resetForm }) => {
      setModalVisible(false);
      resetForm();
    },
  });
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPad = Platform.OS === 'ios' ? tabBarHeight + insets.bottom : insets.bottom;
  const data: Address[] = [
    {
      title: 'Home',
      address: '123 Main St, Springfield, IL 62701',
      body: [
        { label: 'Contact Name', value: 'John Doe' },
        { label: 'Phone Number', value: '+1 555-123-4567' },
        { label: 'Instructions', value: 'Leave at the front door.' },
      ],
    },
  ];
  const openModal = () => setModalVisible(true);

  const handleDelete = (_title: string) => {
    Alert.alert(t('profile.addresses.deleteTitle'), t('profile.addresses.deleteConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: () => {
          // TODO: actually remove from state
        },
      },
    ]);
  };
  const [addresses, setAddresses] = React.useState<Address[]>([]);

  const renderRightActions = (title: string) => (
    <TouchableOpacity style={styles.deleteAction} onPress={() => handleDelete(title)}>
      <Text style={styles.deleteText}>{t('common.delete')}</Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Modal
        title={t('profile.addresses.addAddress')}
        subtitle={t('profile.addresses.addAddressSubtitle')}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        form={formik}
      ></Modal>
      <Header title={t('profile.menu.myAddresses')} hasGoBack />
      <ContentView>
        {addresses.length === 0 ? (
          <AddressOnboarding
            onOpenForm={openModal}
            onComplete={() => {
              // simulate fetch after onboarding
              setAddresses([
                {
                  title: 'Home',
                  address: '123 Main St',
                  body: [],
                },
              ]);
            }}
          />
        ) : (
          <FlatList
            data={data}
            ListHeaderComponent={
              <SettingsButton onPress={openModal}>
                {t('profile.addresses.addBranch')}
              </SettingsButton>
            }
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={() => renderRightActions(item.title)}>
                <Card
                  variant={'addresses'}
                  data={item}
                  onEditPress={openModal}
                  onDeletePress={() => handleDelete(item.title)}
                />
              </Swipeable>
            )}
            contentContainerStyle={[styles.cardsContainer, { paddingBottom: bottomPad }]}
          />
        )}
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardsContainer: {
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  deleteAction: {
    backgroundColor: Colors.text.error.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 12,
  },
  deleteText: {
    color: Colors.background.white,
    fontWeight: '600',
  },
});
