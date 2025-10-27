import { useContext } from 'react';
import { ThemeContext } from 'root/src/providers/theme';

export const useTheme = () => {
  if (!ThemeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return useContext(ThemeContext);
};
