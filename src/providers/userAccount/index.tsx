import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import { UserAccount } from 'src/@types/user';
import { createUser } from 'src/services/account';

export interface UserAccountContextProps {
  user: UserAccount | null;
  setUser: (user: UserAccount | null) => void;
  signOut: () => Promise<void>;
  createUserAccount: (user: UserAccount) => Promise<void>;
  refetchUser: () => Promise<void>;
}

const UserAccountContext = createContext({} as UserAccountContextProps);

interface UserAccountProviderProps {
  children: React.ReactElement;
}

const UserAccountProvider = ({ children }: UserAccountProviderProps) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const router = useRouter();

  const mappedUser = (
    firebaseUser: FirebaseAuthTypes.User | null,
  ): UserAccount | null => {
    if (!firebaseUser) return null;
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      photoUrl: firebaseUser.photoURL || undefined,
    };
  };

  // fetch do usuário no firestore e setUser com as dados do usuário do firestore (?)
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      const firebaseUserMapped = mappedUser(firebaseUser);
      console.log('USUÁRIO LOGADO (userAccount):', firebaseUserMapped);
      setUser(firebaseUserMapped);
    });
    return unsubscribe;
  }, []);

  const createUserAccount = async (user: UserAccount): Promise<void> => {
    try {
      setUser(user);
      await createUser(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const refetchUser = async () => {
    const firebaseUser = auth().currentUser;
    const firebaseUserMapped = mappedUser(firebaseUser);
    console.log('USUÁRIO ATUALIZADO (userAccount):', firebaseUserMapped);
    setUser(firebaseUserMapped);
  };

  const signOut = async () => {
    await GoogleSignin.signOut();
    await auth().signOut();
    setUser(null);
    router.replace('/(auth)/onboarding'); // temporarily
  };

  return (
    <UserAccountContext.Provider
      value={{ user, setUser, signOut, createUserAccount, refetchUser }}>
      {children}
    </UserAccountContext.Provider>
  );
};

export { UserAccountContext, UserAccountProvider };
