import { Link, router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RegisterScreen() {
  const { t } = useTranslation();

  const handleRegister = () => {
    // TODO: Implement registration logic
    // For now, navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>{t('auth.register')}</ThemedText>

        <TextInput style={styles.input} placeholder='Full Name' autoCapitalize='words' />

        <TextInput
          style={styles.input}
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <TextInput style={styles.input} placeholder='Phone' keyboardType='phone-pad' />

        <TextInput style={styles.input} placeholder='Password' secureTextEntry />

        <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry />

        <Pressable style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText}>{t('auth.register')}</ThemedText>
        </Pressable>

        <Link href='/(auth)/login' style={styles.link}>
          <ThemedText style={styles.linkText}>
            Already have an account? {t('auth.login')}
          </ThemedText>
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginBottom: 15,
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
