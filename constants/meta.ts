import { TextInput } from 'react-native';

import { Form } from '@/app/(auth)/register';

export const META: Record<
  keyof Omit<Form, 'team_member' | 'accept_terms'>,
  {
    auto_complete: React.ComponentProps<typeof TextInput>['autoComplete'];
    text_content_type: React.ComponentProps<typeof TextInput>['textContentType'];
    autoCapitalize: React.ComponentProps<typeof TextInput>['autoCapitalize'];
  }
> = {
  name: {
    auto_complete: 'given-name',
    text_content_type: 'givenName',
    autoCapitalize: 'words',
  },
  surname: {
    auto_complete: 'family-name',
    text_content_type: 'familyName',
    autoCapitalize: 'words',
  },
  email: {
    auto_complete: 'email',
    text_content_type: 'emailAddress',
    autoCapitalize: 'none',
  },
  number: {
    auto_complete: 'tel',
    text_content_type: 'telephoneNumber',
    autoCapitalize: 'none',
  },
  password: {
    auto_complete: 'new-password',
    text_content_type: 'newPassword',
    autoCapitalize: 'none',
  },
};

export const INPUT_NAMES: (keyof Omit<Form, 'team_member' | 'accept_terms'>)[] = [
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
