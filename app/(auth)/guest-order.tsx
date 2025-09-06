import { Link, router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function GuestOrderScreen() {
  const { t } = useTranslation();

  const handleGuestOrder = () => {
    // TODO: Implement guest order logic
    // For now, navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>{t('auth.guestOrder')}</ThemedText>

        <ThemedText style={styles.description}>
          Place an order as a guest. You won't be able to track your order history.
        </ThemedText>

        <TextInput style={styles.input} placeholder='Full Name' autoCapitalize='words' />

        <TextInput style={styles.input} placeholder='Phone Number' keyboardType='phone-pad' />

        <TextInput
          style={styles.input}
          placeholder='Email (optional)'
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Pressable style={styles.button} onPress={handleGuestOrder}>
          <ThemedText style={styles.buttonText}>Continue as Guest</ThemedText>
        </Pressable>

        <Link href='/(auth)/login' style={styles.link}>
          <ThemedText style={styles.linkText}>Have an account? {t('auth.login')}</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#34C759',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginBottom: 15,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
