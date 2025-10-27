import { StyleSheet } from 'react-native';
import { Theme } from 'root/src/constants/styles/theme/types';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...theme.fonts.labelLarge,
      borderColor: theme.colors.button,
      height: 42,
    },
  });

export { getStyles };
