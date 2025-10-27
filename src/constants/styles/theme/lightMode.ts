import { ThemeColors } from 'src/constants/styles/theme/types';
import { colors } from 'src/constants/styles/colors';

const lightColors: ThemeColors = {
  background: colors.shades.white,
  surface: colors.primary[100],
  button: colors.primary[900],
  border: colors.neutral[700],
  borderError: colors.error[700],
  textPrimary: colors.neutral[900],
  textSecondary: colors.neutral[800],
  textTertiary: colors.neutral[700],
  textBrand: colors.primary[900],
  textInvert: colors.neutral[50],
};

export { lightColors };
