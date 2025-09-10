import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
type Form = {
  team_member: string;
  name: string;
  surname: string;
  email: string;
  number: string;
  password: string;
  accept_terms: boolean;
};
export default function RegisterScreen() {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      team_member: '',
      name: '',
      surname: '',
      email: '',
      number: '',
      password: '',
      accept_terms: false,
    },
    validationSchema: yup.object().shape({
      team_member: yup.string().required(t('auth.team_member_required')),
      name: yup.string().required(t('auth.name_required')),
      surname: yup.string().required(t('auth.surname_required')),
      email: yup.string().email(t('auth.email_invalid')).required(t('auth.email_required')),
      number: yup
        .string()
        .matches(/^\+?[0-9]{9,14}$/, t('auth.number_invalid'))
        .required(t('auth.number_required')),
      password: yup
        .string()
        .min(6, t('auth.password_min'))
        .max(20, t('auth.password_max'))
        .required(t('auth.password_required')),
      accept_terms: yup.boolean().oneOf([true], t('auth.accept_terms_error')),
    }),
    onSubmit: () => {
      router.replace('/(tabs)');
    },
  });

  const toggleCheckbox = () => {
    formik.setFieldTouched('accept_terms', true, true);
    formik.setFieldValue('accept_terms', !formik.values.accept_terms);
  };

  const handleGuestOrder = () => {
    router.push('/(auth)/guest-order');
  };

  const options = [
    { label: 'Apple ', value: 'apple' },
    { label: 'Banana ', value: 'banana' },
    { label: 'Orange ', value: 'orange' },
    {
      label: 'Grapes ',
      value: 'grapes',
    },
    { label: 'Mango ', value: 'mango' },
    { label: 'Pineapple ', value: 'pineapple' },
    { label: 'Strawberry ', value: 'strawberry' },
    { label: 'Watermelon ', value: 'watermelon' },
    { label: 'Kiwi ', value: 'kiwi' },
    { label: 'Peach ', value: 'peach' },
  ];
  const input_names: (keyof Form)[] = ['name', 'surname', 'email', 'number', 'password'];

  return (
    <ScrollView style={styles.flex_1} contentContainerStyle={styles.flexGrow}>
      <ThemedView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/logo.png')} />
          </View>

          <View style={styles.inputsContainer}>
            <ThemedText style={Typography.title}>{t('auth.register')}</ThemedText>
            <View style={styles.flex_1}>
              <Select
                label={t('auth.team_member_label')}
                setValue={(value: string) => {
                  formik.setFieldTouched('team_member', true, true);
                  formik.setFieldValue('team_member', value);
                }}
                value={formik.values.team_member}
                placeholder={t('auth.team_member_placeholder')}
                options={options}
              />
              {formik.touched.team_member && formik.errors.team_member && (
                <Text style={[Typography.text_xs_medium, styles.error_text]}>
                  {formik.errors.team_member}
                </Text>
              )}
            </View>
            {input_names.map((name: keyof Form) => (
              <Input<Form>
                key={name}
                name={name}
                label={t(`auth.${name}_label`)}
                formik={formik}
                placeholder={t(`auth.${name}_placeholder`)}
                keyboard_type={
                  name === 'email' ? 'email-address' : name === 'number' ? 'phone-pad' : 'default'
                }
                secure_text_entry={name === 'password'}
              />
            ))}
            <View style={styles.checkboxWrapper}>
              <Checkbox
                label={t('auth.accept_terms')}
                toggleCheckbox={toggleCheckbox}
                checked={formik.values.accept_terms}
                size='md'
              />
              {formik.touched.accept_terms && formik.errors.accept_terms && (
                <Text style={[Typography.text_xs_medium, styles.error_text]}>
                  {formik.errors.accept_terms}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <Button size='lg' variant='primary' onPress={formik.handleSubmit}>
              {t('auth.register')}
            </Button>
            <Button size='lg' variant='secondary' onPress={handleGuestOrder}>
              {t('auth.guestOrder')}
            </Button>
          </View>
          <Link href='/(auth)/login'>
            <Text style={styles.linkText}>
              {t('auth.haveAnAccount')}
              <Text style={styles.bold}> {t('auth.login_action')}</Text>
            </Text>
          </Link>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexGrow: { flexGrow: 1 },
  flex_1: { flex: 1, width: '100%' },
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
    gap: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxWrapper: {
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 26,
    paddingBottom: 28,
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
  error_text: {
    marginTop: 6,
    color: Colors.text.error.primary,
  },
});
