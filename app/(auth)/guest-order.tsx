import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export default function GuestOrderScreen() {
  const { t } = useTranslation();
  const guestOrderSchema = yup.object({
    fullName: yup.string().required(t('auth.fullNameRequired')),
    email: yup.string().email(t('auth.emailInvalid')).optional(),
  });
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
    },
    validationSchema: guestOrderSchema,
    validateOnChange: true,
    onSubmit: () => {
      handleGuestOrder();
    },
  });
  const handleGuestOrder = () => {
    // TODO: Implement guest order logic
    // For now, navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.full}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ThemedView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <ThemedText style={[Typography.title, { color: Colors.text.primary }]}>
              {t('auth.guestOrder')}
            </ThemedText>

            <ThemedText
              style={[
                Typography.textMdRegular,
                styles.description,
                { color: Colors.text.secondary },
              ]}
            >
              {t('auth.guestOrderDescription')}
            </ThemedText>
          </View>
          <Input
            placeholder={t('auth.fullNamePlaceholder')}
            autoCapitalize='words'
            name={'fullName'}
            formik={formik}
            label={t('auth.fullName')}
          />
          <Input
            placeholder={t('auth.emailPlaceholder')}
            keyboardType='email-address'
            autoCapitalize='none'
            name={'email'}
            label={t('auth.emailLabel')}
            formik={formik}
          />
        </View>
        <View style={styles.action}>
          <Button onPress={formik.handleSubmit} size={'md'} variant={'primary'}>
            {t('auth.continueAsGuest')}
          </Button>

          <Link href='/(auth)/login' style={styles.link}>
            <ThemedText style={styles.linkText}>
              {t('auth.haveAnAccount')} {t('auth.login')}
            </ThemedText>
          </Link>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  form: { flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center', gap: 16 },
  action: {
    width: '100%',
    gap: 8,
  },
  description: {
    textAlign: 'center',
  },
  link: {
    marginBottom: 15,
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
