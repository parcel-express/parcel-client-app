import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='conditions' />
      <Stack.Screen name='invoices' />
      <Stack.Screen name='analytics' />
      <Stack.Screen name='tariffs' />
      <Stack.Screen name='addresses' />
      <Stack.Screen name='settings' />
      <Stack.Screen name='easy-auth' />
    </Stack>
  );
}
