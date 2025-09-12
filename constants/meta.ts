import { TextInputProps } from 'react-native';

export type RegisterForm = {
  teamMember: string;
  name: string;
  surname: string;
  email: string;
  number: string;
  password: string;
  acceptTerms: boolean;
};
export type InputName = keyof Omit<RegisterForm, 'teamMember' | 'acceptTerms'>;
type InputMeta = {
  autoComplete: TextInputProps['autoComplete'];
  textContentType: TextInputProps['textContentType'];
  autoCapitalize: TextInputProps['autoCapitalize'];
  keyboardType: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
};
export const META: Record<InputName, InputMeta> = {
  name: {
    autoComplete: 'given-name',
    textContentType: 'givenName',
    autoCapitalize: 'words',
    keyboardType: 'default',
  },
  surname: {
    autoComplete: 'family-name',
    textContentType: 'familyName',
    autoCapitalize: 'words',
    keyboardType: 'default',
  },
  email: {
    autoComplete: 'email',
    textContentType: 'emailAddress',
    autoCapitalize: 'none',
    keyboardType: 'email-address',
  },
  number: {
    autoComplete: 'tel',
    textContentType: 'telephoneNumber',
    autoCapitalize: 'none',
    keyboardType: 'phone-pad',
  },
  password: {
    autoComplete: 'new-password',
    textContentType: 'newPassword',
    autoCapitalize: 'none',
    keyboardType: 'default',
    secureTextEntry: true,
  },
};
export const INPUT_NAMES: InputName[] = ['name', 'surname', 'email', 'number', 'password'];

export const OPTIONS: { label: string; value: string }[] = [
  { label: 'placeholder', value: 'placeholder' },
  { label: 'placeholder 1', value: 'placeholder 1' },
  { label: 'placeholder 2', value: 'placeholder 2' },
  {
    label: 'placeholder 3',
    value: 'placeholder 3',
  },
  { label: 'placeholder 4', value: 'placeholder 4' },
  { label: 'placeholder 5', value: 'placeholder 5' },
  { label: 'placeholder 6', value: 'placeholder 6' },
];
