import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
type Form = {
  email: string;
  password: string;
};
export default function LoginScreen() {
  const languageOptions = [
    { label: 'En', value: 'en-US' },
    { label: 'ქარ', value: 'ka-GE' },
    { label: 'Рус', value: 'ru-RU' },
  ];
  const { i18n, t } = useTranslation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object().shape({
      email: yup.string().trim().email(t('auth.email_invalid')).required(t('auth.email_required')),
      password: yup
        .string()
        .min(6, t('auth.password_min'))
        .max(20, t('auth.password_max'))
        .required(t('auth.password_required')),
    }),
    onSubmit: () => {
      router.replace('/(tabs)');
    },
  });

  const handleGuestOrder = () => {
    router.push('/(auth)/guest-order');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex_1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedView style={styles.container}>
          <View style={styles.languageContainer}>
            <Select
              value={i18n.resolvedLanguage ?? i18n.language}
              options={languageOptions}
              setValue={val => i18n.changeLanguage(val)}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/logo.png')} />
            </View>
            <View style={styles.inputsOuterContainer}>
              <ThemedText style={Typography.title}>{t('auth.login')}</ThemedText>
              <View style={styles.inputsContainer}>
                <Input<Form>
                  name='email'
                  label={t('auth.email_label')}
                  formik={formik}
                  placeholder={t('auth.email_placeholder')}
                  keyboardType='email-address'
                  autoComplete='email'
                  textContentType='emailAddress'
                  autoCapitalize='none'
                />
                <Input<Form>
                  name={'password'}
                  label={t('auth.password_label')}
                  formik={formik}
                  placeholder={t('auth.password_placeholder')}
                  hint_message={t('auth.forgotPassword')}
                  hint_message_on_press={handleForgotPassword}
                  autoComplete='password'
                  textContentType='password'
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.buttonContainer}>
              <Button size='xl' variant='primary' onPress={formik.handleSubmit}>
                {t('auth.login')}
              </Button>
              <Button size='xl' variant='secondary' onPress={handleGuestOrder}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background.body,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 40,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 52,
  },
  inputsOuterContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 34,
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageContainer: { position: 'absolute', top: 12, right: 20, alignSelf: 'flex-end' },
  actionContainer: {
    flexDirection: 'column',
    gap: 26,
    paddingBottom: 24,
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
