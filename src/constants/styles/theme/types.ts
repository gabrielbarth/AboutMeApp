import { MD3Theme } from 'react-native-paper';
import { Spacing } from 'src/constants/styles/spacing/types';

interface ThemeColors {
  background: string;
  surface: string;
  button: string;
  border: string;
  borderError: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textBrand: string;
  textInvert: string;
}

type Theme = MD3Theme & {
  colors: ThemeColors;
  spacing: Spacing;
};

export { Theme, ThemeColors };
