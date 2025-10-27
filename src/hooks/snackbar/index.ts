import { useContext } from 'react';
import { SnackbarContext } from 'root/src/providers/snackbar';

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar should be called inside SnackbarProvider');
  }
  return context.showSnackbar;
};

export { useSnackbar };
