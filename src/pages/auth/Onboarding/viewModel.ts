import { useRouter } from 'expo-router';

const useOnboardingViewModel = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push({
      pathname: '/(auth)/signin',
    });
  };

  const handleCreateAccount = () => {
    router.push({
      pathname: '/(auth)/signup',
    });
  };

  return {
    handleLogin,
    handleCreateAccount,
  };
};

export { useOnboardingViewModel };
