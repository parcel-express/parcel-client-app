import { Link, router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const { t } = useTranslation();

  const handleLogin = () => {
    // TODO: Implement login logic
    // For now, navigate to main app
    router.replace('/(tabs)');
  };

  const handleGuestOrder = () => {
    router.push('/(auth)/guest-order');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>{t('auth.login')}</ThemedText>

        <TextInput
          style={styles.input}
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <TextInput style={styles.input} placeholder='Password' secureTextEntry />

        <Pressable style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>{t('auth.login')}</ThemedText>
        </Pressable>

        <Link href='/(auth)/forgot-password' style={styles.link}>
          <ThemedText style={styles.linkText}>{t('auth.forgotPassword')}</ThemedText>
        </Link>

        <Link href='/(auth)/register' style={styles.link}>
          <ThemedText style={styles.linkText}>{t('auth.register')}</ThemedText>
        </Link>

        <Pressable style={[styles.button, styles.guestButton]} onPress={handleGuestOrder}>
          <ThemedText style={styles.buttonText}>{t('auth.guestOrder')}</ThemedText>
        </Pressable>
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
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  guestButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginBottom: 15,
  },
  linkText: {
    fontSize: 16,
  },
});
