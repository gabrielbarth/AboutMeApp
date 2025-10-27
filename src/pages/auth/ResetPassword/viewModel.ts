import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { PageState, usePageState, useSnackbar } from 'src/hooks';
import { sendPasswordResetEmail } from 'src/services/auth';

interface ResetPasswordFormData {
  email: string;
}

const useResetPasswordViewModel = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const { state, setState } = usePageState();

  const handleSendMail = async (data: ResetPasswordFormData) => {
    try {
      setState(PageState.LOADING);
      await sendPasswordResetEmail(data.email);
      showSnackbar({
        text: 'E-mail de redefinição de senha enviado com sucesso!',
        type: 'success',
      });
      setState(PageState.DEFAULT);
      router.back();
    } catch (error) {
      setState(PageState.DEFAULT);
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
      showSnackbar({
        text: 'Erro ao enviar e-mail de redefinição de senha. Tente novamente mais tarde.',
        type: 'error',
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    handleSendMail,
    isLoading: state === PageState.LOADING,
  };
};

export { useResetPasswordViewModel };
