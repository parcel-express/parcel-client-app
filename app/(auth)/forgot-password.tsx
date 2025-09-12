import { Link } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
type Form = {
  email: string;
};
export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(t('auth.emailRequired')),
    }),
    validateOnMount: true,
    onSubmit: () => {
      // TODO: Implement password reset logic
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.full}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <ThemedText style={Typography.title}>{t('auth.forgotPassword')}</ThemedText>

              <ThemedText style={styles.description}>{t('auth.enter_email')}</ThemedText>
            </View>

            <Input<Form>
              placeholder={t('auth.emailPlaceholder')}
              name={'email'}
              label={t('auth.emailLabel')}
              formik={formik}
              keyboardType='email-address'
            />

            <View style={styles.actionContainer}>
              <Button
                variant='primary'
                size='lg'
                onPress={formik.handleSubmit}
                disabled={!formik.isValid}
              >
                {t('auth.send_link')}
              </Button>

              <Link href='/(auth)/login' style={styles.link}>
                <ThemedText style={styles.linkText}>{t('auth.back_to_login')}</ThemedText>
              </Link>
            </View>
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>
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
    backgroundColor: Colors.background.body,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    gap: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  actionContainer: {
    width: '100%',
    gap: 12,
    marginTop: 20,
  },
  link: {
    marginBottom: 15,
    textAlign: 'center',
  },
  linkText: {
    color: Colors.text.secondary,
    fontSize: 16,
  },
});
