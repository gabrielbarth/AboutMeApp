import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useSnackbar } from 'src/hooks/snackbar';
import { getAuthErrorMessage } from 'src/utils/errorMappings';
import { loginWithGoogle } from 'src/services/auth';
import { usePageState, useUserAccount, PageState } from 'src/hooks';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const useSignUpViewModel = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormData>();
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const { state, setState } = usePageState();
  const { createUserAccount } = useUserAccount();

  const password = watch('password');

  const handleCreateAccount = async (
    data: SignUpFormData,
  ): Promise<FirebaseAuthTypes.User | undefined> => {
    try {
      setState(PageState.LOADING);
      console.log('@@ entrou');
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log('@@ userCredential', userCredential);
      router.replace({
        pathname: '/(tabs)',
      });

      if (userCredential.additionalUserInfo?.isNewUser) {
        await createUserAccount({
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          name: data.name || '',
        });
        console.log('Novo usuário criado!');
      }
      setState(PageState.DEFAULT);
      clearFields();
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

  const clearFields = () => {
    setValue('email', '');
    setValue('password', '');
    setValue('confirmPassword', '');
    setValue('name', '');
  };

  const handleCreateAccountWithGoogle = async () => {
    try {
      clearFields();
      setState(PageState.LOADING);
      const userCredential = await loginWithGoogle();
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

  return {
    control,
    handleSubmit,
    errors,
    password,
    handleCreateAccount,
    handleCreateAccountWithGoogle,
    isLoading: state === PageState.LOADING,
  };
};

export { useSignUpViewModel };
