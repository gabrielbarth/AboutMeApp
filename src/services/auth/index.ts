import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { data } = await GoogleSignin.signIn();

    if (!data) {
      throw new Error('Login cancelado pelo usuário');
    }

    const idToken = data.idToken;
    if (!idToken) {
      throw new Error('ID Token não encontrado');
    }
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Erro no login com Google:', error);
    throw error;
  }
};

const updatePassword = async (password: string) => {
  try {
    const user = auth().currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    await user.updatePassword(password);
    console.log('Senha atualizada com sucesso');
  } catch (error: any) {
    throw new Error('Erro ao atualizar senha: ' + error.message);
  }
};

const sendPasswordResetEmail = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    console.log('E-mail de redefinição de senha enviado com sucesso');
  } catch (error: any) {
    throw new Error(
      'Erro ao enviar e-mail de redefinição de senha: ' + error.message,
    );
  }
};

export { loginWithGoogle, sendPasswordResetEmail, updatePassword };
