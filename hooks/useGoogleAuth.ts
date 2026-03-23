import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';

import { useAuth } from './useAuth';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const authRequestConfig = {
    ...(process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
      ? { androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID }
      : {}),
    ...(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
      ? { iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID }
      : {}),
    ...(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
      ? { webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID }
      : {}),
  };

  const [request, response, promptAsync] = Google.useAuthRequest(authRequestConfig);

  const handleGoogleLogin = useCallback(
    async (accessToken?: string) => {
      if (!accessToken) return;

      try {
        setLoading(true);

        // TODO: replace with real API
        const res = await fetch('YOUR_API/auth/social-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'google', token: accessToken }),
        });

        const data = await res.json();

        if (data.token) {
          await login(data.token);
        }
      } catch (e) {
        console.error('Google login failed:', e);
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  useEffect(() => {
    if (response?.type === 'success') {
      handleGoogleLogin(response.authentication?.accessToken);
    }
  }, [response, handleGoogleLogin]);

  return { promptAsync, request, loading };
};
