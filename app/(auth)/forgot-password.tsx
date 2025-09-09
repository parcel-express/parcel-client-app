import { Link } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typohraphy';
type Form = {
  email: string;
};
export default function ForgotPasswordScreen() {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
    }),
    onSubmit: () => {
      // TODO: Implement password reset logic
    },
  });
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={Typography.title}>{t('auth.forgotPassword')}</ThemedText>

          <ThemedText style={styles.description}>{t('auth.enter_email')}</ThemedText>
        </View>

        <Input<Form>
          placeholder={t('auth.email_placeholder')}
          name={'email'}
          label={t('auth.email_label')}
          formik={formik}
        />

        <View style={styles.action_container}>
          <Button variant='primary' size='md' onPress={formik.handleSubmit}>
            {t('auth.send_link')}
          </Button>

          <Link href='/(auth)/login' style={styles.link}>
            <ThemedText style={styles.linkText}>{t('auth.back_to_login')}</ThemedText>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 30,
    lineHeight: 24,
  },
  action_container: {
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
