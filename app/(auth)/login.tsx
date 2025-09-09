import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typohraphy';
type Form = {
  email: string;
  password: string;
};
export default function LoginScreen() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    }),
    onSubmit: () => {
      router.replace('/(tabs)');
    },
  });
  const { t } = useTranslation();

  const handleGuestOrder = () => {
    router.push('/(auth)/guest-order');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} />
        </View>
        <View style={styles.inputsContainer}>
          <ThemedText style={Typography.title}>{t('auth.login')}</ThemedText>
          <Input<Form>
            formik_key={'email'}
            label={t('auth.email_label')}
            formik={formik}
            placeholder={t('auth.email_placeholder')}
          />
          <Input<Form>
            formik_key={'password'}
            label={t('auth.password_label')}
            formik={formik}
            placeholder={t('auth.password_placeholder')}
            hint_message={t('auth.forgotPassword')}
            hint_message_on_press={handleForgotPassword}
            secure_text_entry
          />
        </View>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.buttonContainer}>
          <Button size='lg' variant='primary' onPress={formik.handleSubmit}>
            {t('auth.login')}
          </Button>
          <Button size='lg' variant='secondary' onPress={handleGuestOrder}>
            {t('auth.guestOrder')}
          </Button>
        </View>
        <Link href='/(auth)/register'>
          <Text style={styles.linkText}>
            {t('auth.noAccount')}
            <Text style={styles.bold}> {t('auth.register_action')}</Text>
          </Text>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background.body,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 44,
  },
  inputsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    gap: 34,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 26,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },

  linkText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
  bold: {
    fontWeight: '700',
  },
});
