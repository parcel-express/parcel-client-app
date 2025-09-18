import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';

import Header from '@/components/Header';
import UploadIcon from '@/components/icons/UploadIcon';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

type FormValues = {
  logo: string;
  legalName: string;
  contactPerson: string;
  email: string;
  companyAddress: string;
  companyLegalAddress: string;
  accountNumber: string;
  director: string;
  firmName: string;
  contactNumber: string;
  contactEmail: string;
  city: string;
  organizationNumber: string;
  idNumber: string;
  field: string;
};
type PasswordValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const menuItems: FormKeys[] = [
  'legalName',
  'contactPerson',
  'email',
  'companyAddress',
  'companyLegalAddress',
  'accountNumber',
  'director',
  'firmName',
  'contactNumber',
  'contactEmail',
  'city',
  'organizationNumber',
  'idNumber',
];
const passwordItems: (keyof PasswordValues)[] = [
  'oldPassword',
  'newPassword',
  'confirmNewPassword',
];
export type FormKeys = keyof Omit<FormValues, 'logo' | 'field'>;
export default function SettingsScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomPad = tabBarHeight + 20;
  const formik = useFormik({
    initialValues: {
      logo: '',
      legalName: '',
      contactPerson: '',
      email: '',
      companyAddress: '',
      companyLegalAddress: '',
      accountNumber: '',
      director: '',
      firmName: '',
      contactNumber: '',
      contactEmail: '',
      city: '',
      organizationNumber: '',
      idNumber: '',
      field: '',
    },
    validationSchema: yup.object().shape({
      legalName: yup.string().trim().required(t('profile.settings.legalNameRequired')),
      contactPerson: yup.string().trim().required(t('profile.settings.contactPersonRequired')),
      email: yup
        .string()
        .trim()
        .email(t('profile.settings.emailInvalid'))
        .required(t('profile.settings.emailRequired')),
      companyAddress: yup.string().trim().required(t('profile.settings.companyAddressRequired')),
      companyLegalAddress: yup
        .string()
        .trim()
        .required(t('profile.settings.companyLegalAddressRequired')),
      accountNumber: yup.string().trim().required(t('profile.settings.accountNumberRequired')),
      director: yup.string().trim().required(t('profile.settings.directorRequired')),
      firmName: yup.string().trim().required(t('profile.settings.firmNameRequired')),
      contactNumber: yup
        .string()
        .trim()
        .matches(/^\+?(?:\d[\s-]?){8,16}\d$/, t('profile.settings.contactNumberInvalid'))
        .required(t('profile.settings.contactNumberRequired')),
      contactEmail: yup
        .string()
        .trim()
        .email(t('profile.settings.contactEmailInvalid'))
        .required(t('profile.settings.contactEmailRequired')),
      city: yup.string().trim().required(t('profile.settings.cityRequired')),
      organizationNumber: yup
        .string()
        .trim()
        .required(t('profile.settings.organizationNumberRequired')),
      idNumber: yup.string().trim().required(t('profile.settings.idNumberRequired')),
    }),
    onSubmit: () => {
      return undefined;
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: yup.object().shape({
      oldPassword: yup
        .string()
        .min(6, t('profile.settings.passwordMin'))
        .required(t('profile.settings.oldPasswordRequired')),
      newPassword: yup
        .string()
        .min(6, t('profile.settings.passwordMin'))
        .required(t('profile.settings.newPasswordRequired')),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], t('profile.settings.confirmNewPasswordMatch'))
        .required(t('profile.settings.confirmNewPasswordRequired')),
    }),
    onSubmit: () => {
      return undefined;
    },
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      formik.setFieldValue('logo', result.assets[0]?.uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header title={t('profile.menu.settings')} hasGoBack />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        >
          <View style={styles.logoContainer}>
            {formik.values.logo ? (
              <Image source={{ uri: formik.values.logo }} style={styles.logo} />
            ) : (
              <View style={styles.logo} />
            )}
            <TouchableOpacity
              onPress={pickImage}
              accessibilityRole='button'
              accessibilityLabel={t('profile.settings.companyLogo')}
              style={[styles.imageUpload, Shadows.shadow_xs]}
            >
              <View style={styles.imageUploadContent}>
                <UploadIcon />
                <Text style={[Typography.textMdMedium, { color: Colors.text.secondary }]}>
                  {t('profile.settings.companyLogo')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.formsContainer}>
            <View style={styles.form}>
              {menuItems.map(key => (
                <Input<FormValues>
                  key={key}
                  name={key}
                  label={t(`profile.settings.${key}`)}
                  placeholder={t(`profile.settings.${key}Placeholder`)}
                  formik={formik}
                />
              ))}
              <Button onPress={formik.handleSubmit} size={'md'} variant={'primary'}>
                {t('profile.settings.save')}
              </Button>
            </View>
            <View style={styles.passwordForm}>
              <Text style={Typography.textMdBold}>{t('profile.settings.changePassword')}</Text>
              <View style={styles.form}>
                {passwordItems.map(key => (
                  <Input<PasswordValues>
                    key={key}
                    name={key}
                    label={t(`profile.settings.${key}`)}
                    placeholder={t(`profile.settings.${key}Placeholder`)}
                    formik={passwordFormik}
                    secureTextEntry
                  />
                ))}
                <Button onPress={passwordFormik.handleSubmit} size={'md'} variant={'primary'}>
                  {t('profile.settings.changePassword')}
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 36,
    paddingHorizontal: 18,
    gap: 12,
  },
  logoContainer: {
    gap: 20,
  },
  logo: {
    width: 71,
    height: 71,
    borderRadius: 14,
    backgroundColor: Colors.background.imagePlaceholder,
    alignSelf: 'center',
  },
  imageUpload: {
    height: 116,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.border.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 13,
  },
  formsContainer: {
    gap: 40,
  },
  form: {
    gap: 20,
  },
  passwordForm: {
    gap: 40,
  },
});
