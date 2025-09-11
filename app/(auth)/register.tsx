import { useHeaderHeight } from '@react-navigation/elements';
import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Colors } from '@/constants/Colors';
import { INPUT_NAMES, META, OPTIONS, RegisterForm } from '@/constants/meta';
import { Typography } from '@/constants/Typography';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? headerHeight + insets.top : 0;

  const formik = useFormik<RegisterForm>({
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
      name: yup.string().trim().required(t('auth.name_required')),
      surname: yup.string().trim().required(t('auth.surname_required')),
      email: yup.string().trim().email(t('auth.email_invalid')).required(t('auth.email_required')),
      number: yup
        .string()
        .trim()
        .matches(/^\+?(?:\d[\s-]?){8,16}\d$/, t('auth.number_invalid'))
        .required(t('auth.number_required')),
      password: yup
        .string()
        .min(6, t('auth.password_min'))
        .max(20, t('auth.password_max'))
        .required(t('auth.password_required')),
      accept_terms: yup.boolean().oneOf([true], t('auth.accept_terms_error')),
    }),
    validateOnMount: true,
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

  return (
    <KeyboardAvoidingView
      style={styles.flex_1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={styles.flex_1}
        contentContainerStyle={styles.flexGrow}
        keyboardShouldPersistTaps='handled'
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ThemedView style={styles.container}>
            <View>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  accessibilityRole='image'
                  accessibilityLabel={t('common.logo')}
                />
              </View>

              <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                  <ThemedText style={Typography.title}>{t('auth.register')}</ThemedText>
                </View>
                <View style={styles.inputsContainer}>
                  <View style={styles.flex_1}>
                    <Select
                      label={t('auth.team_member_label')}
                      setValue={(value: string) => {
                        formik.setFieldTouched('team_member', true, true);
                        formik.setFieldValue('team_member', value);
                      }}
                      value={formik.values.team_member}
                      placeholder={t('auth.team_member_placeholder')}
                      options={OPTIONS}
                    />
                    {formik.touched.team_member && formik.errors.team_member && (
                      <Text style={[Typography.text_xs_medium, styles.error_text]}>
                        {formik.errors.team_member}
                      </Text>
                    )}
                  </View>
                  {INPUT_NAMES.map(name => (
                    <Input<RegisterForm>
                      key={name}
                      name={name}
                      label={t(`auth.${name}_label`)}
                      formik={formik}
                      placeholder={t(`auth.${name}_placeholder`)}
                      autoComplete={META[name].autoComplete}
                      textContentType={META[name].textContentType}
                      autoCapitalize={META[name].autoCapitalize}
                      keyboardType={META[name].keyboardType}
                      secureTextEntry={META[name].secureTextEntry ?? false}
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
            </View>
            <View style={[styles.actionContainer, { paddingBottom: insets.bottom }]}>
              <View style={styles.buttonContainer}>
                <Button
                  size='xl'
                  variant='primary'
                  onPress={formik.handleSubmit}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {t('auth.register')}
                </Button>
                <Button size='xl' variant='secondary' onPress={handleGuestOrder}>
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
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
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
    gap: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 44,
  },
  titleContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
  },
  checkboxWrapper: {
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 52,
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 36,
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
