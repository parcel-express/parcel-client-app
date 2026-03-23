import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useCallback } from 'react';

const AUTH_TOKEN_KEY = 'authToken';

export const useAuth = () => {
  const login = useCallback(async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    router.replace('/(tabs)');
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    router.replace('/(auth)/login');
  }, []);

  const getToken = useCallback(async () => {
    return AsyncStorage.getItem(AUTH_TOKEN_KEY);
  }, []);

  return { getToken, login, logout };
};
