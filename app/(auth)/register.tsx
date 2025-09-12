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
      teamMember: '',
      name: '',
      surname: '',
      email: '',
      number: '',
      password: '',
      acceptTerms: false,
    },
    validationSchema: yup.object().shape({
      teamMember: yup.string().trim().required(t('auth.teamMemberRequired')),
      name: yup.string().trim().required(t('auth.nameRequired')),
      surname: yup.string().trim().required(t('auth.surnameRequired')),
      email: yup.string().trim().email(t('auth.emailInvalid')).required(t('auth.emailRequired')),
      number: yup
        .string()
        .trim()
        .matches(/^\+?(?:\d[\s-]?){8,16}\d$/, t('auth.numberInvalid'))
        .required(t('auth.numberRequired')),
      password: yup
        .string()
        .min(6, t('auth.passwordMin'))
        .max(20, t('auth.passwordMax'))
        .required(t('auth.passwordRequired')),
      acceptTerms: yup.boolean().oneOf([true], t('auth.acceptTermsError')),
    }),
    validateOnMount: true,
    onSubmit: () => {
      router.replace('/(tabs)');
    },
  });

  const toggleCheckbox = async () => {
    await formik.setFieldValue('acceptTerms', !formik.values.acceptTerms);
    formik.setFieldTouched('acceptTerms', true, true);
  };

  const handleGuestOrder = () => {
    router.push('/(auth)/guest-order');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexOne}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={styles.flexOne}
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
                  style={styles.logo}
                />
              </View>

              <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                  <ThemedText style={Typography.title}>{t('auth.register')}</ThemedText>
                </View>
                <View style={styles.inputsContainer}>
                  <View style={styles.flexOne}>
                    <Select
                      label={t('auth.teamMemberLabel')}
                      setValue={async (value: string) => {
                        await formik.setFieldValue('teamMember', value);
                        formik.setFieldTouched('teamMember', true);
                      }}
                      value={formik.values.teamMember}
                      placeholder={t('auth.teamMemberPlaceholder')}
                      options={OPTIONS}
                    />
                    {formik.touched.teamMember && formik.errors.teamMember && (
                      <Text style={[Typography.textXsMedium, styles.errorText]}>
                        {formik.errors.teamMember}
                      </Text>
                    )}
                  </View>
                  {INPUT_NAMES.map(name => (
                    <Input<RegisterForm>
                      key={name}
                      name={name}
                      label={t(`auth.${name}Label`)}
                      formik={formik}
                      placeholder={t(`auth.${name}Placeholder`)}
                      autoComplete={META[name].autoComplete}
                      textContentType={META[name].textContentType}
                      autoCapitalize={META[name].autoCapitalize}
                      keyboardType={META[name].keyboardType}
                      secureTextEntry={META[name].secureTextEntry ?? false}
                    />
                  ))}
                  <View style={styles.checkboxWrapper}>
                    <Checkbox
                      label={t('auth.acceptTerms')}
                      toggleCheckbox={toggleCheckbox}
                      checked={formik.values.acceptTerms}
                      size='md'
                    />
                    {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                      <Text style={[Typography.textXsMedium, styles.errorText]}>
                        {formik.errors.acceptTerms}
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
                  {t('auth.withoutRegistration')}
                </Button>
              </View>
              <Link href='/(auth)/login'>
                <Text style={styles.linkText}>
                  {t('auth.haveAnAccount')}
                  <Text style={styles.bold}> {t('auth.loginAction')}</Text>
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
  flexOne: { flex: 1, width: '100%' },
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
  logo: {
    height: 68,
    resizeMode: 'contain',
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
    gap: 44,
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
  errorText: {
    marginTop: 6,
    color: Colors.text.error.primary,
  },
});
