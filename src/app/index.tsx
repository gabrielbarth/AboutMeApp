/* eslint-disable import/namespace */
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
// import 'react-native-get-random-values';
import { useUserAccount } from 'src/hooks';

export default function Index() {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const { user } = useUserAccount();

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;

    console.log('USUÁRIO LOGADO (app/index):', user?.email);

    if (!!user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/onboarding');
    }
  }, [user, ready]);

  return null; // splash screen
}
