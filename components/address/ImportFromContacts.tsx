import * as Contacts from 'expo-contacts';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export type ContactAddress = {
  name: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
};

export const ImportFromContacts = ({ onSelect }: { onSelect: (addr: ContactAddress) => void }) => {
  const { t } = useTranslation();

  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [visible, setVisible] = useState(false);

  const handleImport = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(t('profile.addresses.contactPermissionDenied'));
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Addresses],
    });

    const withAddresses = data.filter(c => c.addresses && c.addresses.length > 0);

    if (withAddresses.length === 0) {
      Alert.alert(t('profile.addresses.noContactsWithAddress'));
      return;
    }

    setContacts(withAddresses);
    setVisible(true);
  };

  const mapContact = (contact: Contacts.Contact): ContactAddress => {
    const address = contact.addresses?.[0];
    return {
      name: contact.name ?? '',
      phone: contact.phoneNumbers?.[0]?.number?.replace(/\s/g, '') ?? '',
      street: address?.street ?? '',
      city: address?.city ?? '',
      postalCode: address?.postalCode ?? '',
    };
  };

  return (
    <>
      <TouchableOpacity onPress={handleImport} accessibilityRole='button'>
        <Text style={styles.button}>{t('profile.addresses.importFromContacts')}</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType='slide'>
        <View style={styles.container}>
          <Text style={styles.title}>{t('profile.addresses.selectContact')}</Text>

          <FlatList
            data={contacts}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => {
                  setVisible(false);
                  onSelect(mapContact(item));
                }}
              >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{item.addresses?.[0]?.street}</Text>
              </Pressable>
            )}
          />

          <Pressable onPress={() => setVisible(false)}>
            <Text style={styles.cancel}>{t('profile.addresses.close')}</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Typography.textMdMedium,
    color: Colors.light.tint,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background.white,
  },
  title: {
    ...Typography.textLgBold,
    marginBottom: 12,
    color: Colors.text.primary,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.border.tertiary,
  },
  name: {
    ...Typography.textMdMedium,
    color: Colors.text.primary,
  },
  sub: {
    ...Typography.textXsRegular,
    color: Colors.text.placeholder,
  },
  cancel: {
    ...Typography.textMdMedium,
    textAlign: 'center',
    marginTop: 16,
    color: Colors.text.danger,
  },
});
