import { useContext } from 'react';
import { UserAccountContext } from 'root/src/providers/userAccount';

export const useUserAccount = () => {
  if (!UserAccountContext) {
    throw new Error('useUserAccount must be used within a UserAccountProvider');
  }
  return useContext(UserAccountContext);
};
