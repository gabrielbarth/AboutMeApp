import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { PageState, usePageState, useUserAccount } from 'src/hooks';
import { useSnackbar } from 'src/hooks/snackbar';
import { loginWithGoogle } from 'src/services/auth';
import { getAuthErrorMessage } from 'src/utils/errorMappings';

interface SignInFormData {
  email: string;
  password: string;
}

const useSignInViewModel = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const { createUserAccount } = useUserAccount();
  const { state, setState } = usePageState();

  const handleSignInWithEmail = async (data: SignInFormData) => {
    try {
      setState(PageState.LOADING);
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log('Usuário logado:', userCredential);
      router.replace({
        pathname: '/(tabs)',
      });
      setState(PageState.DEFAULT);
      return userCredential.user;
    } catch (error) {
      setState(PageState.DEFAULT);
      const errorMessage = getAuthErrorMessage(error);
      showSnackbar({
        text: errorMessage,
        type: 'error',
        duration: 'short',
        action: {
          label: 'Fechar',
          onPress: () => console.log('Snackbar fechado'),
        },
        onDismiss: () => console.log('Desapareceu'),
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setState(PageState.LOADING);
      const userCredential = await loginWithGoogle();
      console.log('Bem-vindo', userCredential.user.displayName ?? 'Usuário');
      if (userCredential.additionalUserInfo?.isNewUser) {
        await createUserAccount({
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          name: userCredential.user.displayName || '',
          photoUrl: userCredential.user.photoURL || undefined,
        });
        console.log('Novo usuário criado!');
      }
      router.replace({
        pathname: '/(tabs)',
      });
      setState(PageState.DEFAULT);
    } catch (e) {
      setState(PageState.DEFAULT);
      console.log('Erro', e);
    }
  };

  const handleSignUp = () => {
    router.push({
      pathname: '/(auth)/signup',
    });
  };

  const handleForgotPassword = () => {
    router.push({
      pathname: '/(auth)/reset-password',
    });
  };

  return {
    control,
    handleSubmit,
    errors,
    handleSignInWithEmail,
    handleGoogleSignIn,
    handleForgotPassword,
    handleSignUp,
    isLoading: state === PageState.LOADING,
  };
};

export { useSignInViewModel };
