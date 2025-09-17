import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '@/components/Header';
import NoAddresses from '@/components/NoAddresses';
import SettingsButton from '@/components/SettingsButton';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { Colors } from '@/constants/Colors';
type Data = { title: string; address: string; body: { label: string; value: string }[] };
type Form = {
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
    onSubmit: () => {
      setModalVisible(false);
    },
  });
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPad = Platform.OS === 'ios' ? tabBarHeight + insets.bottom : insets.bottom;
  const data: Data[] = [
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

  const handleDelete = () => {
    Alert.alert(t('profile.addresses.delete'), t('profile.addresses.deleteConfirm'), [
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
      {
        text: t('profile.addresses.delete'),
        style: 'destructive',
      },
    ]);
  };
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
      {data.length === 0 ? (
        <NoAddresses onPress={openModal} />
      ) : (
        <FlatList
          data={data}
          ListHeaderComponent={
            <SettingsButton onPress={openModal}>{t('profile.addresses.addBranch')}</SettingsButton>
          }
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({ item }) => (
            <Card
              variant={'addresses'}
              data={item}
              onEditPress={openModal}
              onDeletePress={handleDelete}
            />
          )}
          contentContainerStyle={[styles.cardsContainer, { paddingBottom: bottomPad }]}
        />
      )}
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
    paddingBottom: 83,
  },
});
