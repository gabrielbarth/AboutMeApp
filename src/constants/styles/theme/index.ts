import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { spacing } from '../spacing';
import { lightColors } from './lightMode';
import { darkColors } from './darkMode';
import { Theme } from './types';

const lightTheme: Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
  spacing,
};

const darkTheme: Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
  spacing,
};

export { lightTheme, darkTheme };
