import { Stack, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { PageHeader } from 'src/components/PageHeader';
import { SafeAreaView } from 'src/components/SafeArea';
import { useUserAccount } from 'src/hooks';

const AuthLayout = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUserAccount();

  useEffect(() => {
    console.log('USUÁRIO LOGADO (app/auth):', user?.email);

    if (!user) {
      router.replace('/(auth)/onboarding');
    } else {
      router.replace('/(tabs)');
    }
  }, [user]);

  const hasPreviousRoute = navigation.canGoBack();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <PageHeader onPress={hasPreviousRoute ? handleNavigateBack : undefined} />
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="onboarding">
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="reset-password" />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
