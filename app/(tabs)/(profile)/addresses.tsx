import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
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
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={[styles.swipeBtn, styles.editBtn]} onPress={() => handleEdit(item)}>
        <Text style={styles.actionText}>{t('common.edit')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.swipeBtn, styles.deleteBtn]}
        onPress={() => confirmDelete(item.title)}
      >
        <Text style={styles.actionText}>{t('common.delete')}</Text>
      </TouchableOpacity>
    </View>
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
            data={addresses}
            ListHeaderComponent={
              <SettingsButton onPress={openModal}>
                {t('profile.addresses.addBranch')}
              </SettingsButton>
            }
            keyExtractor={item => item.title}
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

  swipeContainer: {
    flexDirection: 'row',
    height: '100%',
  },

  swipeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },

  editBtn: {
    backgroundColor: Colors.text.success,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  deleteBtn: {
    backgroundColor: Colors.text.error.primary,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },

  actionText: {
    color: Colors.background.white,
    fontWeight: '600',
  },
});
