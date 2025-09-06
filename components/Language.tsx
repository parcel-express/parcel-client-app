import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const languages = [
  { code: 'ka-GE', name: 'ქართული', flag: '🇬🇪' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
];

export function Language() {
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang ?? languages[0];
  };

  const changeLanguage = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', languageCode);
      await i18n.changeLanguage(languageCode);
      setModalVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const currentLanguage = getCurrentLanguage()!;

  return (
    <View style={styles.container}>
      <Pressable style={styles.languageButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.flag}>{currentLanguage.flag}</Text>
        <ThemedText style={styles.languageText}>{currentLanguage.name}</ThemedText>
        <ThemedText style={styles.arrow}>▼</ThemedText>
      </Pressable>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>{t('language')}</ThemedText>

            {languages.map(language => (
              <Pressable
                key={language.code}
                style={[
                  styles.languageOption,
                  language.code === i18n.language && styles.selectedLanguage,
                ]}
                onPress={() => changeLanguage(language.code)}
              >
                <Text style={styles.optionFlag}>{language.flag}</Text>
                <ThemedText style={styles.optionText}>{language.name}</ThemedText>
                {language.code === i18n.language && (
                  <ThemedText style={styles.checkmark}>✓</ThemedText>
                )}
              </Pressable>
            ))}

            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <ThemedText style={styles.closeButtonText}>{t('common.cancel')}</ThemedText>
            </Pressable>
          </ThemedView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    padding: 10,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flag: {
    fontSize: 16,
    marginRight: 6,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  arrow: {
    fontSize: 10,
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: '#f0f0f0',
  },
  optionFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  checkmark: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
