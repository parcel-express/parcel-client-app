import { TextInput } from 'react-native';

export type RegisterForm = {
  team_member: string;
  name: string;
  surname: string;
  email: string;
  number: string;
  password: string;
  accept_terms: boolean;
};
export const META: Record<
  keyof Omit<RegisterForm, 'team_member' | 'accept_terms'>,
  {
    autoComplete: React.ComponentProps<typeof TextInput>['autoComplete'];
    textContentType: React.ComponentProps<typeof TextInput>['textContentType'];
    autoCapitalize: React.ComponentProps<typeof TextInput>['autoCapitalize'];
  }
> = {
  name: {
    autoComplete: 'given-name',
    textContentType: 'givenName',
    autoCapitalize: 'words',
  },
  surname: {
    autoComplete: 'family-name',
    textContentType: 'familyName',
    autoCapitalize: 'words',
  },
  email: {
    autoComplete: 'email',
    textContentType: 'emailAddress',
    autoCapitalize: 'none',
  },
  number: {
    autoComplete: 'tel',
    textContentType: 'telephoneNumber',
    autoCapitalize: 'none',
  },
  password: {
    autoComplete: 'new-password',
    textContentType: 'newPassword',
    autoCapitalize: 'none',
  },
};

export const INPUT_NAMES: (keyof Omit<RegisterForm, 'team_member' | 'accept_terms'>)[] = [
  'name',
  'surname',
  'email',
  'number',
  'password',
];

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
