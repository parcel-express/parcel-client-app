import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Address } from '@/app/types/cardTypes';
import { AddressOnboarding } from '@/components/address/AddressOnboarding';
import { ContactAddress, ImportFromContacts } from '@/components/address/ImportFromContacts';
import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import SettingsButton from '@/components/SettingsButton';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';

import { addressesStyles } from './AddressesStyles';
import { addressListStyles } from './AddressListStyles';

export type Form = {
  branchName: string;
  customerName: string;
  company: string;
  city: string;
  address: string;
  phone: string;
};

export default function AddressesScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPad = Platform.OS === 'ios' ? tabBarHeight + insets.bottom : insets.bottom;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);

  const formik = useFormik<Form>({
    initialValues: {
      branchName: '',
      customerName: '',
      company: '',
      city: '',
      address: '',
      phone: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (selectedAddress) {
        // UPDATE
        setAddresses(prev =>
          prev.map(a =>
            a.title === selectedAddress.title
              ? { ...a, title: values.branchName, address: values.address }
              : a
          )
        );
      } else {
        // CREATE
        setAddresses(prev => [
          ...prev,
          {
            title: values.branchName,
            address: values.address,
            body: [],
          },
        ]);
      }

      setModalVisible(false);
      resetForm();
      setSelectedAddress(null);
    },
  });

  const handleContactSelect = (contact: ContactAddress) => {
    formik.setValues({
      branchName: contact.name || '',
      customerName: contact.name || '',
      company: '',
      city: contact.city || '',
      address: contact.street || '',
      phone: contact.phone || '',
    });

    setSelectedAddress(null);
    setModalVisible(true);
  };

  // OPEN MODAL (CREATE)
  const openModal = () => {
    setSelectedAddress(null);
    formik.resetForm();
    setModalVisible(true);
  };

  // EDIT
  const handleEdit = (address: Address) => {
    setSelectedAddress(address);

    formik.setValues({
      branchName: address.title,
      customerName: '',
      company: '',
      city: '',
      address: address.address,
      phone: '',
    });

    setModalVisible(true);
  };

  // DELETE CONFIRM
  const confirmDelete = (title: string) => {
    Alert.alert(t('profile.addresses.deleteTitle'), t('profile.addresses.deleteWarning'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: () => {
          setAddresses(prev => prev.filter(a => a.title !== title));
        },
      },
    ]);
  };

  // SWIPE ACTIONS
  const renderRightActions = (item: Address) => (
    <View style={addressListStyles.swipeContainer}>
      <TouchableOpacity
        style={[addressListStyles.swipeBtn, addressListStyles.editBtn]}
        onPress={() => handleEdit(item)}
      >
        <Text style={addressListStyles.actionText}>{t('common.edit')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[addressListStyles.swipeBtn, addressListStyles.deleteBtn]}
        onPress={() => confirmDelete(item.title)}
      >
        <Text style={addressListStyles.actionText}>{t('common.delete')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView
      style={addressesStyles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={addressesStyles.modalOverlay}>
          <View style={addressesStyles.modalContent}>
            <Text style={addressesStyles.modalTitle}>{t('profile.addresses.addAddress')}</Text>
            <Text style={addressesStyles.modalSubtitle}>
              {t('profile.addresses.addAddressSubtitle')}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={addressesStyles.modalCancelBtn}
            >
              <Text style={addressesStyles.modalCancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Header title={t('profile.menu.myAddresses')} hasGoBack />
      <ContentView>
        {addresses.length === 0 ? (
          <>
            <AddressOnboarding
              onOpenForm={openModal}
              onComplete={() => {
                setAddresses([
                  {
                    title: 'Home',
                    address: '123 Main St',
                    body: [],
                  },
                ]);
              }}
            />

            <ImportFromContacts onSelect={handleContactSelect} />
          </>
        ) : (
          <FlatList
            data={addresses}
            ListHeaderComponent={
              <View>
                <SettingsButton onPress={openModal}>
                  {t('profile.addresses.addBranch')}
                </SettingsButton>

                <ImportFromContacts onSelect={handleContactSelect} />
              </View>
            }
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={({ item }) => (
              <Swipeable overshootRight={false} renderRightActions={() => renderRightActions(item)}>
                <Card
                  variant={'addresses'}
                  data={item}
                  onEditPress={() => handleEdit(item)}
                  onDeletePress={() => confirmDelete(item.title)}
                />
              </Swipeable>
            )}
            contentContainerStyle={[addressesStyles.cardsContainer, { paddingBottom: bottomPad }]}
          />
        )}
      </ContentView>
    </ThemedView>
  );
}
