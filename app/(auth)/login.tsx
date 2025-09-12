import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

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
const languageOptions = [
  { label: 'En', value: 'en-US' },
  { label: 'ქარ', value: 'ka-GE' },
  { label: 'Рус', value: 'ru-RU' },
];
export default function LoginScreen() {
  const { i18n, t } = useTranslation();
  const insets = useSafeAreaInsets();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: yup.object().shape({
      email: yup.string().trim().email(t('auth.emailInvalid')).required(t('auth.emailRequired')),
      password: yup
        .string()
        .min(6, t('auth.passwordMin'))
        .max(20, t('auth.passwordMax'))
        .required(t('auth.passwordRequired')),
    }),
    validateOnMount: false,
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
      style={styles.flexOne}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedView style={styles.container}>
          <View style={[styles.languageContainer, { top: insets.top + 10 }]}>
            <Select
              value={i18n.resolvedLanguage ?? i18n.language}
              options={languageOptions}
              setValue={val => i18n.changeLanguage(val)}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo.png')}
                accessibilityRole='image'
                accessibilityLabel={t('common.logo')}
                style={styles.logo}
              />
            </View>
            <View style={styles.inputsOuterContainer}>
              <View style={styles.titleContainer}>
                <Text style={[Typography.title]}>{t('auth.login')}</Text>
              </View>
              <View style={styles.inputsContainer}>
                <Input<Form>
                  name='email'
                  label={t('auth.emailLabel')}
                  formik={formik}
                  placeholder={t('auth.emailPlaceholder')}
                  keyboardType='email-address'
                  autoComplete='email'
                  textContentType='emailAddress'
                  autoCapitalize='none'
                />
                <Input<Form>
                  name={'password'}
                  label={t('auth.passwordLabel')}
                  formik={formik}
                  placeholder={t('auth.passwordPlaceholder')}
                  autoComplete='password'
                  textContentType='password'
                  secureTextEntry
                />
              </View>
              <Pressable style={styles.forgotPasswordContainer} onTouchEnd={handleForgotPassword}>
                <Text style={[Typography.textSmMedium, { color: Colors.login.forgotPassword }]}>
                  {t('auth.forgotPassword')}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.buttonContainer}>
              <Button size='xl' variant='primary' onPress={formik.handleSubmit}>
                {t('auth.login')}
              </Button>
              <Button size='xl' variant='secondary' onPress={handleGuestOrder}>
                {t('auth.withoutAuthorization')}
              </Button>
            </View>
            <Link href='/(auth)/register'>
              <Text style={styles.linkText}>
                {t('auth.noAccount')}
                <Text style={styles.bold}> {t('auth.registerAction')}</Text>
              </Text>
            </Link>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
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
  logo: {
    height: 68,
    resizeMode: 'contain',
  },
  inputsOuterContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleContainer: { marginBottom: 32 },
  inputsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageContainer: {
    position: 'absolute',
    right: 20,
    alignSelf: 'flex-end',
    zIndex: 10,
    elevation: 10,
  },
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
